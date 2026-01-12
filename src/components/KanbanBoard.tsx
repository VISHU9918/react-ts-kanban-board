import { useState } from "react";
import type { Column, Card } from "../types/kanban";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import { KanbanColumn } from "./KanbanColumn";

const initialData: Column[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [{ id: "1", title: "Create initial project plan" }],
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [
      { id: "2", title: "Implement authentication" },
      { id: "3", title: "Set up database schema" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "4", title: "Organize project repository" },
      { id: "5", title: "Write API documentation" },
      { id: "6", title: "Review codebase structure" },
    ],
  },
];


export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialData);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromColId = active.data.current?.columnId;
    const toColId = over.data.current?.columnId;

    if (!fromColId || !toColId || fromColId === toColId) return;

    let movedCard: Card | null = null;

    const updated = columns.map((col) => {
      if (col.id === fromColId) {
        const remaining = col.cards.filter((c) => {
          if (c.id === active.id) {
            movedCard = c;
            return false;
          }
          return true;
        });
        return { ...col, cards: remaining };
      }
      return col;
    });

    if (!movedCard) return;

    setColumns(
      updated.map((col) =>
        col.id === toColId
          ? { ...col, cards: [...col.cards, movedCard!] }
          : col
      )
    );
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
        ))}
      </div>
    </DndContext>
  );
}
