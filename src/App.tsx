import "./App.css";
import NpcCard from "./components/NpcCard";
import { EXAMPLE_NPC } from "./data/exampleData";

function App() {
  return (
    <div className="App">
      <NpcCard npc={EXAMPLE_NPC} />
    </div>
  );
}

export default App;
