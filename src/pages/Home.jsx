import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Home = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([
    { snippetName: "", snippetCode: "" },
  ]);
  const firestore = getFirestore(app);

  async function getDocumentData(user) {
    try {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSnippets(docSnap.data().snippets);
      } else {
        console.log("El documento no existe");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDocumentData(user);
      } else {
        // El usuario no está autenticado
        console.log("El usuario no está autenticado");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="app">
      <Sidebar snippets={snippets} />
      <CodeEditor />
    </div>
  );
};

export default Home;
