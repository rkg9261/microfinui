import React, {
    useState,
} from "react";

import "./GroupMember.css";

import "../../../components/common/CommonForm.css";
import "../../../components/common/CommonView.css";
import "../../../utils/validation.css";

import GroupMemberForm from "./GroupMemberForm";
import GroupMemberTable from "./GroupMemberTable";
import GroupMemberView from "./GroupMemberView";

import {
    AddButton,
} from "../../../components/buttons";


const GroupMember = () => {

    // =====================================================
    // SAMPLE DATA
    // =====================================================

    const [groupMembers, setGroupMembers] = useState([

        {
            id: 1,

            code: "CC2026100002",

            name: "01SLF GROUP",

            groupCity: "BAKRI HAWAR PART 2",

            memberName: "RAJESH TIK",

            memberCode: "MEM010105",

            mobile: "9878643469",

            branch: "SHREEJA GROUP",

            branchCode: "BR1",

            createdAt: "2026-01-04 16:27:15",

            status: "ACTIVE",

        },

        {
            id: 2,

            code: "CC2026100002",

            name: "01SLF GROUP",

            groupCity: "BAKRI HAWAR PART 2",

            memberName: "VIJAY SANKHALA",

            memberCode: "BRISGA000128",

            mobile: "9636385915",

            branch: "SHREEJA GROUP",

            branchCode: "BR1",

            createdAt: "2026-01-04 16:27:15",

            status: "ACTIVE",

        },


    ]);


    // =====================================================
    // MODAL STATES
    // =====================================================

    const [showForm, setShowForm] =
        useState(false);

    const [showView, setShowView] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    const [viewData, setViewData] =
        useState(null);


    // =====================================================
    // ADD
    // =====================================================

    const handleAdd = () => {

        setEditData(null);

        setShowForm(true);

    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (item) => {

        setViewData(item);

        setShowView(true);

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this group member?"
            );

        if (!confirmDelete) {
            return;
        }

        setGroupMembers((prev) =>
            prev.filter(
                (item) =>
                    item.id !== id
            )
        );

    };


    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = (formData) => {

        if (editData) {

            setGroupMembers((prev) =>

                prev.map((item) =>

                    item.id === editData.id

                        ? {
                            ...item,
                            ...formData,
                        }

                        : item

                )

            );

        } else {

            const newMember = {

                id:
                    Date.now(),

                ...formData,

                createdAt:
                    new Date()
                        .toLocaleString(),

            };

            setGroupMembers((prev) => [

                ...prev,

                newMember,

            ]);

        }


        setShowForm(false);

        setEditData(null);

    };


    return (

        <div className="group-member-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="group-member-page-header">

                <div>

                    <h1>
                        GROUP MEMBER
                    </h1>

                    <p>
                        Manage group members
                    </p>

                </div>

            </div>


            {/* =================================================
                CARD
            ================================================= */}

            <div className="group-member-card">


                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="group-member-card-header">

                    <h2>
                        GROUP MEMBER LIST
                    </h2>


                    <div className="group-member-card-actions">

                        <AddButton
                            onClick={handleAdd}
                        />

                    </div>

                </div>


                {/* =================================================
                    TABLE
                ================================================= */}

                <GroupMemberTable

                    data={groupMembers}

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <GroupMemberForm

                    data={editData}

                    onSave={handleSave}

                    onClose={() => {

                        setShowForm(false);

                        setEditData(null);

                    }}

                />

            )}


            {/* =================================================
                VIEW
            ================================================= */}

            {showView && (

                <GroupMemberView

                    data={viewData}

                    onClose={() => {

                        setShowView(false);

                        setViewData(null);

                    }}

                />

            )}

        </div>

    );

};


export default GroupMember;