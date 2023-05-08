import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

function Sidebar() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <p>Welcome to Code Snippets.</p>
        <form className="create-snippet">
          <input type="text" placeholder="New Snippet Name..." />
          <button>Create Snippet</button>
        </form>
        <br />
        <hr />
        <br />
        <div className="snippets">
          <p>Snippet 1</p>
          <p>Snippet 2</p>
          <p>Snippet 3</p>
          <p>Snippet 3</p>
          <p>Snippet 3</p>
          <p>Snippet 3</p>
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
