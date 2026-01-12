import type { TreeNode } from "../types/tree";

export function fetchChildren(parentId: string): Promise<TreeNode[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: parentId + "-1", name: "Child 1" },
        { id: parentId + "-2", name: "Child 2", hasChildren: true },
      ]);
    }, 700);
  });
}
