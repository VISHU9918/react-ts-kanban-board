import { useState } from "react";
import type { Column } from "../types/kanban";

import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  column: Column;
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

/* ---------- CARD ---------- */
function DraggableCard({
  card,
  columnId,
  onDelete,
}: {
  card: { id: string; title: string };
  columnId: string;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: { columnId },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="card">
      {/* DRAG AREA */}
      <span {...listeners} {...attributes} style={{ cursor: "grab" }}>
        {card.title}
      </span>

      {/* DELETE BUTTON */}
      <button onClick={() => onDelete(card.id)}>🗑</button>
    </div>
  );
}


/* ---------- COLUMN ---------- */
export function KanbanColumn({ column, columns, setColumns }: Props) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  const [text, setText] = useState("");

  const addCard = () => {
    if (!text.trim()) return;

    setColumns(
      columns.map((c) =>
        c.id === column.id
          ? {
              ...c,
              cards: [
                ...c.cards,
                { id: Date.now().toString(), title: text },
              ],
            }
          : c
      )
    );
    setText("");
  };

  const deleteCard = (id: string) => {
    setColumns(
      columns.map((c) =>
        c.id === column.id
          ? { ...c, cards: c.cards.filter((card) => card.id !== id) }
          : c
      )
    );
  };

  return (
    <div ref={setNodeRef} className={`column column-${column.id}`}>
      {/* HEADER */}
      <div className="column-header">
        <span className="title">
          {column.title}
          <span className="count">{column.cards.length}</span>
        </span>
      </div>

      {/* ADD CARD */}
      <div style={{ padding: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New card..."
          style={{ width: "100%", marginBottom: 6 }}
        />
        <button className="add-card" onClick={addCard}>
          + Add Card
        </button>
      </div>

      {/* CARDS */}
      {column.cards.map((card) => (
        <DraggableCard
          key={card.id}
          card={card}
          columnId={column.id}
          onDelete={deleteCard}
        />
      ))}
    </div>
  );
}
