import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="app">
      <div>
        <h1>404 Not Found</h1>
        <Link className="link" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
