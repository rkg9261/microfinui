import React, { useState } from "react";

import "./Group.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css"

import { AddButton } from "../../components/buttons";

import GroupTable from "./GroupTable";
import GroupForm from "./GroupForm";

const Group = () => {

  const [showForm, setShowForm] = useState(false);

  const [groups, setGroups] = useState([

    {
      id: 1,
      code: "GRP001",
      branch: "LASKARHAT",
      groupName: "OSLE GROUP",
      city: "BAKRI HAWAR PART 2",
      collectionTime: "10:00 AM",
      collectionDay: "MONDAY",
      centerLeader: "JAY",
      address: "Bakri Hawar",
      status: "ACTIVE",
    },

    {
      id: 2,
      code: "GRP002",
      branch: "JAGATPURA",
      groupName: "SEEMA SHG",
      city: "PARSHURAMPUR",
      collectionTime: "11:30 AM",
      collectionDay: "FRIDAY",
      centerLeader: "KUMARI SEEMA",
      address: "Parshurampur",
      status: "INACTIVE",
    },

  ]);

  const [editingGroup, setEditingGroup] =
    useState(null);

  const handleSave = (data) => {

    if (editingGroup) {

      setGroups((prev) =>
        prev.map((item) =>
          item.id === editingGroup.id
            ? {
                ...editingGroup,
                ...data,
              }
            : item
        )
      );

    } else {

      setGroups((prev) => [

        ...prev,

        {
          id: Date.now(),
          code:
            "GRP" +
            String(prev.length + 1).padStart(
              3,
              "0"
            ),
          ...data,
        },

      ]);

    }

    setEditingGroup(null);

    setShowForm(false);

  };

  const handleEdit = (row) => {

    setEditingGroup(row);

    setShowForm(true);

  };

  const handleDelete = (id) => {

    if (
      window.confirm(
        "Delete this Group?"
      )
    ) {

      setGroups((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    }

  };

  return (

    <div className="group-page">

      <div className="group-header">
         <div>
        <h2>
          Group Master
        </h2>
        <p>Manage Group Master</p>
        </div>

        <AddButton
          text="Add New"
          onClick={() => {

            setEditingGroup(null);

            setShowForm(true);

          }}
        />

      </div>

      <div className="group-filter-card">

        <div className="group-filter-item">

          <label>
            Branch
          </label>

          <select>

            <option>
              All Branches
            </option>

            <option>
              LASKARHAT
            </option>

            <option>
              JAGATPURA
            </option>

          </select>

        </div>

      </div>
       
      

      <GroupTable

        data={groups}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {showForm && (

        <GroupForm

          data={editingGroup}

          onSave={handleSave}

          onClose={() => {

            setEditingGroup(null);

            setShowForm(false);

          }}

        />

      )}

    </div>

  );

};

export default Group;