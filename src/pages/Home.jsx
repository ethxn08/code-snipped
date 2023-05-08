import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log("El usuario está autenticado", user);
      } else {
        // El usuario no está autenticado
        console.log("El usuario no está autenticado");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="app">
      <Sidebar />
      <CodeEditor />
    </div>
  );
};

export default Home;
