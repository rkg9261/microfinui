import React, { useState } from "react";

import "./Bank.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";

import BankTable from "./BankTable";
import BankForm from "./BankForm";

const Bank = () => {

  const [showForm, setShowForm] = useState(false);

  const [editingBank, setEditingBank] = useState(null);

  const [banks, setBanks] = useState([

    {
      id: 1,
      name: "PER",
      shortName: "OI111",
      status: "ACTIVE",
    },

    {
      id: 2,
      name: "SG GROUP",
      shortName: "SG",
      status: "ACTIVE",
    },


  ]);

  const handleSave = (formData) => {

    if (editingBank) {

      setBanks((prev) =>
        prev.map((item) =>
          item.id === editingBank.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

    } else {

      setBanks((prev) => [

        ...prev,

        {
          id: Date.now(),
          ...formData,
        },

      ]);

    }

    setEditingBank(null);

    setShowForm(false);

  };

  const handleEdit = (row) => {

    setEditingBank(row);

    setShowForm(true);

  };

  const handleDelete = (id) => {

    if (window.confirm("Delete this bank?")) {

      setBanks((prev) =>
        prev.filter((item) => item.id !== id)
      );

    }

  };

  return (

    <div className="bank-page">

      <div className="bank-header">
  <div>
        <h2>

          Bank Master

        </h2>
        <p>Manage Bank Master</p></div>

        <AddButton

          text="Add New"

          onClick={() => {

            setEditingBank(null);

            setShowForm(true);

          }}

        />

      </div>

      <BankTable

        data={banks}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {

        showForm && (

          <BankForm

            data={editingBank}

            onSave={handleSave}

            onClose={() => {

              setEditingBank(null);

              setShowForm(false);

            }}

          />

        )

      }

    </div>

  );

};

export default Bank;