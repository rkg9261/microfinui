import React from "react";
import "./Navbar.css";

import {
  FaBars,
  FaBook,
  FaWallet,
  FaChartLine,
  FaUserCircle,
  FaPowerOff,
  FaShieldAlt,
} from "react-icons/fa";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header
      className={`top-navbar ${sidebarOpen ? "sidebar-open" : "sidebar-close"}`}
    >
      {/* Left */}

      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Right */}

      <div className="navbar-right">
        <div className="nav-box">
          <FaShieldAlt />
          <span>SESSION : 2026-2027</span>
        </div>

        <div className="nav-box">
          <FaBook />
          <span>DAY BOOK</span>
        </div>

        <div className="nav-box">
          <FaWallet />
          <span>CASH BOOK</span>
        </div>

        <div className="nav-box">
          <FaChartLine />
          <span>VOUCHER ENTRIES</span>
        </div>

        <div className="admin-box">
          <FaUserCircle />

          <span>ADMIN</span>
        </div>

        <button className="logout-btn">
          <FaPowerOff />
        </button>
      </div>
    </header>
  );
};

export default Navbar;