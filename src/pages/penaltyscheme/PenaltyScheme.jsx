import React, { useState } from "react";

import "./PenaltyScheme.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import PenaltySchemeTable from "./PenaltySchemeTable";
import PenaltySchemeForm from "./PenaltySchemeForm";

import { AddButton } from "../../components/buttons";

const PenaltyScheme = () => {
  // =========================================
  // INITIAL STATIC DATA
  // =========================================

const [penaltySchemes, setPenaltySchemes] = useState([
  {
    id: 1,
    schemeName: "Late Payment Penalty",
    penaltyType: "Percentage",
    amount: 2,
    minimumAmount: 100,
    gracePeriod: "5 Days",
    penaltyMode: "Monthly",
    recurring: "Yes",
    createdAt: "26 Aug 2026",
    status: "ACTIVE",
  },

  {
    id: 2,
    schemeName: "Overdue Loan Penalty",
    penaltyType: "Fixed Amount",
    amount: 500,
    minimumAmount: 500,
    gracePeriod: "7 Days",
    penaltyMode: "Monthly",
    recurring: "Yes",
    createdAt: "25 Aug 2026",
    status: "ACTIVE",
  },

  {
    id: 3,
    schemeName: "EMI Delay Penalty",
    penaltyType: "Percentage",
    amount: 1.5,
    minimumAmount: 50,
    gracePeriod: "3 Days",
    penaltyMode: "Daily",
    recurring: "Yes",
    createdAt: "24 Aug 2026",
    status: "ACTIVE",
  },


]);

  // =========================================
  // STATES
  // =========================================

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editData, setEditData] = useState(null);

  // =========================================
  // SEARCH
  // =========================================

  const filteredData = penaltySchemes.filter((item) =>
    item.schemeName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================================
  // ADD
  // =========================================

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  // =========================================
  // EDIT
  // =========================================

  const handleEdit = (data) => {
    setEditData(data);
    setOpenForm(true);
  };

  // =========================================
  // SAVE
  // =========================================

  const savePenaltyScheme = (formData) => {
    // =====================================
    // EDIT EXISTING RECORD
    // =====================================

    if (editData) {
      setPenaltySchemes((previousData) =>
        previousData.map((item) =>
          item.id === editData.id
            ? {
                ...formData,
                id: editData.id,
              }
            : item
        )
      );

      alert("Penalty Scheme updated successfully");
    }

    // =====================================
    // ADD NEW RECORD
    // =====================================

    else {
      const newPenaltyScheme = {
        ...formData,
        id: Date.now(),
      };

      setPenaltySchemes((previousData) => [
        ...previousData,
        newPenaltyScheme,
      ]);

      alert("Penalty Scheme added successfully");
    }

    // Close form

    setOpenForm(false);
    setEditData(null);
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDeleteSuccess = (id) => {
    setPenaltySchemes((previousData) =>
      previousData.filter((item) => item.id !== id)
    );
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditData(null);
  };

  // =========================================
  // JSX
  // =========================================

  return (
    <div className="penalty-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="penalty-header">

        <div>
          <h2>Penalty Scheme List</h2>

          <p>
            Manage Penalty Schemes
          </p>
        </div>

        <AddButton
          text="Add New"
          onClick={handleAdd}
        />

      </div>


      {/* =====================================
          SEARCH
      ====================================== */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Penalty Scheme..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =====================================
          TABLE
      ====================================== */}

      <PenaltySchemeTable
        data={filteredData}
        onEdit={handleEdit}
        onDeleteSuccess={handleDeleteSuccess}
      />


      {/* =====================================
          FORM
      ====================================== */}

      {openForm && (
        <PenaltySchemeForm
          onClose={handleCloseForm}
          onSave={savePenaltyScheme}
          editData={editData}
        />
      )}

    </div>
  );
};

export default PenaltyScheme;