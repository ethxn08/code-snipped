import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  getFirestore,
  getDoc,
} from "firebase/firestore";
import { setCurrentSnippet } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const [userInfo, setUserInfo] = useState();
  const [newSnippet, setNewSnippet] = useState({
    snippetName: null,
    snippetCode: null,
  });
  const [snippets, setSnippets] = useState([
    { snippetName: "", snippetCode: "" },
  ]);
  const dispatch = useDispatch();
  const currentSnippetName = useSelector((state) => state);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();

  async function getDocumentData(user) {
    try {
      const docRef = doc(db, "users", user.uid);
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

  const addSnippet = async (e) => {
    e.preventDefault();
    console.log(newSnippet, userInfo.uid);
    try {
      const docRef = doc(db, "users", userInfo.uid);

      // Utilice la función "updateDoc" de Firestore para agregar el nuevo objeto de snippet al array "snippets"
      await updateDoc(docRef, {
        snippets: arrayUnion(newSnippet),
      });
      getDocumentData(userInfo);
    } catch (error) {
      console.error("Error al agregar el snippet:", error);
    }
  };

  const handleSnippetName = (e) => {
    setNewSnippet({
      snippetName: e.target.value,
      snippetCode: "",
    });
  };

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
  }, [userInfo]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getDocumentData(user);
      console.log(currentSnippetName);
    });
  }, [currentSnippetName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.createName.value;

    addSnippet(e);
    form.reset();
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <p>Welcome to Code Snippets.</p>
        <form
          className="create-snippet"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="New Snippet Name..."
            onChange={(e) => handleSnippetName(e)}
            name="createName"
            required
          />
          <button>Create Snippet</button>
        </form>
        <br />
        <hr />
        <br />
        <div className="snippets">
          <h3>Snippets</h3>
          {snippets.map((snippet, i) => {
            return (
              <p
                key={`${i}-${snippet.snippetName}`}
                onClick={() => {
                  dispatch(setCurrentSnippet(snippet.snippetName));
                }}
              >
                {snippet.snippetName}
              </p>
            );
          })}
        </div>
      </div>

      <div className="sidebar-footer">
        <p
          className="link"
          to="/login"
          onClick={() =>
            signOut(auth).then(() => {
              console.log("El usuario ha cerrado sesión");
              navigate("/login");
            })
          }
        >
          Log Out
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
