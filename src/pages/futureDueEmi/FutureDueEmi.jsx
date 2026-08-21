import React, { useMemo, useState } from "react";
import FutureDueEmiForm from "./FutureDueEmiForm";
import FutureDueEmiTable from "./FutureDueEmiTable";
import FutureDueEmiView from "./FutureDueEmiView";
import "./FutureDueEmi.css";

const FutureDueEmi = () => {
  const [filters, setFilters] = useState({
    branch: "",
    recoveryType: "",
    designation: "",
    staff: "",
    date: "",
    orderByEmiDate: "",
    orderByGroup: "",
    type: "",
    city: "",
    paymentStatus: "Unpaid",
  });

  const [entries, setEntries] = useState(10);

  const [loanSearch, setLoanSearch] = useState("");

  const [memberSearch, setMemberSearch] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  const [records, setRecords] = useState([
    {
      id: 1,
      loanId: "9900",
      loanType: "FARMING",

      memberName: "SANGITA BALU KHARE",
      memberCode: "MEM-0001004",

      mobile: "9529386632",

      type: "INDIVIDUAL",

      staff: "ANIL SINGHA",
      staffCode: "BRINKB000124",

      previousDate: "03-08-2026",
      emiDate: "03-09-2026",

      advanceEmi: 0,
      emiNo: 27,
      dues: 1,

      advance: 0,

      emiTotal: 1058,
      payableAmount: 1058,

      previousStatus: "PENDING",

      status: "Unpaid",

      branch: "KOLKATA",
      group: "SHREEJA GROUP",

      recoveryType: "Regular",
    },

    {
      id: 2,
      loanId: "9901",
      loanType: "FARMING",

      memberName: "PARAMJIT KAUR",
      memberCode: "MEM-0001007",

      mobile: "9876543213",

      type: "INDIVIDUAL",

      staff: "AADITYA KUMAR",
      staffCode: "AM5",

      previousDate: "04-08-2026",
      emiDate: "04-09-2026",

      advanceEmi: 0,
      emiNo: 26,
      dues: 1,

      advance: 0,

      emiTotal: 850,
      payableAmount: 850,

      previousStatus: "PENDING",

      status: "Unpaid",

      branch: "DELHI",
      group: "MAA GROUP",

      recoveryType: "Regular",
    },


  ]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      recoveryType: "",
      designation: "",
      staff: "",
      date: "",
      orderByEmiDate: "",
      orderByGroup: "",
      type: "",
      city: "",
      paymentStatus: "Unpaid",
    });
  };

  const handleGetRecord = () => {
    console.log("Future Due EMI Filters:", filters);
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
              payableAmount: 0,
            }
          : item
      )
    );

    setSelectedRecord(null);
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (loanSearch.trim()) {
      const value = loanSearch.toLowerCase();

      result = result.filter((item) =>
        item.loanId
          .toLowerCase()
          .includes(value)
      );
    }

    if (memberSearch.trim()) {
      const value = memberSearch.toLowerCase();

      result = result.filter((item) =>
        [
          item.memberName,
          item.memberCode,
          item.mobile,
        ]
          .join(" ")
          .toLowerCase()
          .includes(value)
      );
    }

    if (filters.branch) {
      result = result.filter(
        (item) =>
          item.branch === filters.branch
      );
    }

    if (filters.recoveryType) {
      result = result.filter(
        (item) =>
          item.recoveryType ===
          filters.recoveryType
      );
    }

    if (filters.staff) {
      result = result.filter(
        (item) =>
          item.staff === filters.staff
      );
    }

    if (filters.type) {
      result = result.filter(
        (item) =>
          item.type === filters.type
      );
    }

    if (
      filters.paymentStatus &&
      filters.paymentStatus !== "Unpaid"
    ) {
      result = result.filter(
        (item) =>
          item.status ===
          filters.paymentStatus
      );
    }

    if (filters.orderByEmiDate === "asc") {
      result.sort((a, b) =>
        a.emiDate.localeCompare(
          b.emiDate
        )
      );
    }

    if (filters.orderByEmiDate === "desc") {
      result.sort((a, b) =>
        b.emiDate.localeCompare(
          a.emiDate
        )
      );
    }

    if (filters.orderByGroup === "asc") {
      result.sort((a, b) =>
        a.group.localeCompare(
          b.group
        )
      );
    }

    if (filters.orderByGroup === "desc") {
      result.sort((a, b) =>
        b.group.localeCompare(
          a.group
        )
      );
    }

    return result;
  }, [
    records,
    filters,
    loanSearch,
    memberSearch,
  ]);

  const emiTotal = filteredRecords.reduce(
    (sum, item) =>
      sum + Number(item.emiTotal),
    0
  );

  const payableAmount = filteredRecords.reduce(
    (sum, item) =>
      sum + Number(item.payableAmount),
    0
  );

  return (
    <div className="future-due-emi-page">

      <div className="future-due-emi-page-header">
        <h2>EMIDEMANDLIST</h2>

        <div className="future-due-emi-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>EMIDEMANDLIST</strong>
        </div>
      </div>

      <FutureDueEmiForm
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        onGetRecord={handleGetRecord}
      />

      <FutureDueEmiTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        loanSearch={loanSearch}
        setLoanSearch={setLoanSearch}
        memberSearch={memberSearch}
        setMemberSearch={setMemberSearch}
        emiTotal={emiTotal}
        payableAmount={payableAmount}
        onView={handleView}
        onPayNow={handlePayNow}
      />

      {selectedRecord && (
        <FutureDueEmiView
          record={selectedRecord}
          onClose={handleCloseView}
          onPayNow={handlePayNow}
        />
      )}

    </div>
  );
};

export default FutureDueEmi;