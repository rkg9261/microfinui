import React, { useMemo, useState } from "react";
import DueEmiForm from "./DueEmiForm";
import DueEmiTable from "./DueEmiTable";
import DueEmiView from "./DueEmiView";
import "./DueEmi.css";

const DueEmi = () => {
  const [filters, setFilters] = useState({
    branch: "",
    designation: "",
    collectionDay: "EveryDay",
    staff: "",
    date: "",
    emiFromDate: "",
    emiToDate: "",
    type: "",
    city: "",
    recoveryType: "",
    sortBy: "",
    paymentStatus: "Due",
  });

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [records, setRecords] = useState([
    {
      id: 1,
      loanId: "9900",
      loanType: "FARMING",
      memberName: "SANGITA BALU KHARE",
      memberCode: "MEM-0001004",
      alias: "SANGITA BALU KHARE",
      mobile: "9529386632",
      type: "INDIVIDUAL",
      staff: "ANIL SINGHA",
      staffCode: "BRINKB000124",
      emiDate: "03-08-2026",
      advanceEmi: 0,
      emiNo: 27,
      penalty: 1058,
      duesEmi: 2386,
      status: "Pending",
      branch: "KOLKATA",
      centerName: "SHREEJA GROUP",
      recoveryType: "Regular",
    },

    {
      id: 2,
      loanId: "9901",
      loanType: "FARMING",
      memberName: "PARAMJIT KAUR",
      memberCode: "MEM-0001007",
      alias: "PARAMJIT KAUR",
      mobile: "9876543213",
      type: "INDIVIDUAL",
      staff: "AADITYA KUMAR",
      staffCode: "AM5",
      emiDate: "03-08-2026",
      advanceEmi: 0,
      emiNo: 26,
      penalty: 160,
      duesEmi: 80,
      status: "Partial",
      branch: "DELHI",
      centerName: "MAA GROUP",
      recoveryType: "Regular",
    },

  ]);

  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      designation: "",
      collectionDay: "EveryDay",
      staff: "",
      date: "",
      emiFromDate: "",
      emiToDate: "",
      type: "",
      city: "",
      recoveryType: "",
      sortBy: "",
      paymentStatus: "Due",
    });
  };

  const handleGetRecord = () => {
    console.log("Due EMI Filters:", filters);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseView = () => {
    setSelectedRecord(null);
  };

  const handlePayNow = (record) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              status: "Paid",
              duesEmi: 0,
            }
          : item
      )
    );

    setSelectedRecord(null);
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.loanId,
          item.memberName,
          item.memberCode,
          item.alias,
          item.mobile,
          item.branch,
          item.staff,
          item.centerName,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(value)
      );
    }

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.staff) {
      result = result.filter(
        (item) => item.staff === filters.staff
      );
    }

    if (filters.type) {
      result = result.filter(
        (item) => item.type === filters.type
      );
    }

    if (filters.recoveryType) {
      result = result.filter(
        (item) => item.recoveryType === filters.recoveryType
      );
    }

    if (filters.paymentStatus) {
      if (filters.paymentStatus === "Due") {
        result = result.filter(
          (item) =>
            item.status === "Pending" ||
            item.status === "Partial"
        );
      } else {
        result = result.filter(
          (item) => item.status === filters.paymentStatus
        );
      }
    }

    return result;
  }, [records, search, filters]);

  const totalEmi = filteredRecords.reduce(
    (sum, item) => sum + item.duesEmi,
    0
  );

  const totalAmount = filteredRecords.reduce(
    (sum, item) => sum + item.duesEmi + item.penalty,
    0
  );

  return (
    <div className="due-emi-page">

      <div className="due-emi-page-title">
        <h2>EMI COLLECTION</h2>

        <div className="due-emi-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Due EMI</strong>
        </div>
      </div>

      <DueEmiForm
        filters={filters}
        onChange={handleChange}
        onClear={handleClear}
        onGetRecord={handleGetRecord}
      />

      <DueEmiTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        totalEmi={totalEmi}
        totalAmount={totalAmount}
        onView={handleView}
        onPayNow={handlePayNow}
      />

      {selectedRecord && (
        <DueEmiView
          record={selectedRecord}
          onClose={handleCloseView}
          onPayNow={handlePayNow}
        />
      )}
    </div>
  );
};

export default DueEmi;