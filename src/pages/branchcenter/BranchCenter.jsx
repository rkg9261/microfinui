import React, { useState } from "react";

import "./BranchCenter.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import BranchCenterTable from "./BranchCenterTable";
import BranchCenterForm from "./BranchCenterForm";

import {
  AddButton,
} from "../../components/buttons";

const BranchCenter = () => {

  const [branch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const [branchCenters, setBranchCenters] = useState([

    {
      id: 1,
      code: "BC01015",
      name: "AMAN IN",
      branch: "LASKARHAT",
      description: "",
      remark: "",
      status: "ACTIVE",
    },

    {
      id: 2,
      code: "BC01014",
      name: "AMAN",
      branch: "LASKARHAT",
      description: "",
      remark: "",
      status: "ACTIVE",
    },

  ]);

  const filteredData = branchCenters.filter((item) => {

    return (

      (branch === "" || item.branch === branch) &&

      (
        item.code.toLowerCase().includes(search.toLowerCase()) ||

        item.name.toLowerCase().includes(search.toLowerCase()) ||

        item.branch.toLowerCase().includes(search.toLowerCase())
      )

    );

  });

  const handleSave = (data) => {

    setBranchCenters((prev) => [

      ...prev,

      {
        id: Date.now(),
        code: `BC${Math.floor(Math.random() * 90000 + 10000)}`,
        ...data,
      },

    ]);

    setOpenForm(false);

  };

  return (

    <div className="branch-center-page">

      {/* ================= FILTER ================= */}

      <div className="branch-center-filter-card">

        <h3>FILTER BY</h3>

        <div className="branch-center-filter-grid">

          <div>

            <label>BRANCH</label>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >

              <option value="">
                Select Branch
              </option>

              <option value="LASKARHAT">
                LASKARHAT
              </option>

              <option value="JAGATPURA">
                JAGATPURA
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ================= HEADER ================= */}

      <div className="branch-center-header">
        <div>
        <h2>
          BRANCH CENTER LIST
        </h2><p>Manage Branch Center</p></div>

        <AddButton
          text="Add New"
          onClick={() => setOpenForm(true)}
        />

      </div>

      {/* ================= SEARCH ================= */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Branch Center..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* ================= TABLE ================= */}

      <BranchCenterTable
        data={filteredData}
      />

      {/* ================= POPUP ================= */}

      {openForm && (

        <BranchCenterForm
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
        />

      )}

    </div>

  );

};

export default BranchCenter;