import React from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";

const Home = () => {
  return (
    <div className="app">
      <Sidebar />
      <CodeEditor />
    </div>
  );
};

export default Home;
