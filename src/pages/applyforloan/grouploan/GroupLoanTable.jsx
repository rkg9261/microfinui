import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";
import "./GroupLoan.css";

const GroupLoanTable = ({
  branchSearch,
  onAddNew,
  onView,
  onEdit,
}) => {

  const [entries, setEntries] = useState(10);
  const [openTask, setOpenTask] = useState(null);
  const [tableSearch, setTableSearch] = useState("");

  /* =====================================================
     DEMO DATA
  ===================================================== */

  const groupLoanData = [
    {
      id: 1,

      plan: "NORMAL PLAN 12 EMI 36%",
      penaltyName: "NORMAL PENALTY",
      emiType: "MONTHLY",
      planAmount: 50000,

      member: "DEEPAK",
      memberCode: "BRIAMSMEM32",

      group: "SHREEJA GROUP",
      staff: "ADMIN",

      branch: "SHREEJA GROUP",
      branchCode: "BRI",

      branchCenter: "SHREEJA CENTER",
      centerLeader: "DEEPAK",

      description: "Business Loan",

      loanType: "Single Ledger",

      purpose: "Business",

      guarantor: "AKSHAY GARG",

      agentId: "AG001",

      groupLeader: "DEEPAK",

      penaltyScheme: "NORMAL PENALTY",

      hideRateInterest: "NO",

      createdBy: "ADMIN (ADM01)",

      status: "APPROVED",
    },

    {
      id: 2,

      plan: "NORMAL PLAN 24 EMI 30%",
      penaltyName: "STANDARD PENALTY",
      emiType: "MONTHLY",
      planAmount: 100000,

      member: "AKSHAY GARG",
      memberCode: "BRI018",

      group: "SHREEJA GROUP",
      staff: "ADMIN",

      branch: "SHREEJA GROUP",
      branchCode: "BRI",

      branchCenter: "SHREEJA CENTER",
      centerLeader: "AKSHAY GARG",

      description: "Working Capital",

      loanType: "Single Ledger",

      purpose: "Business",

      guarantor: "DEEPAK",

      agentId: "AG002",

      groupLeader: "AKSHAY GARG",

      penaltyScheme: "STANDARD PENALTY",

      hideRateInterest: "NO",

      createdBy: "ADMIN (ADM01)",

      status: "PENDING",
    },


  ];


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = groupLoanData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branch
        .toLowerCase()
        .includes(branchSearch.toLowerCase());

    const searchMatch =
      tableSearch.trim() === "" ||
      item.member
        .toLowerCase()
        .includes(tableSearch.toLowerCase()) ||
      item.plan
        .toLowerCase()
        .includes(tableSearch.toLowerCase()) ||
      item.group
        .toLowerCase()
        .includes(tableSearch.toLowerCase());

    return branchMatch && searchMatch;
  });


  /* =====================================================
     TASK DROPDOWN
  ===================================================== */

  const toggleTask = (id) => {

    setOpenTask(
      openTask === id ? null : id
    );

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (loan) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${loan.member}'s group loan?`
    );

    if (confirmDelete) {
      console.log("DELETE GROUP LOAN:", loan);
    }

    setOpenTask(null);
  };


  return (
    <div className="group-loan-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="group-loan-list-header">

        <h2>
          GROUP LOAN LIST
        </h2>

        <AddButton onClick={onAddNew}>
          Add New
        </AddButton>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="group-loan-table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="group-loan-table-search">

          <input
            type="text"
            placeholder="Search"
            value={tableSearch}
            onChange={(e) =>
              setTableSearch(e.target.value)
            }
          />

          <span>
            ⌕
          </span>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table group-loan-table">

          <thead>

            <tr>

              <th>
                SR.
              </th>

              <th>
                PLAN
                <br />
                <em>PENALTY NAME</em>
              </th>

              <th>
                PLEMI
                <br />
                TYPE
              </th>

              <th>
                PLAN
                <br />
                AMT
              </th>

              <th>
                MEMBER
              </th>

              <th>
                MEM CODE
              </th>

              <th>
                GROUP
              </th>

              <th>
                STAFF
              </th>

              <th>
                BRANCH
              </th>

              <th>
                BRANCH CENTER
              </th>

              <th>
                CENTER LEADER
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((loan, index) => (

                <tr key={loan.id}>

                  {/* SR */}

                  <td>
                    {index + 1}
                  </td>


                  {/* PLAN */}

                  <td>

                    <div className="group-loan-plan-cell">

                      <strong>
                        {loan.plan}
                      </strong>

                      <em>
                        {loan.penaltyName}
                      </em>

                    </div>

                  </td>


                  {/* EMI TYPE */}

                  <td>
                    {loan.emiType}
                  </td>


                  {/* PLAN AMOUNT */}

                  <td>
                    {loan.planAmount}
                  </td>


                  {/* MEMBER */}

                  <td>

                    <div className="group-loan-member-cell">

                      <strong>
                        {loan.member}
                      </strong>

                    </div>

                  </td>


                  {/* MEMBER CODE */}

                  <td>
                    {loan.memberCode}
                  </td>


                  {/* GROUP */}

                  <td>
                    {loan.group}
                  </td>


                  {/* STAFF */}

                  <td>
                    {loan.staff}
                  </td>


                  {/* BRANCH */}

                  <td>

                    {loan.branch}

                    <br />

                    <small>
                      ({loan.branchCode})
                    </small>

                  </td>


                  {/* BRANCH CENTER */}

                  <td>
                    {loan.branchCenter}
                  </td>


                  {/* CENTER LEADER */}

                  <td>
                    {loan.centerLeader}
                  </td>


                  {/* ACTION */}

                  <td className="group-loan-action-cell">

                    <button
                      type="button"
                      className="group-loan-task-button"
                      onClick={() =>
                        toggleTask(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openTask === loan.id && (

                      <div className="group-loan-task-menu">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenTask(null);

                            onView(loan);

                          }}
                        >

                          <span>
                            👁
                          </span>

                          View

                        </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenTask(null);

                            onEdit(loan);

                          }}
                        >

                          <span>
                            ✎
                          </span>

                          Edit

                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(loan)
                          }
                        >

                          <span>
                            🗑
                          </span>

                          Delete

                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


            {/* NO DATA */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="12"
                  className="group-loan-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default GroupLoanTable;