import { describe, it, expect } from 'vitest';
import { convertFlatToTree, FlatItem, TreeItem } from './tree-utils';

describe('tree-utils', () => {
  describe('convertFlatToTree', () => {
    it('should convert flat items to tree structure', () => {
      const flatItems: FlatItem[] = [
        { id: '1', parentId: null, label: 'Root 1' },
        { id: '2', parentId: null, label: 'Root 2' },
        { id: '1-1', parentId: '1', label: 'Child 1-1' },
        { id: '1-2', parentId: '1', label: 'Child 1-2' },
        { id: '1-1-1', parentId: '1-1', label: 'Grandchild 1-1-1' },
      ];

      const result = convertFlatToTree(flatItems);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children![0].children).toHaveLength(1);
      expect(result[1].id).toBe('2');
      expect(result[1].children).toHaveLength(0);
    });

    it('should handle empty array', () => {
      const result = convertFlatToTree([]);
      expect(result).toEqual([]);
    });

    it('should handle single root item', () => {
      const flatItems: FlatItem[] = [
        { id: '1', parentId: null, label: 'Single Root' },
      ];

      const result = convertFlatToTree(flatItems);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].children).toHaveLength(0);
    });

    it('should handle missing parent gracefully', () => {
      const flatItems: FlatItem[] = [
        { id: '1', parentId: null, label: 'Root' },
        { id: '2', parentId: 'nonexistent', label: 'Orphan' },
      ];

      const result = convertFlatToTree(flatItems);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });
});