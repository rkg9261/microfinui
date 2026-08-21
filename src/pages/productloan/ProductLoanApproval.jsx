import React, { useState } from "react";
import ProductLoanApprovalTable from "./ProductLoanApprovalTable";
import "./ProductLoanApproval.css";

const ProductLoanApproval = () => {
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");

  const [search, setSearch] = useState("");

  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // ---------------------------------------------------------
  // SAMPLE DATA
  // ---------------------------------------------------------

  const [productLoans] = useState([
    {
      id: 1,
      loanId: "PL-1001",
      memName: "SANGITA BALU KHARE",
      mobile: "9529386632",
      branch: "KOLKATA",
      branchCenter: "DALHOUSIE",
      groupName: "SHREEJA GROUP",
      product: "MOBILE PHONE",
      disbursementDate: "19-08-2026",
      emiStartDate: "19-09-2026",
      emiLastDate: "19-08-2027",
      insurer: "ABC INSURANCE",
      totalPrice: "₹25,000",
      downPayment: "₹5,000",
      loanAmount: "₹20,000",
      status: "APPROVED",
    },
    {
      id: 2,
      loanId: "PL-1002",
      memName: "PRIYA DEVI",
      mobile: "9876543210",
      branch: "KOLKATA",
      branchCenter: "HOWRAH",
      groupName: "MAA GROUP",
      product: "SEWING MACHINE",
      disbursementDate: "18-08-2026",
      emiStartDate: "18-09-2026",
      emiLastDate: "18-08-2027",
      insurer: "XYZ INSURANCE",
      totalPrice: "₹18,000",
      downPayment: "₹3,000",
      loanAmount: "₹15,000",
      status: "APPROVED",
    },
    {
      id: 3,
      loanId: "PL-1003",
      memName: "RAMESH KUMAR",
      mobile: "9123456789",
      branch: "DELHI",
      branchCenter: "ROHINI",
      groupName: "JAI GROUP",
      product: "LAPTOP",
      disbursementDate: "17-08-2026",
      emiStartDate: "17-09-2026",
      emiLastDate: "17-08-2027",
      insurer: "ABC INSURANCE",
      totalPrice: "₹45,000",
      downPayment: "₹10,000",
      loanAmount: "₹35,000",
      status: "APPROVED",
    },
    {
      id: 4,
      loanId: "PL-1004",
      memName: "NEHA SHARMA",
      mobile: "9988776655",
      branch: "MUMBAI",
      branchCenter: "ANDHERI",
      groupName: "SAI GROUP",
      product: "REFRIGERATOR",
      disbursementDate: "16-08-2026",
      emiStartDate: "16-09-2026",
      emiLastDate: "16-08-2027",
      insurer: "XYZ INSURANCE",
      totalPrice: "₹32,000",
      downPayment: "₹7,000",
      loanAmount: "₹25,000",
      status: "APPROVED",
    },
    {
      id: 5,
      loanId: "PL-1005",
      memName: "ANITA DAS",
      mobile: "9001122334",
      branch: "KOLKATA",
      branchCenter: "SALT LAKE",
      groupName: "LAXMI GROUP",
      product: "TELEVISION",
      disbursementDate: "15-08-2026",
      emiStartDate: "15-09-2026",
      emiLastDate: "15-08-2027",
      insurer: "ABC INSURANCE",
      totalPrice: "₹22,000",
      downPayment: "₹4,000",
      loanAmount: "₹18,000",
      status: "APPROVED",
    },
  ]);

  // ---------------------------------------------------------
  // FILTER
  // ---------------------------------------------------------

  const filteredLoans = productLoans.filter((loan) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      loan.loanId.toLowerCase().includes(searchValue) ||
      loan.memName.toLowerCase().includes(searchValue) ||
      loan.mobile.includes(searchValue) ||
      loan.product.toLowerCase().includes(searchValue);

    const matchesBranch =
      !branch || loan.branch === branch;

    const matchesDate =
      !date || loan.disbursementDate === date;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesDate
    );
  });

  // ---------------------------------------------------------
  // VIEW
  // ---------------------------------------------------------

  const handleView = (loan) => {
    setViewData(loan);
    setShowViewModal(true);
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product loan approval?"
    );

    if (!confirmDelete) return;

    // Demo only.
    // Replace with API delete call later.
    alert("Product loan approval deleted successfully.");
  };

  // ---------------------------------------------------------
  // SUBMIT
  // ---------------------------------------------------------

  const handleGetRecord = (e) => {
    e.preventDefault();

    console.log({
      branch,
      date,
    });
  };

  return (
    <div className="product-loan-approval-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="product-loan-approval-page-title">
        APPROVEPRODUCTLOAN
      </div>


      {/* =====================================================
          SEARCH CARD
      ===================================================== */}

      <div className="product-loan-approval-search-card">

        <div className="product-loan-approval-search-title">
          SEARCH BY
        </div>

        <form
          onSubmit={handleGetRecord}
          className="product-loan-approval-search-grid"
        >

          {/* BRANCH */}

          <div className="product-loan-approval-field">

            <label>
              BRANCH
            </label>

            <select
              value={branch}
              onChange={(e) =>
                setBranch(e.target.value)
              }
            >

              <option value="">
                Select Branch
              </option>

              <option value="KOLKATA">
                KOLKATA
              </option>

              <option value="DELHI">
                DELHI
              </option>

              <option value="MUMBAI">
                MUMBAI
              </option>

            </select>

          </div>


          {/* DATE */}

          <div className="product-loan-approval-field">

            <label>
              DATE
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>


          {/* BUTTON */}

          <div className="product-loan-approval-button-wrapper">

            <button
              type="submit"
              className="product-loan-approval-get-record"
            >
              GET RECORD
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <ProductLoanApprovalTable
        data={filteredLoans}
        search={search}
        setSearch={setSearch}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {showViewModal && viewData && (

        <div
          className="product-loan-approval-modal-overlay"
          onClick={() =>
            setShowViewModal(false)
          }
        >

          <div
            className="product-loan-approval-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="product-loan-approval-modal-header">

              <h3>
                PRODUCT LOAN DETAILS
              </h3>

              <button
                className="product-loan-approval-modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="product-loan-approval-details-grid">

              <Detail
                label="LOAN ID"
                value={viewData.loanId}
              />

              <Detail
                label="MEMBER NAME"
                value={viewData.memName}
              />

              <Detail
                label="MOBILE"
                value={viewData.mobile}
              />

              <Detail
                label="BRANCH"
                value={viewData.branch}
              />

              <Detail
                label="BRANCH CENTER"
                value={viewData.branchCenter}
              />

              <Detail
                label="GROUP NAME"
                value={viewData.groupName}
              />

              <Detail
                label="PRODUCT"
                value={viewData.product}
              />

              <Detail
                label="DISBURSEMENT DATE"
                value={viewData.disbursementDate}
              />

              <Detail
                label="EMI START DATE"
                value={viewData.emiStartDate}
              />

              <Detail
                label="EMI LAST DATE"
                value={viewData.emiLastDate}
              />

              <Detail
                label="INSURER"
                value={viewData.insurer}
              />

              <Detail
                label="TOTAL PRICE"
                value={viewData.totalPrice}
              />

              <Detail
                label="DOWN PAYMENT"
                value={viewData.downPayment}
              />

              <Detail
                label="LOAN AMOUNT"
                value={viewData.loanAmount}
              />

              <Detail
                label="STATUS"
                value={viewData.status}
              />

            </div>


            {/* MODAL FOOTER */}

            <div className="product-loan-approval-modal-footer">

              <button
                className="product-loan-approval-close-button"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                CLOSE
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// =========================================================
// DETAIL COMPONENT
// =========================================================

const Detail = ({ label, value }) => {
  return (
    <div className="product-loan-approval-detail">

      <span>
        {label}
      </span>

      <strong>
        {value || "-"}
      </strong>

    </div>
  );
};


export default ProductLoanApproval;