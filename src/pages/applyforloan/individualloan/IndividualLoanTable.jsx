import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";
import "./IndividualLoan.css";

const IndividualLoanTable = ({
  branchSearch,
  onAddNew,
  onView,
  onEdit,
}) => {

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [openTask, setOpenTask] = useState(null);


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const individualLoanData = [

    {
      id: 1,

      planName: "NORMAL PLAN 12 EMI 36%",
      planType: "NORMAL",
      interestType: "REDUCED",
      recoveryType: "MONTHLY",
      numberOfPayments: "12",

      penaltyName: "NORMAL",

      emi: "9",

      loanAmount: "50000",
      disAmount: "0",
      fcPfIf: "2000",

      member: "DEEPAK",
      memberCode: "BRIAMSMEM32",

      staff: "ADMIN",

      branchName: "SHREEJA GROUP",
      branchCode: "BRI",

      branchCenter: "SHREEJA CENTER",

      payMode: "CASH",

      description: "Personal Loan",

      date: "2026-03-27",

      purpose: "PERSONAL",

      loanType: "single Ledger",

      penaltyScheme: "NORMAL",

      guarantor: "AKSHAY GARG",

      hideRateInterest: "NO",

      newLoanAmount: "50000",

      createAt: "2026-03-27 23:46:49",

      loanApplicationNo: "10201242",

      dueNoOfEmi: "9",

      firstEmiDate: "2025-12-27",

      lastEmiDate: "2026-11-27",

      loanTotalAmount: "12901",

      loanPrincipalAmount: "10000",

      loanInterestAmount: "2901",

      loanDueAmount: "9676",

      loanDuePrincipalAmount: "7669",

      loanDueInterestAmount: "2007",

      loanForecloseCharges: "0",

      loanInterestWriteOffAmount: "2007",

      status: "PENDING",
    },


    {
      id: 2,

      planName: "NORMAL PLAN 12 EMI 36%",
      planType: "NORMAL",
      interestType: "REDUCED",
      recoveryType: "MONTHLY",
      numberOfPayments: "12",

      penaltyName: "NORMAL",

      emi: "12",

      loanAmount: "100000",
      disAmount: "0",
      fcPfIf: "2500",

      member: "AKSHAY GARG",
      memberCode: "BRI018",

      staff: "ADMIN",

      branchName: "SHREEJA GROUP",
      branchCode: "BRI",

      branchCenter: "SHREEJA CENTER",

      payMode: "BANK",

      description: "Business Loan",

      date: "2026-03-28",

      purpose: "BUSINESS",

      loanType: "single Ledger",

      penaltyScheme: "NORMAL",

      guarantor: "DEEPAK",

      hideRateInterest: "NO",

      newLoanAmount: "100000",

      createAt: "2026-03-28 10:30:00",

      loanApplicationNo: "99044BRI",

      dueNoOfEmi: "10",

      firstEmiDate: "2025-12-28",

      lastEmiDate: "2026-11-28",

      loanTotalAmount: "35000",

      loanPrincipalAmount: "30000",

      loanInterestAmount: "5000",

      loanDueAmount: "10000",

      loanDuePrincipalAmount: "8500",

      loanDueInterestAmount: "1500",

      loanForecloseCharges: "0",

      loanInterestWriteOffAmount: "0",

      status: "APPROVED",
    },

  ];


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = individualLoanData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branchName
        .toLowerCase()
        .includes(branchSearch.toLowerCase());


    const searchMatch =
      search.trim() === "" ||
      item.member
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.planName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.branchName
        .toLowerCase()
        .includes(search.toLowerCase());


    return branchMatch && searchMatch;
  });


  /* =====================================================
     TASK
  ===================================================== */

  const toggleTask = (id) => {

    setOpenTask(
      openTask === id ? null : id
    );

  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {

    setOpenTask(null);

    if (onView) {
      onView(loan);
    }

  };


  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (loan) => {

    setOpenTask(null);

    if (onEdit) {
      onEdit(loan);
    }

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (loan) => {

    console.log("DELETE:", loan);

    setOpenTask(null);

  };


  return (

    <div className="individual-loan-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="individual-loan-list-header">

        <h2>
          INDIVIDUAL LOAN LIST
        </h2>

        <AddButton onClick={onAddNew}>
          Add New
        </AddButton>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="individual-loan-table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="individual-loan-search-box">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
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

        <table className="common-table individual-loan-table">

          <thead>

            <tr>

              <th>SR.</th>

              <th>
                PLAN
                <br />
                <em>PENALTY NAME</em>
              </th>

              <th>EMI</th>

              <th>LOAN AMT</th>

              <th>DIS AMT</th>

              <th>FC + PF + IF</th>

              <th>MEMBER</th>

              <th>STAFF</th>

              <th>BRANCH NAME</th>

              <th>BRANCH CENTER</th>

              <th>PAY MODE</th>

              <th>DESC</th>

              <th>DATE</th>

              <th>ACTION</th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((loan, index) => (

                <tr key={loan.id}>

                  <td>
                    {index + 1}
                  </td>


                  <td>

                    <div className="individual-loan-plan-cell">

                      <strong>
                        {loan.planName}
                      </strong>

                      <em>
                        {loan.penaltyName}
                      </em>

                    </div>

                  </td>


                  <td>
                    {loan.emi}
                  </td>


                  <td>
                    {loan.loanAmount}
                  </td>


                  <td>
                    {loan.disAmount}
                  </td>


                  <td>
                    {loan.fcPfIf}
                  </td>


                  <td>

                    <div className="individual-loan-member-cell">

                      <strong>
                        {loan.member}
                      </strong>

                      <small>
                        ({loan.memberCode})
                      </small>

                    </div>

                  </td>


                  <td>
                    {loan.staff}
                  </td>


                  <td>

                    {loan.branchName}

                    <br />

                    ({loan.branchCode})

                  </td>


                  <td>
                    {loan.branchCenter}
                  </td>


                  <td>
                    {loan.payMode}
                  </td>


                  <td>
                    {loan.description}
                  </td>


                  <td>
                    {loan.date}
                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td className="individual-loan-action-cell">

                    <button
                      type="button"
                      className="individual-loan-task-button"
                      onClick={() =>
                        toggleTask(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openTask === loan.id && (

                      <div className="individual-loan-task-menu">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            handleView(loan)
                          }
                        >
                          <span>👁</span>
                          VIEW
                        </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(loan)
                          }
                        >
                          <span>✎</span>
                          EDIT
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(loan)
                          }
                        >
                          <span>🗑</span>
                          DELETE
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="14"
                  className="individual-loan-no-data"
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

export default IndividualLoanTable;