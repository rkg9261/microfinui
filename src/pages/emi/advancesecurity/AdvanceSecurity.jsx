import React, { useState } from "react";
import "./AdvanceSecurity.css";

import AdvanceSecurityForm from "./AdvanceSecurityForm";
import AdvanceSecurityTable from "./AdvanceSecurityTable";
import AdvanceSecurityView from "./AdvanceSecurityView";

const AdvanceSecurity = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      loanId: "45613BR1",
      memberName: "SONU",
      memberCode: "BR1:01:04",
      alias: "SONU 412",
      mobile: "9973467254",
      type: "EMI",
      centerName: "DALHOUSIE",
      payDate: "26-01-2026",
      amount: 500,
      receivedBy: "ADMIN (ADM01)",
      createdAt: "2026-01-26 23:50:22",
      status: "Pending",
      branch: "Kolkata",
    },
    {
      id: 2,
      loanId: "10201237",
      memberName: "MAKSUD ALAM",
      memberCode: "BR01:15596",
      alias: "BABLU ALAM",
      mobile: "9801366081",
      type: "EMI",
      centerName: "HOWRAH",
      payDate: "15-12-2025",
      amount: 26855,
      receivedBy: "ADMIN (ADM01)",
      createdAt: "2025-12-15 23:40:51",
      status: "Approved",
      branch: "Howrah",
    },
  ]);

  const [filters, setFilters] = useState({
    branch: "",
    paymentStatus: "Pending",
    date: "",
    paymentStartDate: "",
    paymentEndDate: "",
  });

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const [selectedRecord, setSelectedRecord] = useState(null);

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredRecords = records.filter((record) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      record.loanId.toLowerCase().includes(searchValue) ||
      record.memberName.toLowerCase().includes(searchValue) ||
      record.alias.toLowerCase().includes(searchValue) ||
      record.mobile.includes(searchValue);

    const matchesBranch =
      !filters.branch ||
      record.branch === filters.branch;

    const matchesStatus =
      !filters.paymentStatus ||
      filters.paymentStatus === "All" ||
      record.status === filters.paymentStatus;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesStatus
    );
  });

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return;
    }

    setRecords((previousRecords) =>
      previousRecords.filter(
        (record) => record.id !== id
      )
    );
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const closeView = () => {
    setSelectedRecord(null);
  };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     CLEAR FILTER
  ===================================================== */

  const handleClear = () => {
    setFilters({
      branch: "",
      paymentStatus: "Pending",
      date: "",
      paymentStartDate: "",
      paymentEndDate: "",
    });

    setSearch("");
  };

  return (
    <div className="advance-security-page">

      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <div className="advance-security-page-header">

        <h2>ADVANCE SECURITY</h2>

        <div className="advance-security-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Advance Security</strong>
        </div>

      </div>


      {/* ================================================
          FILTER FORM
      ================================================= */}

      <AdvanceSecurityForm
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />


      {/* ================================================
          TABLE
      ================================================= */}

      <AdvanceSecurityTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* ================================================
          VIEW POPUP
      ================================================= */}

      {selectedRecord && (
        <AdvanceSecurityView
          record={selectedRecord}
          onClose={closeView}
        />
      )}

    </div>
  );
};

export default AdvanceSecurity;