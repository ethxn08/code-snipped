import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <p>Welcome to Code Snippeds.</p>
        <form className="create-snipped">
          <input type="text" placeholder="New Snipped Name..." />
          <button>Create Snipped</button>
        </form>
        <br />
        <div className="snippeds">
          <p>Snipped 1</p>
          <p>Snipped 2</p>
          <p>Snipped 3</p>
          <p>Snipped 3</p>
          <p>Snipped 3</p>
          <p>Snipped 3</p>
        </div>
      </div>

      <div className="sidebar-footer">
        <p>Log Out</p>
      </div>
    </aside>
  );
}

export default Sidebar;
