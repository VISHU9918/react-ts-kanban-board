import { useState } from "react";
import type { TreeNode } from "../types/tree";
import { TreeNode as Node } from "./TreeNode";

const initialData: TreeNode[] = [
  { id: "1", name: "Root 1", hasChildren: true },
  { id: "2", name: "Root 2" },
];

export function TreeView() {
  const [tree, setTree] = useState(initialData);

  const updateNode = (updated: TreeNode) => {
    const walk = (nodes: TreeNode[]): TreeNode[] =>
      nodes.map((n) =>
        n.id === updated.id
          ? updated
          : { ...n, children: n.children && walk(n.children) }
      );

    setTree(walk(tree));
  };

  const deleteNode = (id: string) => {
    if (!confirm("Delete node and children?")) return;

    const remove = (nodes: TreeNode[]): TreeNode[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) => ({
          ...n,
          children: n.children && remove(n.children),
        }));

    setTree(remove(tree));
  };

  return (
    <div>
      {tree.map((node) => (
        <Node
          key={node.id}
          node={node}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      ))}
    </div>
  );
}
