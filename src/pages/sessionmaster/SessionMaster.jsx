import React, { useState } from "react";

import "./SessionMaster.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import SessionMasterTable from "./SessionMasterTable";
import SessionMasterForm from "./SessionMasterForm";

const SessionMaster = () => {

    const [showForm, setShowForm] =
        useState(false);

    const [editingData, setEditingData] =
        useState(null);

    const [sessionList, setSessionList] =
        useState([

            {
                id: 1,
                session: "2026-2027",
                startDate: "2026-04-01",
                endDate: "2027-03-31",
                startYear: "2026",
                endYear: "2027",
                remark: "CURRENT SESSION",
                status: "ACTIVE",
            },

            {
                id: 2,
                session: "2025-2026",
                startDate: "2025-04-01",
                endDate: "2026-03-31",
                startYear: "2025",
                endYear: "2026",
                remark: "PREVIOUS SESSION",
                status: "ACTIVE",
            },

        ]);

    const handleSave = (formData) => {

        if (editingData) {

            setSessionList((prev) =>
                prev.map((item) =>
                    item.id === editingData.id
                        ? {
                              ...item,
                              ...formData,
                          }
                        : item
                )
            );

        } else {

            setSessionList((prev) => [

                ...prev,

                {

                    id: Date.now(),

                    ...formData,

                },

            ]);

        }

        setEditingData(null);

        setShowForm(false);

    };

    const handleAdd = () => {

        setEditingData(null);

        setShowForm(true);

    };

    const handleEdit = (row) => {

        setEditingData(row);

        setShowForm(true);

    };

    return (

        <div className="session-master-page">

            <div className="session-master-header">

                <h2>

                    SESSION LIST

                </h2>

            </div>

            <SessionMasterTable

                data={sessionList}

                onAdd={handleAdd}

                onEdit={handleEdit}

            />

            {

                showForm && (

                    <SessionMasterForm

                        data={editingData}

                        onSave={handleSave}

                        onClose={() => {

                            setEditingData(null);

                            setShowForm(false);

                        }}

                    />

                )

            }

        </div>

    );

};

export default SessionMaster;