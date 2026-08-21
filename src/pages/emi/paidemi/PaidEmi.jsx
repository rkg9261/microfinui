import React, { useMemo, useState } from "react";
import PaidEmiForm from "./PaidEmiForm";
import PaidEmiTable from "./PaidEmiTable";
import PaidEmiView from "./PaidEmiView";
import "./PaidEmi.css";

const PaidEmi = () => {
  const [filters, setFilters] = useState({
    branch: "",
    staff: "",
    member: "",
    collectionType: "",
    applicationNo: "",
    paymentStatus: "",
    date: "",
    paymentStartDate: "",
    paymentEndDate: "",
  });

  const [records, setRecords] = useState([
    {
      id: 1,
      loanId: "9900",
      memberCode: "MEM-0001004",
      memberName: "SANGITA BALU KHARE",
      alias: "SANGITA BALU KHARE",
      mobile: "9529386632",
      type: "EMI",
      centerName: "SHREEJA GROUP",
      payDate: "19-08-2026",
      amount: 1058,
      branch: "KOLKATA",
      receivedBy: "ADMIN (ADMO1)",
      approvedBy: "ADMIN (ADMO1)",
      created: "2026-08-19 15:12:37",
      status: "Pending",
    },
    {
      id: 2,
      loanId: "9901",
      memberCode: "MEM-0001005",
      memberName: "PRIYA SHARMA",
      alias: "PRIYA SHARMA",
      mobile: "9876543210",
      type: "EMI",
      centerName: "MAA GROUP",
      payDate: "18-08-2026",
      amount: 1250,
      branch: "DELHI",
      receivedBy: "ADMIN (ADMO1)",
      approvedBy: "ADMIN (ADMO1)",
      created: "2026-08-18 14:25:10",
      status: "Approved",
    },

  ]);

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      staff: "",
      member: "",
      collectionType: "",
      applicationNo: "",
      paymentStatus: "",
      date: "",
      paymentStartDate: "",
      paymentEndDate: "",
    });
  };

  const handleGetRecord = () => {
    console.log("Filters:", filters);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseView = () => {
    setSelectedRecord(null);
  };

  const handleTask = (record, action) => {
    setRecords((prev) =>
      prev.map((item) => {
        if (item.id !== record.id) {
          return item;
        }

        if (action === "approve") {
          return {
            ...item,
            status: "Approved",
            approvedBy: "ADMIN (ADMO1)",
          };
        }

        if (action === "pending") {
          return {
            ...item,
            status: "Pending",
            approvedBy: "",
          };
        }

        return item;
      })
    );
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.loanId,
          item.memberCode,
          item.memberName,
          item.alias,
          item.mobile,
          item.branch,
          item.centerName,
          item.type,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue)
      );
    }

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.staff) {
      result = result.filter(
        (item) => item.receivedBy === filters.staff
      );
    }

    if (filters.member) {
      result = result.filter(
        (item) => item.memberName === filters.member
      );
    }

    if (filters.collectionType) {
      result = result.filter(
        (item) => item.type === filters.collectionType
      );
    }

    if (filters.applicationNo) {
      result = result.filter((item) =>
        item.loanId
          .toLowerCase()
          .includes(filters.applicationNo.toLowerCase())
      );
    }

    if (filters.paymentStatus) {
      result = result.filter(
        (item) => item.status === filters.paymentStatus
      );
    }

    return result;
  }, [records, search, filters]);

  return (
    <div className="paid-emi-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="paid-emi-page-header">

        <h2>SHOW COLLECTION</h2>

        <div className="paid-emi-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Paid EMI</strong>
        </div>

      </div>


      {/* =====================================================
          FILTER FORM
      ===================================================== */}

      <PaidEmiForm
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        onGetRecord={handleGetRecord}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <PaidEmiTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        onTask={handleTask}
        onView={handleView}
      />


      {/* =====================================================
          VIEW POPUP
      ===================================================== */}

      {selectedRecord && (
        <PaidEmiView
          record={selectedRecord}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default PaidEmi;