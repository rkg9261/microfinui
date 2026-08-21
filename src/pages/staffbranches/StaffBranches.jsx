import React, { useState } from "react";

import "./StaffBranches.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import StaffBranchesTable from "./StaffBranchesTable";
import StaffBranchesForm from "./StaffBranchesForm";

import {
  AddButton,
} from "../../components/buttons";

const StaffBranches = () => {

  const [search, setSearch] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("");

  const [selectedStaff, setSelectedStaff] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [staffBranches, setStaffBranches] = useState([

    {
      id: 1,
      employeeCode: "EMP01011",
      employeeName: "SHAIBAL GHOSE",
      branch: "LASKARHAT",
      remark: "K",
      status: "ACTIVE",
    },

    {
      id: 2,
      employeeCode: "EMP01013",
      employeeName: "GOURAV DEY",
      branch: "JAGATPURA",
      remark: "AGENT",
      status: "ACTIVE",
    },

  ]);

  const filteredData = staffBranches.filter((item) => {

    return (

      item.employeeName
        .toLowerCase()
        .includes(search.toLowerCase()) &&

      (selectedBranch === "" ||
        item.branch === selectedBranch) &&

      (selectedStaff === "" ||
        item.employeeName === selectedStaff)

    );

  });

  const saveStaffBranch = (newData) => {

    setStaffBranches((prev) => [

      ...prev,

      {
        id: Date.now(),
        ...newData,
      },

    ]);

    setOpenForm(false);

  };

  return (

    <div className="staff-branches-page">

      {/* ==========================
              FILTER
      ========================== */}

      <div className="staff-filter-card">

        <h3>Filter By</h3>

        <div className="staff-filter-grid">

          <div>

            <label>Branch</label>

            <select
              value={selectedBranch}
              onChange={(e) =>
                setSelectedBranch(e.target.value)
              }
            >

              <option value="">
                All Branches
              </option>

              <option value="LASKARHAT">
                LASKARHAT
              </option>

              <option value="JAGATPURA">
                JAGATPURA
              </option>

            </select>

          </div>

          <div>

            <label>Staff</label>

            <select
              value={selectedStaff}
              onChange={(e) =>
                setSelectedStaff(e.target.value)
              }
            >

              <option value="">
                All Staff
              </option>

              <option value="SHAIBAL GHOSE">
                SHAIBAL GHOSE
              </option>

              <option value="GOURAV DEY">
                GOURAV DEY
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ==========================
              HEADER
      ========================== */}

      <div className="staff-header">

        <div>

          <h2>
            Staff Branches List
          </h2>

          <p>
            Manage Staff Branches
          </p>

        </div>

        <AddButton
          text="Add New"
          onClick={() =>
            setOpenForm(true)
          }
        />

      </div>

      {/* ==========================
              SEARCH
      ========================== */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Staff..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* ==========================
              TABLE
      ========================== */}

      <StaffBranchesTable
        data={filteredData}
      />

      {/* ==========================
              POPUP
      ========================== */}

      {openForm && (

        <StaffBranchesForm
          onClose={() =>
            setOpenForm(false)
          }
          onSave={saveStaffBranch}
        />

      )}

    </div>

  );

};

export default StaffBranches;