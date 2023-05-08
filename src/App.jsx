import CodeEditor from "./components/CodeEditor";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <CodeEditor />
    </div>
  );
}

export default App;
