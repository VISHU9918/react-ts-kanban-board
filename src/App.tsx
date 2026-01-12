import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <div style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Kanban Board
      </h1>
      <KanbanBoard />
    </div>
  );
}


export default App;
