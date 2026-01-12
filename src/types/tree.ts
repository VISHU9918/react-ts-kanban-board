export interface TreeNode {
  id: string;
  name: string;
  hasChildren?: boolean;
  children?: TreeNode[];
  isExpanded?: boolean;
}
