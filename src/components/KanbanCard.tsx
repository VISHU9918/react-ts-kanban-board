// components/KanbanCard.tsx
import { useState } from "react";
import type { Card, Column } from "../types/kanban";

interface Props {
  card: Card;
  column: Column;
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

export const KanbanCard: React.FC<Props> = ({
  card,
  column,
  columns,
  setColumns,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(card.title);

  const save = () => {
    setColumns(
      columns.map((c) =>
        c.id === column.id
          ? {
              ...c,
              cards: c.cards.map((cd) =>
                cd.id === card.id ? { ...cd, title: value } : cd
              ),
            }
          : c
      )
    );
    setEditing(false);
  };

  const remove = () => {
    setColumns(
      columns.map((c) =>
        c.id === column.id
          ? { ...c, cards: c.cards.filter((cd) => cd.id !== card.id) }
          : c
      )
    );
  };

  return (
    <div className="card">
      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setEditing(true)}>{card.title}</p>
      )}
      <button onClick={remove}>✕</button>
    </div>
  );
};
