import React, { useState } from "react";

import "./Member.css";

import MemberForm from "./MemberForm";
import MemberTable from "./MemberTable";

import {
    AddButton,
    ViewButton,
    EditButton,
    DeleteButton,
    CloseButton,
} from "../../../components/buttons";


const Member = () => {

    // =====================================================
    // FORM
    // =====================================================

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);


    // =====================================================
    // VIEW
    // =====================================================

    const [showView, setShowView] = useState(false);

    const [viewData, setViewData] = useState(null);


    // =====================================================
    // FILTER
    // =====================================================

    const [filters, setFilters] = useState({
        branch: "",
        staff: "",
        loanExist: "All",
        status: "",
    });


    // =====================================================
    // APPLIED FILTER
    // =====================================================

    const [appliedFilters, setAppliedFilters] = useState({});


    // =====================================================
    // MEMBER DATA
    // =====================================================

    const [members, setMembers] = useState([

        {
            id: 1,

            memberId: "MEM000001",

            memberName: "KIRAN KUMARI",

            fatherHusbandName: "RAMESH KUMAR",

            gender: "Female",

            dateOfBirth: "1998-09-08",

            mobileNumber: "9876543211",

            address:
                "Main Road, Near Market",

            state: "Bihar",

            district: "Patna",

            villageCity: "Patna",

            branch: "LASKARHAT",

            memberSince: "2026-08-06",

            occupation: "Business",

            kycType: "Aadhaar",

            kycNumber: "987654321125",

            nomineeName: "RAJESH KUMAR",

            nomineeRelation: "Husband",

            loanExist: "Yes",

            staff: "SAMAN SHARMA",

            status: "ACTIVE",

        },

        {
            id: 2,

            memberId: "MEM000002",

            memberName: "AMBEY",

            fatherHusbandName: "MOHAN LAL",

            gender: "Male",

            dateOfBirth: "1999-05-08",

            mobileNumber: "9554067072",

            address:
                "Station Road, Ward No 5",

            state: "Bihar",

            district: "Gaya",

            villageCity: "Gaya",

            branch: "BRANCH M FINANCE",

            memberSince: "2026-08-05",

            occupation: "Farmer",

            kycType: "PAN",

            kycNumber: "UIP784739F",

            nomineeName: "SUNITA DEVI",

            nomineeRelation: "Wife",

            loanExist: "No",

            staff: "AGENT-1",

            status: "ACTIVE",

        },

        {
            id: 3,

            memberId: "MEM000003",

            memberName: "PAVAN RATINDRA RATHOD",

            fatherHusbandName:
                "RAVINDRA RATHOD",

            gender: "Male",

            dateOfBirth: "2006-10-22",

            mobileNumber: "9373566160",

            address:
                "Village Main Road",

            state: "Maharashtra",

            district: "Pachora",

            villageCity: "Pachora",

            branch: "LASKARHAT",

            memberSince: "2026-07-25",

            occupation: "Farmer",

            kycType: "Voter ID",

            kycNumber: "CTNPG80C",

            nomineeName: "POOJA RATHOD",

            nomineeRelation: "Mother",

            loanExist: "Yes",

            staff: "SHAIBAL GHOSE",

            status: "ACTIVE",

        },

        {
            id: 4,

            memberId: "MEM000004",

            memberName: "RABINA KUMARI",

            fatherHusbandName: "SURESH KUMAR",

            gender: "Female",

            dateOfBirth: "1997-02-15",

            mobileNumber: "9123456789",

            address:
                "Market Road, Devas",

            state: "Madhya Pradesh",

            district: "Dewas",

            villageCity: "Dewas",

            branch: "SHREEJA GROUP",

            memberSince: "2026-07-20",

            occupation: "Tailor",

            kycType: "Aadhaar",

            kycNumber: "123456789012",

            nomineeName: "RAJESH",

            nomineeRelation: "Husband",

            loanExist: "No",

            staff: "RAJ",

            status: "ACTIVE",

        },

        {
            id: 5,

            memberId: "MEM000005",

            memberName: "AKSHAY GARG",

            fatherHusbandName: "MANOJ GARG",

            gender: "Male",

            dateOfBirth: "1995-11-12",

            mobileNumber: "9988776655",

            address:
                "Civil Lines",

            state: "Madhya Pradesh",

            district: "Indore",

            villageCity: "Indore",

            branch: "SHREEJA GROUP",

            memberSince: "2026-07-10",

            occupation: "Shopkeeper",

            kycType: "PAN",

            kycNumber: "ABCDE1234F",

            nomineeName: "NEHA GARG",

            nomineeRelation: "Wife",

            loanExist: "Yes",

            staff: "ROHIT KUMAR",

            status: "ACTIVE",

        },

    ]);


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

    const handleEdit = (data) => {

        setEditData(data);

        setShowForm(true);

    };


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (data) => {

        setViewData(data);

        setShowView(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleCloseForm = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =====================================================
    // CLOSE VIEW
    // =====================================================

    const handleCloseView = () => {

        setShowView(false);

        setViewData(null);

    };


    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = (data) => {

        if (editData) {

            setMembers((previous) =>
                previous.map((member) =>
                    member.id === editData.id
                        ? {
                            ...data,
                            id: editData.id,
                            memberId:
                                editData.memberId,
                        }
                        : member
                )
            );

        } else {

            const newMember = {

                ...data,

                id: Date.now(),

                memberId:
                    `MEM${String(
                        members.length + 1
                    ).padStart(6, "0")}`,

                memberSince:
                    new Date()
                        .toISOString()
                        .split("T")[0],

            };

            setMembers((previous) => [
                newMember,
                ...previous,
            ]);

        }

        handleCloseForm();

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this member?"
            );

        if (!confirmDelete) {
            return;
        }

        setMembers((previous) =>
            previous.filter(
                (member) =>
                    member.id !== id
            )
        );

    };


    // =====================================================
    // FILTER CHANGE
    // =====================================================

    const handleFilterChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =====================================================
    // APPLY FILTER
    // =====================================================

    const handleApplyFilter = () => {

        setAppliedFilters({
            ...filters,
        });

    };


    // =====================================================
    // RESET FILTER
    // =====================================================

    const handleResetFilter = () => {

        const reset = {
            branch: "",
            staff: "",
            loanExist: "All",
            status: "",
        };

        setFilters(reset);

        setAppliedFilters({});

    };


    // =====================================================
    // FILTER DATA
    // =====================================================

    const filteredMembers =
        members.filter((member) => {

            const branchMatch =
                !appliedFilters.branch ||
                member.branch
                    .toLowerCase()
                    .includes(
                        appliedFilters.branch
                            .toLowerCase()
                    );


            const staffMatch =
                !appliedFilters.staff ||
                member.staff
                    .toLowerCase()
                    .includes(
                        appliedFilters.staff
                            .toLowerCase()
                    );


            const loanMatch =
                !appliedFilters.loanExist ||
                appliedFilters.loanExist === "All" ||
                member.loanExist ===
                    appliedFilters.loanExist;


            const statusMatch =
                !appliedFilters.status ||
                member.status ===
                    appliedFilters.status;


            return (
                branchMatch &&
                staffMatch &&
                loanMatch &&
                statusMatch
            );

        });


    return (

        <div className="member-page">


            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <div className="member-page-title">

                <h1>
                    MEMBER
                </h1>

            </div>


            {/* =================================================
                SEARCH FILTER
            ================================================= */}

            <div className="member-filter-card">


                <div className="member-filter-title">

                    <span>
                        SEARCH BY
                    </span>

                </div>


                <div className="member-filter-grid">


                    {/* BRANCH */}

                    <div className="member-filter-group">

                        <label>
                            BRANCH
                        </label>

                        <select
                            name="branch"
                            value={filters.branch}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Branch
                            </option>

                            <option value="LASKARHAT">
                                LASKARHAT
                            </option>

                            <option value="SHREEJA GROUP">
                                SHREEJA GROUP
                            </option>

                            <option value="BRANCH M FINANCE">
                                BRANCH M FINANCE
                            </option>

                        </select>

                    </div>


                    {/* STAFF */}

                    <div className="member-filter-group">

                        <label>
                            STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="staff"
                            placeholder="Search Staff"
                            value={filters.staff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* LOAN */}

                    <div className="member-filter-group">

                        <label>
                            LOAN EXIST <span>*</span>
                        </label>

                        <select
                            name="loanExist"
                            value={filters.loanExist}
                            onChange={handleFilterChange}
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="Yes">
                                Yes
                            </option>

                            <option value="No">
                                No
                            </option>

                        </select>

                    </div>


                    {/* STATUS */}

                    <div className="member-filter-group">

                        <label>
                            SELECT STATUS <span>*</span>
                        </label>

                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>

                        </select>

                    </div>


                </div>


                {/* FILTER BUTTON */}

                <div className="member-filter-actions">

                    <button
                        type="button"
                        className="member-search-button"
                        onClick={handleApplyFilter}
                    >
                        🔍 Search
                    </button>

                    <button
                        type="button"
                        className="member-reset-button"
                        onClick={handleResetFilter}
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <MemberTable

                members={filteredMembers}

                onAdd={handleAdd}

                onView={handleView}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            {/* =================================================
                FORM MODAL
            ================================================= */}

            {showForm && (

                <MemberForm

                    data={editData}

                    onSave={handleSave}

                    onClose={handleCloseForm}

                />

            )}


            {/* =================================================
                VIEW MODAL
            ================================================= */}

            {showView && viewData && (

                <div
                    className="member-view-overlay"
                    onClick={handleCloseView}
                >

                    <div
                        className="member-view-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="member-view-header">

                            <h2>
                                MEMBER DETAILS
                            </h2>

                            <CloseButton
                                onClick={
                                    handleCloseView
                                }
                            />

                        </div>


                        <div className="member-view-body">

                            <div className="member-view-grid">

                                <div>
                                    <b>MEMBER ID</b>
                                    <span>
                                        {viewData.memberId}
                                    </span>
                                </div>

                                <div>
                                    <b>MEMBER NAME</b>
                                    <span>
                                        {viewData.memberName}
                                    </span>
                                </div>

                                <div>
                                    <b>FATHER / HUSBAND</b>
                                    <span>
                                        {viewData.fatherHusbandName}
                                    </span>
                                </div>

                                <div>
                                    <b>GENDER</b>
                                    <span>
                                        {viewData.gender}
                                    </span>
                                </div>

                                <div>
                                    <b>DATE OF BIRTH</b>
                                    <span>
                                        {viewData.dateOfBirth}
                                    </span>
                                </div>

                                <div>
                                    <b>MOBILE NUMBER</b>
                                    <span>
                                        {viewData.mobileNumber}
                                    </span>
                                </div>

                                <div>
                                    <b>ADDRESS</b>
                                    <span>
                                        {viewData.address}
                                    </span>
                                </div>

                                <div>
                                    <b>STATE</b>
                                    <span>
                                        {viewData.state}
                                    </span>
                                </div>

                                <div>
                                    <b>DISTRICT</b>
                                    <span>
                                        {viewData.district}
                                    </span>
                                </div>

                                <div>
                                    <b>VILLAGE / CITY</b>
                                    <span>
                                        {viewData.villageCity}
                                    </span>
                                </div>

                                <div>
                                    <b>BRANCH</b>
                                    <span>
                                        {viewData.branch}
                                    </span>
                                </div>

                                <div>
                                    <b>MEMBER SINCE</b>
                                    <span>
                                        {viewData.memberSince}
                                    </span>
                                </div>

                                <div>
                                    <b>OCCUPATION</b>
                                    <span>
                                        {viewData.occupation}
                                    </span>
                                </div>

                                <div>
                                    <b>KYC TYPE</b>
                                    <span>
                                        {viewData.kycType}
                                    </span>
                                </div>

                                <div>
                                    <b>KYC NUMBER</b>
                                    <span>
                                        {viewData.kycNumber}
                                    </span>
                                </div>

                                <div>
                                    <b>NOMINEE NAME</b>
                                    <span>
                                        {viewData.nomineeName}
                                    </span>
                                </div>

                                <div>
                                    <b>NOMINEE RELATION</b>
                                    <span>
                                        {viewData.nomineeRelation}
                                    </span>
                                </div>

                                <div>
                                    <b>STATUS</b>

                                    <span>

                                        <strong
                                            className={
                                                viewData.status ===
                                                "ACTIVE"
                                                    ? "member-active-status"
                                                    : "member-inactive-status"
                                            }
                                        >
                                            {viewData.status}
                                        </strong>

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};


export default Member;