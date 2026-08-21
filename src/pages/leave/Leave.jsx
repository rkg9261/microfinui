import React, { useState } from "react";

import "./Leave.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";

import LeaveTable from "./LeaveTable";
import LeaveForm from "./LeaveForm";

const Leave = () => {

  const [showForm, setShowForm] =
    useState(false);

  const [editingLeave, setEditingLeave] =
    useState(null);

  const [leaveList, setLeaveList] =
    useState([

      {
        id: 1,
        name: "SAHAB",
        status: "ACTIVE",
      },

      {
        id: 2,
        name: "AJAY",
        status: "ACTIVE",
      },

    ]);

  const handleSave = (formData) => {

    if (editingLeave) {

      setLeaveList((prev) =>
        prev.map((item) =>
          item.id === editingLeave.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

    } else {

      setLeaveList((prev) => [

        ...prev,

        {
          id: Date.now(),
          ...formData,
        },

      ]);

    }

    setEditingLeave(null);

    setShowForm(false);

  };

  const handleEdit = (row) => {

    setEditingLeave(row);

    setShowForm(true);

  };

  const handleDelete = (id) => {

    if (window.confirm("Delete this leave?")) {

      setLeaveList((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    }

  };

  return (

    <div className="leave-page">

      <div className="leave-header">
     <div>
        <h2> Leave Master </h2>
        <p>Manage Leave</p>
      </div>


         
       
        <AddButton

          text="Add New"

          onClick={() => {

            setEditingLeave(null);

            setShowForm(true);

          }}

        />

      </div>

      <LeaveTable

        data={leaveList}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {

        showForm && (

          <LeaveForm

            data={editingLeave}

            onSave={handleSave}

            onClose={() => {

              setEditingLeave(null);

              setShowForm(false);

            }}

          />

        )

      }

    </div>

  );

};

export default Leave;