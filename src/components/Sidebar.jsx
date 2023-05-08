import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <p>Este es el contenido de mi sidebar.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
