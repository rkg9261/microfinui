import React, { useMemo, useState } from "react";
import PromiseToPayForm from "./PromiseToPayForm";
import PromiseToPayTable from "./PromiseToPayTable";
import "./PromiseToPay.css";

const PromiseToPay = () => {
  const [filters, setFilters] = useState({
    branch: "",
    date: "",
  });

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  const [records] = useState([
    {
      id: 1,
      loanId: "10201238",
      name: "SONY (EG:1AMSF MEM30)",
      group: "-",
      amount: 2800,
      geoLocation: "-",
      promiseDate: "06-04-2026",
      promiseNote: "NEXT WEEK",
      branch: "JAGATPURA",
      status: "PENDING",
    },

    {
      id: 2,
      loanId: "10201238",
      name: "SONY (EG:1AMSF MEM30)",
      group: "-",
      amount: 800,
      geoLocation: "-",
      promiseDate: "01-02-2026",
      promiseNote: "ME KAL DE DUNGA",
      branch: "JAGATPURA",
      status: "PENDING",
    },


  ]);

  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetRecord = () => {
    console.log("Promise To Pay Filters:", filters);
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      date: "",
    });
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.date) {
      result = result.filter(
        (item) => item.promiseDate === filters.date
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
    }

    return result;
  }, [records, filters, search]);

  return (
    <div className="promise-to-pay-page">

      {/* PAGE HEADER */}

      <div className="promise-to-pay-page-header">

        <h2>PROMISETOPAY</h2>

        <div className="promise-to-pay-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>PROMISETOPAY</strong>
        </div>

      </div>

      {/* FILTER */}

      <PromiseToPayForm
        filters={filters}
        onChange={handleChange}
        onGetRecord={handleGetRecord}
        onClear={handleClear}
      />

      {/* TABLE */}

      <PromiseToPayTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
      />

    </div>
  );
};

export default PromiseToPay;