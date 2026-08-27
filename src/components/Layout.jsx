import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "./Layout.css";

const Layout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // true = hover mode
  // false = manual mode
  const [hoverEnabled, setHoverEnabled] = useState(true);


  // =========================================
  // FABAR CLICK
  // =========================================

  const handleSidebarToggle = () => {

    // Toggle sidebar
    setSidebarOpen((previous) => !previous);

    // Toggle hover mode
    setHoverEnabled((previous) => !previous);
  };


  return (
    <div className="app-layout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        hoverEnabled={hoverEnabled}
      />


      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={handleSidebarToggle}
      />


      <main
        className={`main-content ${
          sidebarOpen
            ? "content-open"
            : "content-close"
        }`}
      >
        {children}
      </main>

    </div>
  );
};

export default Layout;