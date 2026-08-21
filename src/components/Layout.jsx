import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className={`main-content ${
          sidebarOpen ? "content-open" : "content-close"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;