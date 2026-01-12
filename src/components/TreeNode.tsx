import { useState } from "react";
import type { TreeNode as Node } from "../types/tree";
import { fetchChildren } from "../api/mockTreeApi";

interface Props {
  node: Node;
  onUpdate: (node: Node) => void;
  onDelete: (id: string) => void;
}

export function TreeNode({ node, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.name);

  const toggle = async () => {
    if (!node.isExpanded && node.hasChildren && !node.children) {
      const children = await fetchChildren(node.id);
      onUpdate({ ...node, isExpanded: true, children });
    } else {
      onUpdate({ ...node, isExpanded: !node.isExpanded });
    }
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div>
        {node.hasChildren && (
          <button onClick={toggle}>
            {node.isExpanded ? "−" : "+"}
          </button>
        )}

        {editing ? (
          <input
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              onUpdate({ ...node, name: value });
              setEditing(false);
            }}
          />
        ) : (
          <span onDoubleClick={() => setEditing(true)}>
            {node.name}
          </span>
        )}

        <button onClick={() => onDelete(node.id)}>❌</button>
      </div>

      {node.isExpanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}
