// src/app/utils/tree-utils.ts

/**
 * 平级数据接口
 */
export interface FlatItem {
  id: string;
  parentId: string | null;
  label: string;
  icon?: string;
  route?: string;
  children?: never; // 平级数据没有 children
}

/**
 * 树形数据接口
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
 * 将平级数据转换为树形结构
 */
export function convertFlatToTree(flatItems: FlatItem[]): TreeItem[] {
  // 创建一个 map 方便查找
  const itemMap = new Map<string, TreeItem>();
  const rootItems: TreeItem[] = [];

  // 首先将所有平级项转换为树形项
  flatItems.forEach(item => {
    itemMap.set(item.id, {
      ...item,
      children: []
    });
  });

  // 然后构建树形结构
  itemMap.forEach(item => {
    if (item.parentId === null) {
      // 根节点
      rootItems.push(item);
    } else {
      // 子节点，找到父节点并添加到其子数组
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