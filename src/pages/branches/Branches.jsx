import React, {
  useState,
} from "react";

import "./Branches.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import BranchesTable from "./BranchesTable";
import BranchesForm from "./BranchesForm";

import {
  AddButton,
} from "../../components/buttons";

import {
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../api/branchApi";


const Branches = () => {

  
  // STATES
  

  const [search, setSearch] = useState("");
   

  const [openForm, setOpenForm] =  useState(false);
  

  const [editingBranch, setEditingBranch] =  useState(null);
  

  // This value tells Table to call GET again
  const [refreshTable, setRefreshTable] = useState(0);

  
  // REFRESH TABLE
  

  const refreshBranchTable = () => {

    setRefreshTable(
      (previous) => previous + 1
    );

  };


  
  // SAVE BRANCH
  // POST / PUT
  

const saveBranch = async (formData) => {

  try {

   
    // UPDATE
   

    if (editingBranch) {

      const branchId =
        editingBranch.branchId ||
        editingBranch.id;

      const updateData = {

        ...formData,

        branchId: Number(branchId),

      };

      console.log(
        "================================="
      );

      console.log(
        "PUT URL:",
        `/api/Branches/${branchId}`
      );

      console.log(
        "PUT REQUEST BODY:",
        updateData
      );

      console.log(
        "================================="
      );


      const response =
        await updateBranch(
          branchId,
          updateData
        );


      console.log(
        "PUT SUCCESS:",
        response
      );

    }

   
    // CREATE
   

    else {

      console.log(
        "POST REQUEST BODY:",
        formData
      );


      const response =
        await createBranch(
          formData
        );


      console.log(
        "POST SUCCESS:",
        response
      );

    }


   
    // REFRESH TABLE
   

    refreshBranchTable();

    return true;


  } catch (error) {

    console.error(
      "SAVE BRANCH ERROR:",
      error
    );


    if (error.response) {

      console.error(
        "Status:",
        error.response.status
      );

      console.error(
        "API Error:",
        error.response.data
      );

    }

    throw error;

  }

};


  
  // EDIT
  

  const handleEdit = (branch) => {

    console.log(
      "EDIT BRANCH:",
      branch
    );

    setEditingBranch(branch);

    setOpenForm(true);

  };


  
  // DELETE
  

  const handleDelete = async (branch) => {

    const branchId =
      branch.branchId ||
      branch.id;

    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete "${branch.branchName}"?`
      );

    if (!confirmDelete) {
      return;
    }


    try {

      console.log(
        "DELETE BRANCH ID:",
        branchId
      );

      const response =
        await deleteBranch(
          branchId
        );

      console.log(
        "DELETE SUCCESS:",
        response
      );


    
      // GET API WILL RUN AGAIN IN TABLE
   

      refreshBranchTable();


    } catch (error) {

      console.error(
        "DELETE BRANCH ERROR:",
        error
      );

      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "API Error:",
          error.response.data
        );

      }

    }

  };


  
  // RENDER
  

  return (

    <div className="branches-page">


      {/*  HEADER*/}
         
       

      <div className="branches-header">

        <div>

          <h2>
            Branch List
          </h2>

          <p>
            Manage All Branches
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={() => {

            setEditingBranch(null);

            setOpenForm(true);

          }}
        />

      </div>


      {/* 
          SEARCH
       */}

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


      {/* TABLE*/}
          

      <BranchesTable

        search={search}

        refreshTable={refreshTable}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />


      {/*FORM */}
          
       

      {openForm && (

        <BranchesForm

          onClose={() => {

            setOpenForm(false);

            setEditingBranch(null);

          }}

          onSave={saveBranch}

          editingBranch={editingBranch}

        />

      )}

    </div>

  );

};

export default Branches;