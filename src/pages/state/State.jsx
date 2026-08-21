import React, { useState } from "react";

import "./State.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";

import StateTable from "./StateTable";
import StateForm from "./StateForm";

import {
  createState,
  updateState,
} from "../../api/stateApi";



// STATE PAGE


const State = () => {



  const [showForm, setShowForm] = useState(false);



  // EDITING STATE


  const [editingState, setEditingState] =
    useState(null);



  // SAVING


  const [saving, setSaving] =
    useState(false);



  // ADD NEW


  const handleAddNew = () => {

    console.log(
      "OPEN ADD STATE FORM"
    );

    setEditingState(null);

    setShowForm(true);
  };



  // EDIT


  const handleEdit = (row) => {

   
    console.log(
      "EDIT STATE"
    );

    console.log(
      "SELECTED STATE:",
      row
    );

  

    setEditingState(row);

    setShowForm(true);
  };



  // CLOSE FORM


  const handleCloseForm = () => {

    setShowForm(false);

    setEditingState(null);
  };



  // SAVE / UPDATE


  const handleSave = async (formData) => {

   

    console.log(
      "STATE FORM DATA:"
    );

    console.log(
      formData
    );

  


    try {

      setSaving(true);


   
      // CREATE
   

      if (!editingState) {

        const requestBody = {

          stateId: 0,

          stateCode:
            formData.stateCode,

          stateName:
            formData.stateName,

          countryId:
            Number(formData.countryId || 0),

          isActive:
            formData.status === "ACTIVE",

          createdBy: 0,

          createdDate:
            new Date().toISOString(),

          modifiedBy: 0,

          modifiedDate:
            new Date().toISOString(),

        };


       

        console.log(
          "POST STATE REQUEST BODY:"
        );

        console.log(
          requestBody
        );

       

        await createState(
          requestBody
        );


        alert(
          "State saved successfully!"
        );

      }


   
      // UPDATE
   

      else {

        const requestBody = {

          stateId:
            Number(
              editingState.stateId ??
              editingState.id
            ),

          stateCode:
            formData.stateCode,

          stateName:
            formData.stateName,

          countryId:
            Number(
              formData.countryId ??
              editingState.countryId ??
              0
            ),

          isActive:
            formData.status === "ACTIVE",

          createdBy:
            Number(
              editingState.createdBy ?? 0
            ),

          createdDate:
            editingState.createdDate ??
            new Date().toISOString(),

          modifiedBy: 0,

          modifiedDate:
            new Date().toISOString(),

        };


        const stateId =
          Number(
            editingState.stateId ??
            editingState.id
          );


        console.log(
          "================================="
        );

        console.log(
          "PUT STATE ID:",
          stateId
        );

        console.log(
          "PUT STATE REQUEST BODY:"
        );

        console.log(
          requestBody
        );

        console.log(
          "================================="
        );


        await updateState(
          stateId,
          requestBody
        );


        alert(
          "State updated successfully!"
        );

      }


   
      // CLOSE FORM
   

      setShowForm(false);

      setEditingState(null);


    } catch (error) {

      console.error(
        "STATE SAVE ERROR:",
        error
      );

      console.error(
        "API ERROR:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Unable to save state."
      );

    } finally {

      setSaving(false);

    }

  };



  return (

    <div className="state-page">


      {/* HEADER*/}
         
   

      <div className="state-header">

        <div>

          <h2>
            State Master
          </h2>

          <p>
            Manage States
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={handleAddNew}
        />

      </div>


      {/*TABLE*/}
          
   

      <StateTable
        onEdit={handleEdit}
      />


      {/*FORM */}
          
    

      {showForm && (

        <StateForm

          data={editingState}

          onSave={handleSave}

          onClose={handleCloseForm}

          loading={saving}

        />

      )}

    </div>

  );

};


export default State;