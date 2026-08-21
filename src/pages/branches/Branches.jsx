import React, { useState } from "react";

import "./Branches.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import BranchesTable from "./BranchesTable";
import BranchesForm from "./BranchesForm";

import {
  AddButton,
} from "../../components/buttons";

const Branches = () => {

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [branches, setBranches] = useState([
    {
      id: 1,
      branchName: "LASKARHAT",
      code: "EG-2",
      phone: "9909091425",
      city: "KUDAL",
      state: "MAHARASHTRA",
      openingDate: "02-02-2026",
      status: "ACTIVE",
    },
    {
      id: 2,
      branchName: "JAGATPURA",
      code: "EG-1",
      phone: "7070779568",
      city: "DALSINGHSARAI",
      state: "BIHAR",
      openingDate: "21-04-2025",
      status: "ACTIVE",
    },
  ]);

  const filteredBranches = branches.filter((item) =>
    item.branchName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const saveBranch = (newBranch) => {

    setBranches((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newBranch,
      },
    ]);

    setOpenForm(false);

  };

  return (

    <div className="branches-page">

      {/* ===============================
              HEADER
      =============================== */}

      <div className="branches-header">

        <div>

          <h2>Branch List</h2>

          <p>
            Manage All Branches
          </p>

        </div>

        <AddButton
          text="Add New"
          onClick={() => setOpenForm(true)}
        />

      </div>

      {/* ===============================
              SEARCH
      =============================== */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Branch..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* ===============================
              TABLE
      =============================== */}

      <BranchesTable
        data={filteredBranches}
      />

      {/* ===============================
              POPUP
      =============================== */}

      {openForm && (

        <BranchesForm
          onClose={() =>
            setOpenForm(false)
          }
          onSave={saveBranch}
        />

      )}

    </div>

  );

};

export default Branches;