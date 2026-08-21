import React, { useEffect, useState } from "react";

import "./PenaltyScheme.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import PenaltySchemeTable from "./PenaltySchemeTable";
import PenaltySchemeForm from "./PenaltySchemeForm";

import { AddButton } from "../../components/buttons";

import {
  getPenaltySchemes,
  createPenaltyScheme,
  updatePenaltyScheme,
} from "../../api/penaltySchemeApi";


const PenaltyScheme = () => {

 
  // STATES
 

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [penaltySchemes, setPenaltySchemes] = useState([]);

  // Selected record for Edit
  const [editData, setEditData] = useState(null);


 
  // GET ALL PENALTY SCHEMES
 

  const loadPenaltySchemes = async () => {

    try {

      const response = await getPenaltySchemes();

      console.log(
        "Penalty Scheme List:",
        response
      );

   
      setPenaltySchemes(
        Array.isArray(response)
          ? response
          : response?.data || []
      );

    } catch (error) {

      console.error(
        "Get penalty schemes error:",
        error
      );

      setPenaltySchemes([]);

    }

  };


 
  // LOAD DATA WHEN PAGE OPENS
 

  useEffect(() => {

    loadPenaltySchemes();

  }, []);


 
  // SEARCH
 

  const filteredData = penaltySchemes.filter((item) =>

    item.schemeName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );


 
  // ADD BUTTON
 

  const handleAdd = () => {

    // Clear previous edit data
    setEditData(null);

    // Open empty form
    setOpenForm(true);

  };


 
  // EDIT BUTTON
 

  const handleEdit = (data) => {

    console.log(
      "Selected Edit Data:",
      data
    );


    setEditData(data);

  
    setOpenForm(true);

  };


 
  // SAVE

  const savePenaltyScheme = async (formData) => {

    try {

      
      // EDIT
      

      if (editData) {

        console.log(
          "Updating Penalty Scheme:",
          editData.id,
          formData
        );

        await updatePenaltyScheme(
          editData.id,
          formData
        );

        alert(
          "Penalty Scheme updated successfully"
        );

      }

      
      // ADD
      

      else {

        console.log(
          "Creating Penalty Scheme:",
          formData
        );

        await createPenaltyScheme(
          formData
        );

        alert(
          "Penalty Scheme created successfully"
        );

      }


      
      // Reload table from database
      

      await loadPenaltySchemes();


      
      // Close form
      

      setOpenForm(false);

      setEditData(null);


    } catch (error) {

      console.error(
        "Save penalty scheme error:",
        error
      );

      alert(
        "Unable to save penalty scheme"
      );

    }

  };


 
  // DELETE SUCCESS
 

  const handleDeleteSuccess = async () => {

    // Reload data from database
    await loadPenaltySchemes();

  };


 
  // CLOSE FORM
 

  const handleCloseForm = () => {

    setOpenForm(false);

    setEditData(null);

  };


 
  // JSX
 

  return (

    <div className="penalty-page">


      {/*  HEADER*/}
         
       

      <div className="penalty-header">

        <div>

          <h2>
            Penalty Scheme List
          </h2>

          <p>
            Manage Penalty Schemes
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={handleAdd}
        />

      </div>


      {/*   SEARCH */}
        
      

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Penalty Scheme..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/*  TABLE */}
         
      

      <PenaltySchemeTable
        data={filteredData}
        onEdit={handleEdit}
        onDeleteSuccess={handleDeleteSuccess}
      />


      {/*  FORM*/}
         
       

      {openForm && (

        <PenaltySchemeForm

          onClose={handleCloseForm}

          onSave={savePenaltyScheme}

          editData={editData}

        />

      )}

    </div>

  );

};


export default PenaltyScheme;