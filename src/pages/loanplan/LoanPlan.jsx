import React, { useState } from "react";

import "./LoanPlan.css";
import "../../components/common/Search.css";

import LoanPlanForm from "./LoanPlanForm";
import LoanPlanTable from "./LoanPlanTable";

import { AddButton } from "../../components/buttons";

import { deleteLoanPlan } from "../../api/loanPlanApi";



// LOAN PLAN PAGE


const LoanPlan = () => {


  // STATES


  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);

  // Selected record for edit
  const [editingLoanPlan, setEditingLoanPlan] = useState(null);

  // Used to tell table to reload API data
  const [refreshTable, setRefreshTable] = useState(0);



  // OPEN ADD FORM


  const openAddForm = () => {

    console.log(
      "Opening Add Loan Plan Form"
    );

    // Clear previous edit data
    setEditingLoanPlan(null);

    // Open form
    setShowForm(true);

  };



  // OPEN EDIT FORM


  const handleEdit = (item) => {

    console.log(
      "================================="
    );

    console.log(
      "EDIT LOAN PLAN"
    );

    console.log(
      "Selected Item:",
      item
    );

    console.log(
      "================================="
    );


    // Store selected API record
    setEditingLoanPlan(item);

    // Open form
    setShowForm(true);

  };



  // CLOSE FORM


  const closeForm = () => {

    setShowForm(false);

    setEditingLoanPlan(null);

  };



  // AFTER SAVE SUCCESS


  const handleSaveSuccess = async (response) => {

    console.log(
      "================================="
    );

    console.log(
      "SAVE SUCCESS"
    );

    console.log(
      "API RESPONSE:",
      response
    );

    console.log(
      "================================="
    );


    // Close popup
    setShowForm(false);

    // Clear edit data
    setEditingLoanPlan(null);

    // Tell table to call GET API again
    setRefreshTable(
      (prev) => prev + 1
    );

  };



  // DELETE LOAN PLAN


  const handleDelete = async (id) => {

    console.log(
      "Delete Loan Plan ID:",
      id
    );


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this loan plan?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      setError("");


      console.log(
        "Deleting Loan Plan..."
      );


      const response =
        await deleteLoanPlan(id);


      console.log(
        "DELETE API RESPONSE:",
        response
      );


      alert(
        "Loan Plan deleted successfully."
      );


      // Tell table to call GET API again
      setRefreshTable(
        (prev) => prev + 1
      );


    } catch (error) {

      console.error(
        "================================="
      );

      console.error(
        "DELETE LOAN PLAN ERROR"
      );

      console.error(
        "================================="
      );

      console.error(
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );


      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to delete loan plan.";


      setError(message);

      alert(message);

    }

  };



  // RENDER


  return (

    <div className="loan-plan-page">


      {/* HEADER  */}
    

      <div className="loan-plan-header">

        <div>

          <h2>
            Loan Plan
          </h2>

          <p>
            Manage Loan Plans
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={openAddForm}
        />

      </div>


      {/*SEARCH*/}
      

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Loan Plan..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>


      {/*ERROR*/}
      

      {error && (

        <div
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            border: "1px solid #fecdca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >

          {error}

        </div>

      )}


      {/*  TABLE */}
          
         
     

      <LoanPlanTable

        onEdit={handleEdit}

        onDelete={handleDelete}

        searchTerm={searchTerm}

        refreshTable={refreshTable}

      />


      {/*ADD / EDIT FORM */}
     

      {showForm && (

        <LoanPlanForm

          onClose={closeForm}

          onSaveSuccess={handleSaveSuccess}

          initialData={editingLoanPlan}

        />

      )}

    </div>

  );

};


export default LoanPlan;