import React, { useState } from "react";

import "./Designation.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";

import DesignationTable from "./DesignationTable";
import DesignationForm from "./DesignationForm";

const Designation = () => {

  const [showForm, setShowForm] = useState(false);

  const [editingDesignation, setEditingDesignation] = useState(null);

  const [designationList, setDesignationList] = useState([

    {
      id: 1,
      name: "AABHIDAS",
      status: "ACTIVE",
    },

    {
      id: 2,
      name: "SAHAB ALI",
      status: "ACTIVE",
    },


  ]);

  const handleSave = (formData) => {

    if (editingDesignation) {

      setDesignationList((prev) =>
        prev.map((item) =>
          item.id === editingDesignation.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

    } else {

      setDesignationList((prev) => [

        ...prev,

        {
          id: Date.now(),
          ...formData,
        },

      ]);

    }

    setEditingDesignation(null);

    setShowForm(false);

  };

  const handleEdit = (row) => {

    setEditingDesignation(row);

    setShowForm(true);

  };

  const handleDelete = (id) => {

    if (window.confirm("Delete this designation?")) {

      setDesignationList((prev) =>
        prev.filter((item) => item.id !== id)
      );

    }

  };

  return (

    <div className="designation-page">

      <div className="designation-header">
       <div>
        <h2> Designation Master</h2>
        <p>Manage Designation </p>

          </div>

        <AddButton  text="Add New"
         onClick={() => { setEditingDesignation(null); setShowForm(true);}} />
      </div>

      <DesignationTable

        data={designationList}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {

        showForm && (

          <DesignationForm

            data={editingDesignation}

            onSave={handleSave}

            onClose={() => {

              setEditingDesignation(null);

              setShowForm(false);

            }}

          />

        )

      }

    </div>

  );

};

export default Designation;