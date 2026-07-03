// src/app/utils/tree-utils.ts

/**
 * Flat item interface
 */
export interface FlatItem {
  id: string;
  parentId: string | null;
  label: string;
  icon?: string;
  route?: string;
  children?: never; // Flat items don't have children
}

/**
 * Tree item interface
 */
export interface TreeItem {
  id: string;
  parentId: string | null;
  label: string;
  icon?: string;
  route?: string;
  children?: TreeItem[];
}

/**
 * Convert flat data to tree structure
 */
export function convertFlatToTree(flatItems: FlatItem[]): TreeItem[] {
  // Create a map for easy lookup
  const itemMap = new Map<string, TreeItem>();
  const rootItems: TreeItem[] = [];

  // First, convert all flat items to tree items
  flatItems.forEach(item => {
    itemMap.set(item.id, {
      ...item,
      children: []
    });
  });

  // Then build the tree structure
  itemMap.forEach(item => {
    if (item.parentId === null) {
      // Root node
      rootItems.push(item);
    } else {
      // Child node, find parent and add to its children array
      const parent = itemMap.get(item.parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
      }
    }
  });

  return rootItems;
}