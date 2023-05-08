import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <p>Welcome to Code Snippets.</p>
        <form className="create-snippet">
          <input type="text" placeholder="New Snippet Name..." />
          <button>Create Snippet</button>
        </form>
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
        <p>Log Out</p>
      </div>
    </aside>
  );
}

export default Sidebar;
