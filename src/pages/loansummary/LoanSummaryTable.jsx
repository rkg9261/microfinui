import React, { useState } from "react";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import "../../components/common/Table.css";
import "./LoanSummary.css";

const LoanSummaryTable = ({
  onView,
}) => {

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [openAction, setOpenAction] = useState(null);


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const loanSummaryData = [
    {
      id: 1,

      loanId: "10201242",

      memberName: "DEEPAK",
      memberCode: "BRIAMSMEM32",

      mobile: "9876543210",

      branchCenter: "SHREEJA CENTER",

      branch: "SHREEJA GROUP",
      branchCode: "BRI",

      disbursementDate: "2026-03-27",

      emiStartDate: "2025-12-27",

      emiLastDate: "2026-11-27",

      loanCloseDate: "2026-11-27",

      emi: 9,

      planAmount: 50000,

      disbAmount: 50000,

      amount: 50000,

      recoveryAmount: 40500,

      penalty: 0,

      dueAmount: 9676,

      status: "Running",

      staff: "ADMIN",

      planName: "NORMAL PLAN 12 EMI 36%",

      planType: "Individual",

      recoveryType: "Monthly",

      principalAmount: 10000,

      interestAmount: 2901,

      totalAmount: 12901,
    },

    {
      id: 2,

      loanId: "99044BRI",

      memberName: "AKSHAY GARG",
      memberCode: "BRI018",

      mobile: "9876501234",

      branchCenter: "SHREEJA CENTER",

      branch: "SHREEJA GROUP",
      branchCode: "BRI",

      disbursementDate: "2026-03-25",

      emiStartDate: "2026-04-01",

      emiLastDate: "2027-03-01",

      loanCloseDate: "",

      emi: 12,

      planAmount: 100000,

      disbAmount: 100000,

      amount: 100000,

      recoveryAmount: 25000,

      penalty: 0,

      dueAmount: 75000,

      status: "Running",

      staff: "ADMIN",

      planName: "NORMAL PLAN 24 EMI 30%",

      planType: "Group",

      recoveryType: "Monthly",

      principalAmount: 8000,

      interestAmount: 2000,

      totalAmount: 10000,
    },

    {
      id: 3,

      loanId: "89569862BRI",

      memberName: "KOYEL SARKAR",
      memberCode: "BRIZMM011",

      mobile: "9876123456",

      branchCenter: "CENTER AM5",

      branch: "BRANCH M FINANCE",
      branchCode: "AM5",

      disbursementDate: "2026-02-20",

      emiStartDate: "2026-03-01",

      emiLastDate: "2027-02-01",

      loanCloseDate: "",

      emi: 10,

      planAmount: 75000,

      disbAmount: 75000,

      amount: 75000,

      recoveryAmount: 12500,

      penalty: 500,

      dueAmount: 62500,

      status: "Pending",

      staff: "STAFF01",

      planName: "MICRO LOAN PLAN",

      planType: "Individual",

      recoveryType: "Weekly",

      principalAmount: 12000,

      interestAmount: 2500,

      totalAmount: 14500,
    },
  ];


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredData = loanSummaryData.filter((loan) => {

    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      loan.loanId.toLowerCase().includes(value) ||
      loan.memberName.toLowerCase().includes(value) ||
      loan.memberCode.toLowerCase().includes(value) ||
      loan.branch.toLowerCase().includes(value) ||
      loan.planName.toLowerCase().includes(value)
    );
  });


  /* =====================================================
     ACTION
  ===================================================== */

  const toggleAction = (id) => {

    setOpenAction(
      openAction === id ? null : id
    );
  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {

    setOpenAction(null);

    onView(loan);
  };


  return (
    <div className="loan-summary-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="loan-summary-list-header">

        <h2>
          LOAN SUMMARY
        </h2>

        <button
          type="button"
          className="loan-summary-download-btn"
        >
          ⇩ DOWNLOAD EXCEL
        </button>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="loan-summary-toolbar">

        <div className="loan-summary-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

          <span>
            OUTSTANDING AMOUNT : 0
          </span>

        </div>


        <div className="loan-summary-table-search">

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

        <table className="common-table loan-summary-table">

          <thead>

            <tr>

              <th>
                SR.
                <br />
                NO.
              </th>

              <th>
                ACTION
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                MEM
                <br />
                NAME
              </th>

              <th>
                MOBILE
              </th>

              <th>
                BRANCH
                <br />
                CENTER
              </th>

              <th>
                BRANCH
              </th>

              <th>
                DISBURSEMENT
                <br />
                DATE
              </th>

              <th>
                EMI
                <br />
                START DATE
              </th>

              <th>
                EMI
                <br />
                LAST DATE
              </th>

              <th>
                LOAN
                <br />
                CLOSE DATE
              </th>

              <th>
                PLAN
                <br />
                AMT
              </th>

              <th>
                DISB
                <br />
                AMT
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                REC.
                <br />
                AMOUNT
              </th>

              <th>
                PENALTY
              </th>

              <th>
                DUE.
                <br />
                AMOUNT
              </th>

              <th>
                STATUS
              </th>

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


                  {/* ACTION */}

                  <td className="loan-summary-action-cell">

                    <button
                      type="button"
                      className="loan-summary-task-btn"
                      onClick={() =>
                        toggleAction(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openAction === loan.id && (

                      <div className="loan-summary-action-menu">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(loan)
                          }
                        >
                          👁 View
                        </button>

                      </div>

                    )}

                  </td>


                  <td>
                    {loan.loanId}
                  </td>


                  <td>

                    <div className="loan-summary-member">

                      <strong>
                        {loan.memberName}
                      </strong>

                      <small>
                        ({loan.memberCode})
                      </small>

                    </div>

                  </td>


                  <td>
                    {loan.mobile}
                  </td>


                  <td>
                    {loan.branchCenter}
                  </td>


                  <td>

                    {loan.branch}

                    <br />

                    <small>
                      ({loan.branchCode})
                    </small>

                  </td>


                  <td>
                    {loan.disbursementDate}
                  </td>


                  <td>
                    {loan.emiStartDate}
                  </td>


                  <td>
                    {loan.emiLastDate}
                  </td>


                  <td>
                    {loan.loanCloseDate || "-"}
                  </td>


                  <td>
                    {loan.planAmount}
                  </td>


                  <td>
                    {loan.disbAmount}
                  </td>


                  <td>
                    {loan.amount}
                  </td>


                  <td>
                    {loan.recoveryAmount}
                  </td>


                  <td>
                    {loan.penalty}
                  </td>


                  <td>
                    {loan.dueAmount}
                  </td>


                  <td>

                    <span
                      className={
                        loan.status === "Running"
                          ? "loan-summary-status running"
                          : loan.status === "Closed"
                          ? "loan-summary-status closed"
                          : "loan-summary-status pending"
                      }
                    >
                      {loan.status}
                    </span>

                  </td>

                </tr>

              ))}


            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="18"
                  className="loan-summary-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="loan-summary-table-footer">

        SHOWING 1 TO {filteredData.length} OF{" "}
        {filteredData.length} ENTRIES

      </div>

    </div>
  );
};

export default LoanSummaryTable;