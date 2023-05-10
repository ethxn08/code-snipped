import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { app } from "../firebase";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSnippet } from "../redux/actions";

const CodeEditor = () => {
  const currentSnippetName = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([]);

  const [editorValue, setEditorValue] = useState(``);
  const [code, setCode] = useState(editorValue);
  const [userInfo, setUserInfo] = useState({});
  const [currentSnippet, setCurrentSnippetState] = useState({
    snippetName: "",
    snippetCode: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        getDocumentData(user);
      } else {
        // El usuario no está autenticado
        console.log("El usuario no está autenticado");
        navigate("/login");
      }
    });
  }, [currentSnippetName]);

  const firestore = getFirestore(app);

  async function getDocumentData(user) {
    try {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentSnippetState(
          docSnap
            .data()
            .snippets.find((item) => item.snippetName === currentSnippetName)
        );
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
        setUserInfo(user);
        getDocumentData(user);
      } else {
        // El usuario no está autenticado
        console.log("El usuario no está autenticado");
        navigate("/login");
      }
    });
  }, []);

  const handleValueChange = (value) => {
    setEditorValue(value);
    setCurrentSnippetState({
      snippetName: currentSnippet.snippetName,
      snippetCode: value,
    });
    setCode(value);
  };

  const handleSave = () => {
    const updatedSnippet = {
      snippetName: currentSnippetName,
      snippetCode: editorValue,
    };

    const index = snippets.findIndex(
      (snippet) => snippet.snippetName === updatedSnippet.snippetName
    );

    const updatedSnippets = snippets.map((snippet, i) =>
      i === index ? updatedSnippet : snippet
    );
    setSnippets(updatedSnippets);

    const docRef = doc(db, "users", userInfo.uid);
    setDoc(docRef, { email: userInfo.email, snippets: updatedSnippets })
      .then(() => {})
      .catch((error) => {
        console.error("Error al actualizar la matriz:", error);
      });
  };

  const handleDelete = () => {
    const index = snippets.findIndex(
      (snippet) => snippet.snippetName === currentSnippetName
    );
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(index, 1);
    setSnippets(updatedSnippets);

    const docRef = doc(db, "users", userInfo.uid);
    setDoc(docRef, { email: userInfo.email, snippets: updatedSnippets })
      .then(() => {
        if (updatedSnippets.length > 0) {
          dispatch(setCurrentSnippet(updatedSnippets[0].snippetName));
        } else {
          dispatch(setCurrentSnippet(""));
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la matriz:", error);
      });
  };

  return (
    <>
      {currentSnippet && (
        <>
          <Editor
            value={currentSnippet.snippetCode}
            onValueChange={handleValueChange}
            highlight={(code) => highlight(code, languages.js)}
            padding={40}
            className="code-editor"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              backgroundColor: "#1e1e1e",
              color: "#d4d4d4",
              caretColor: "#d4d4d4",
            }}
          ></Editor>
          <div className="controlButtons">
            <button className="saveButton" onClick={() => handleSave()}>
              Save
            </button>
            <button className="removeButton" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
          <div className="snippetName">
            <p>{currentSnippetName}</p>
          </div>
        </>
      )}
    </>
  );
};

export default CodeEditor;
