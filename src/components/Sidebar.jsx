import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  FaTachometerAlt,
  FaDatabase,
  FaBoxOpen,
  FaUsers,
  FaUserFriends,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaMoneyBillWave,
  FaCheckSquare,
  FaFolderOpen,
  FaChevronRight,

  // New menu icons
  FaDownload,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaHistory,

  // Accounting icons
  FaEdit,
  FaExchangeAlt,
  FaUsersCog,
  FaChartLine,
  FaEye,
  FaBook,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  // =========================================================
  // MAIN MENU STATE
  // =========================================================

  const [openMenu, setOpenMenu] = useState("");

  // =========================================================
  // ACCOUNTING SUB MENU STATE
  // =========================================================

  const [openAccountingMenu, setOpenAccountingMenu] =
    useState("");

  // =========================================================
  // MAIN MENU TOGGLE
  // =========================================================

  const toggleMenu = (menu) => {
    setOpenMenu((prev) =>
      prev === menu ? "" : menu
    );
  };

  // =========================================================
  // ACCOUNTING MENU TOGGLE
  // =========================================================

  const toggleAccountingMenu = (menu) => {
    setOpenAccountingMenu((prev) =>
      prev === menu ? "" : menu
    );
  };

  // =========================================================
  // MAIN MENU ITEMS
  // =========================================================

  const menuItems = [

    // =======================================================
    // MASTER
    // =======================================================

    {
      title: "MASTER",
      key: "master",
      icon: (
        <FaDatabase className="icon-blue" />
      ),

      submenu: [

        {
          title: "LOAN PLAN",
          path: "/loan-plan",
        },

        {
          title: "PENALTY SCHEME",
          path: "/penalty-scheme",
        },

        {
          title: "BRANCHES",
          path: "/branches",
        },

        {
          title: "STAFF BRANCH",
          path: "/staff-branch",
        },

        {
          title: "BRANCH CENTER",
          path: "/branch-center",
        },

        {
          title: "GROUPS",
          path: "/groups",
        },

        {
          title: "STATE",
          path: "/state",
        },

        {
          title: "BANK",
          path: "/bank",
        },

        {
          title: "DESIGNATION",
          path: "/designation",
        },

        {
          title: "LEAVE",
          path: "/leave",
        },

        {
          title: "MISCELLANEOUS",
          path: "/miscellaneous",
        },

        {
          title: "SOFTWARE TIMING",
          path: "/software-timing",
        },

        {
          title: "SESSION",
          path: "/session",
        },

        {
          title: "SETTING",
          path: "/setting",
        },

        {
          title: "SMS TESTING",
          path: "/sms-testing",
        },

        {
          title: "SERIES",
          path: "/series",
        },

      ],
    },

    // =======================================================
    // PRODUCT MASTER
    // =======================================================

    {
      title: "PRODUCT MASTER",
      key: "product",
      icon: (
        <FaBoxOpen className="icon-orange" />
      ),

      submenu: [

        {
          title: "PRODUCT CATEGORY",
          path: "/product-category",
        },

        {
          title: "PRODUCT BRAND",
          path: "/product-brand",
        },

        {
          title: "PRODUCT VARIANT",
          path: "/product-variant",
        },

        {
          title: "PRODUCT SUPPLIER",
          path: "/product-supplier",
        },

        {
          title: "PRODUCT",
          path: "/products",
        },

        {
          title: "PRODUCT LOAN",
          path: "/product-loan",
        },

        {
          title: "INSURANCE PARTY",
          path: "/insurance-party",
        },

      ],
    },

    // =======================================================
    // HRM
    // =======================================================

    {
      title: "HRM",
      key: "hrm",
      icon: (
        <FaUsers className="icon-purple" />
      ),

      submenu: [

        {
          title: "Employee",
          path: "/employee",
        },

        {
          title: "Attendance",
          path: "/attendance",
        },

        {
          title: "Salary",
          path: "/salary",
        },

        {
          title: "Leave",
          path: "/leave",
        },

      ],
    },

    // =======================================================
    // MEMBERS
    // =======================================================

    {
      title: "MEMBERS",
      key: "members",
      icon: (
        <FaUserFriends className="icon-cyan" />
      ),

      submenu: [

        {
          title: "Member",
          path: "/members",
        },

        {
          title: "Group Member",
          path: "/group-member",
        },

        {
          title: "Member CGT & GRT",
          path: "/memberCgt",
        },

      ],
    },

    // =======================================================
    // APPLY FOR LOAN
    // =======================================================

    {
      title: "APPLY FOR LOAN",
      key: "loan",
      icon: (
        <FaMoneyCheckAlt className="icon-red" />
      ),

      submenu: [

        {
          title: "Download Loan Form",
          path: "/download-loanform",
        },

        {
          title: "Loan Topup",
          path: "/loan-topup",
        },

        {
          title: "Individual Loan",
          path: "/individual-loan",
        },

        {
          title: "Group Loan",
          path: "/group-loan",
        },

      ],
    },

    // =======================================================
    // DISBURSEMENT
    // =======================================================

    {
      title: "DISBURSEMENT",
      key: "disbursement",
      icon: (
        <FaFileInvoiceDollar className="icon-teal" />
      ),

      submenu: [

        {
          title: "DISBURSEMENT",
          path: "/disbursement",
        },

        {
          title: "GROUP-MEMBER",
          path: "/group-disbursement",
        },

      ],
    },

    // =======================================================
    // LOAN SUMMARY
    // =======================================================

    {
      title: "LOAN SUMMARY",
      key: "loan-summary",
      icon: (
        <FaClipboardList className="icon-indigo" />
      ),

      path: "/loan-summary",
    },

    // =======================================================
    // EMI RECORDS
    // =======================================================

    {
      title: "EMI RECORDS",
      key: "emi-records",
      icon: (
        <FaMoneyBillWave className="icon-yellow" />
      ),

     
        submenu: [

        {
          title: "ADVANCE SECURITY",
          path: "/emi-advance-security",
        },

        {
          title: "PAID EMIS",
          path: "/paid-emi",
        },

        {
          title: "DUE EMI",
          path: "/due-emi",
        },
        
        {
          title: "DUE PENALTY",
          path: "/penalty-due",
        },

        {
          title: "FUTURE DUE EMIS",
          path: "/future-due",
        },
        {
          title: "PROMISE TO PAY",
          path: "/promise-pay",
        },

        {
          title: "GROUP EMI COLLECTIONS",
          path: "/group-emi",
        },

        
        {
          title: "MEMEBER COLLECTION (OLD)",
          path: "/memeber-collection(old)",
        },
        {
          title: "MEMEBER COLLECTION (NEW)",
          path: "/memeber-collection(new)",
        },

        
      ],
    },

    // =======================================================
    // APPROVALS
    // =======================================================

    {
      title: "APPROVALS",
      key: "approvals",
      icon: (
        <FaCheckSquare className="icon-pink" />
      ),

     

        submenu: [

        {
          title: "LOAN",
          path: "/approval-loan",
        },

        {
          title: "SALARY",
          path: "/approval-salary",
        },

        {
          title: "COLLECTION",
          path: "/approval-collection",
        },

        {
          title: "PRODUCT-LOAN",
          path: "/approve-product-loan",
        },
        {
          title: "SETTLEMENT",
          path: "/settlement",
        },

        {
          title: "FUND TRANSFER",
          path: "/fund-transfer",
        },
      ],
    },

    // =======================================================
    // LOAN CASE
    // =======================================================

    {
      title: "LOAN CASE",
      key: "loan-case",
      icon: (
        <FaFolderOpen className="icon-brown" />
      ),

      path: "/loan-case",
    },

    // =======================================================
    // CIBIL FORMAT DOWNLOAD
    // =======================================================

    {
      title: "CIBIL FORMAT DOWNLOAD",
      key: "cibil-format-download",
      icon: (
        <FaDownload className="icon-orange" />
      ),

      path: "/cibil-format-download",
    },

    // =======================================================
    // AREA SURVEY
    // =======================================================

    {
      title: "AREA SURVEY",
      key: "area-survey",
      icon: (
        <FaMapMarkerAlt className="icon-pink" />
      ),

      path: "/area-survey",
    },

    // =======================================================
    // LOG RECORDS
    // =======================================================

    {
      title: "LOG RECORDS",
      key: "log-records",
      icon: (
        <FaSignInAlt className="icon-blue" />
      ),

      path: "/log-records",
    },

    // =======================================================
    // LOAN HISTORY
    // =======================================================

    {
      title: "LOAN HISTORY",
      key: "loan-history",
      icon: (
        <FaHistory className="icon-blue" />
      ),

      path: "/loan-history",
    },

  ];

  // =========================================================
  // ACCOUNTING MENU
  // =========================================================

  const accountingItems = [

    // =======================================================
    // VOUCHER
    // =======================================================

    {
      title: "VOUCHER",
      key: "voucher",
      icon: (
        <FaEdit className="accounting-icon-green" />
      ),

      submenu: [

        {
          title: "DAY BOOK",
          path: "/day-book",
        },

        {
          title: "CASH BOOK",
          path: "/cash-book",
        },

        {
          title: "VOUCHER ENTRIES",
          path: "/voucher-entries",
        },

        {
          title: "PAYMENT",
          path: "/payment",
        },

        {
          title: "RECEIPT",
          path: "/receipt",
        },

        {
          title: "CONTRA",
          path: "/contra",
        },

        {
          title: "JOURNAL",
          path: "/journal",
        },

        {
          title: "TRIAL BALANCE",
          path: "/trial-balance",
        },

        {
          title: "FY TRIAL BALANCE",
          path: "/fy-trial-balance",
        },

        {
          title: "FY VOUCHER STATEMENT",
          path: "/fy-voucher-statement",
        },

        {
          title: "FY OPENING BALANCE",
          path: "/fy-opening-balance",
        },

      ],
    },

    // =======================================================
    // FUND TRANSFER
    // =======================================================

    {
      title: "FUND TRANSFER",
      key: "fund-transfer",
      icon: (
        <FaExchangeAlt className="accounting-icon-blue" />
      ),

      path: "/fund-transfer",
    },

    // =======================================================
    // ACGROUP
    // =======================================================

    {
      title: "ACGROUP",
      key: "acgroup",
      icon: (
        <FaUsersCog className="accounting-icon-purple" />
      ),

      path: "/acgroup",
    },

    // =======================================================
    // PROFIT LOSS
    // =======================================================

    {
      title: "PROFIT-LOSS",
      key: "profit-loss",
      icon: (
        <FaChartLine className="accounting-icon-green" />
      ),

      path: "/profit-loss",
    },

    // =======================================================
    // OVERVIEW
    // =======================================================

    {
      title: "OVERVIEW",
      key: "overview",
      icon: (
        <FaEye className="accounting-icon-yellow" />
      ),

      path: "/overview",
    },

    // =======================================================
    // LEDGER
    // =======================================================

    {
      title: "LEDGER",
      key: "ledger",
      icon: (
        <FaBook className="accounting-icon-blue" />
      ),

      path: "/ledger",
    },

    // =======================================================
    // BRANCH LEDGER
    // =======================================================

    {
      title: "BRANCH LEDGER",
      key: "branch-ledger",
      icon: (
        <FaBuilding className="accounting-icon-brown" />
      ),

      path: "/branch-ledger",
    },

  ];

  // =========================================================
  // REPORTING ITEMS
  // =========================================================

  const reportingItems = [

    {
      title: "REPORTING",
      path: "/reporting",
    },

  ];

  return (

    <aside
      className={`sidebar ${
        sidebarOpen
          ? "open"
          : "close"
      }`}

      onMouseEnter={() =>
        setSidebarOpen(true)
      }

      onMouseLeave={() =>
        setSidebarOpen(false)
      }
    >

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="sidebar-logo">

        <img
          src="https://images-platform.99static.com/C4X2T4gOTyMopKdpRxN4WWm63Yo=/500x500/top/smart/99designs-contests-attachments/7/7745/attachment_7745006"
          alt="Logo"
        />

      </div>

      {/* =====================================================
          USER
      ===================================================== */}

      <div className="sidebar-user">

        <div className="user-details">

          <span>
            ADMIN
          </span>

          <p>

            <span className="online-dot"></span>

            DEGN: ADMIN

          </p>

        </div>

      </div>

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <NavLink
        to="/"

        className={({ isActive }) =>
          isActive
            ? "sidebar-item active"
            : "sidebar-item"
        }
      >

        <div className="sidebar-left">

          <FaTachometerAlt
            className="menu-icon icon-green"
          />

          <span>
            DASHBOARD
          </span>

        </div>

      </NavLink>

      {/* =====================================================
          MAIN DYNAMIC MENUS
      ===================================================== */}

      {menuItems.map((item) => (

        <div
          className="menu-block"
          key={item.key}
        >

          {/* =================================================
              MENU WITH SUBMENU
          ================================================= */}

          {item.submenu ? (

            <>

              <div
                className="sidebar-item"
                onClick={() =>
                  toggleMenu(item.key)
                }
              >

                <div className="sidebar-left">

                  {item.icon}

                  <span>
                    {item.title}
                  </span>

                </div>

                <FaChevronRight
                  className={`arrow ${
                    openMenu === item.key
                      ? "rotate"
                      : ""
                  }`}
                />

              </div>

              <div
                className={`submenu ${
                  openMenu === item.key
                    ? "show"
                    : ""
                }`}
              >

                {item.submenu.map(
                  (sub, index) => (

                    <NavLink
                      key={index}
                      to={sub.path}

                      className={({ isActive }) =>
                        isActive
                          ? "submenu-item submenu-active"
                          : "submenu-item"
                      }
                    >

                      {sub.title}

                    </NavLink>

                  )
                )}

              </div>

            </>

          ) : (

            /* =================================================
               NORMAL MENU LINK
            ================================================= */

            <NavLink
              to={item.path}

              className={({ isActive }) =>
                isActive
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >

              <div className="sidebar-left">

                {item.icon}

                <span>
                  {item.title}
                </span>

              </div>

            </NavLink>

          )}

        </div>

      ))}

      {/* =====================================================
          ACCOUNTING HEADING
      ===================================================== */}

      <div className="sidebar-section-title">
        ACCOUNTING
      </div>

      {/* =====================================================
          ACCOUNTING MENU
      ===================================================== */}

      <div className="accounting-menu">

        {accountingItems.map(
          (item) => (

            <div
              className="accounting-block"
              key={item.key}
            >

              {/* =================================================
                  ITEMS WITH SUBMENU
              ================================================= */}

              {item.submenu ? (

                <>

                  <div
                    className="sidebar-item accounting-item"
                    onClick={() =>
                      toggleAccountingMenu(
                        item.key
                      )
                    }
                  >

                    <div className="sidebar-left">

                      {item.icon}

                      <span>
                        {item.title}
                      </span>

                    </div>

                    <FaChevronRight
                      className={`arrow accounting-arrow ${
                        openAccountingMenu ===
                        item.key
                          ? "rotate"
                          : ""
                      }`}
                    />

                  </div>

                  <div
                    className={`accounting-submenu ${
                      openAccountingMenu ===
                      item.key
                        ? "show"
                        : ""
                    }`}
                  >

                    {item.submenu.map(
                      (
                        sub,
                        index
                      ) => (

                        <NavLink
                          key={index}
                          to={sub.path}

                          className={({ isActive }) =>
                            isActive
                              ? "accounting-submenu-item accounting-submenu-active"
                              : "accounting-submenu-item"
                          }
                        >

                          <span className="accounting-radio">
                            ○
                          </span>

                          {sub.title}

                        </NavLink>

                      )
                    )}

                  </div>

                </>

              ) : (

                /* =================================================
                   NORMAL ACCOUNTING LINK
                ================================================= */

                <NavLink
                  to={item.path}

                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-item accounting-item accounting-active"
                      : "sidebar-item accounting-item"
                  }
                >

                  <div className="sidebar-left">

                    {item.icon}

                    <span>
                      {item.title}
                    </span>

                  </div>

                </NavLink>

              )}

            </div>

          )
        )}

      </div>

      {/* =====================================================
          REPORTING HEADING
      ===================================================== */}

      <div className="sidebar-section-title">
        REPORTING
      </div>

      {/* =====================================================
          REPORTING
      ===================================================== */}

      {reportingItems.map(
        (item) => (

          <NavLink
            key={item.path}
            to={item.path}

            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >

            <div className="sidebar-left">

              <FaFileAlt
                className="accounting-icon-blue"
              />

              <span>
                {item.title}
              </span>

            </div>

            <FaChevronRight
              className="arrow"
            />

          </NavLink>

        )
      )}

    </aside>

  );
};

export default Sidebar;