import React, {
    useState,
} from "react";

import "./CustomerCgt.css";

import CustomerCgtForm from "./CustomerCgtForm";
import CustomerCgtTable from "./CustomerCgtTable";


const CustomerCgt = () => {

    // =====================================================
    // FORM MODAL
    // =====================================================

    const [showForm, setShowForm] =
        useState(false);


    // =====================================================
    // EDIT DATA
    // =====================================================

    const [editData, setEditData] =
        useState(null);


    // =====================================================
    // FILTER DATA
    // =====================================================

    const [filters, setFilters] =
        useState({

            branch: "",
            collectionCenter: "",
            member: "",
            cgtStaff: "",
            grtStaff: "",
            cgtDate: "",
            grtDate: "",
            status: "All",

        });


    // =====================================================
    // APPLIED FILTERS
    // =====================================================

    const [appliedFilters, setAppliedFilters] =
        useState({});


    // =====================================================
    // INITIAL DATA
    // =====================================================

    const [records, setRecords] = useState([

        {
            id: 1,

            memberName: "RABINA KUMARI",
            memberCode: "MEM010101",

            branch: "SHREEJA GROUP",
            collectionCenter: "DEVAS",

            groupName: "ALPHA GROUP",

            cgtStaff: "RAJ",
            cgtStaffCode: "BRIEG:E3",

            grtStaff: "JABIR HUSSAIN",
            grtStaffCode: "ANAND NAGAR2AM5FMEM15",

            cgtDate: "2026-04-21",
            grtDate: "2026-07-20",

            createdAt: "2026-04-21 16:24:26",

            trainingStatus: "REJECT",

            cgtStatus: "TRUE",
            grtStatus: "FALSE",

            status: "REJECT",

        },

        {
            id: 2,

            memberName: "AKSHAY GARG",
            memberCode: "BRIM5",

            branch: "SHREEJA GROUP",
            collectionCenter: "TULSI",

            groupName: "BETA GROUP",

            cgtStaff: "ROHIT ROHIT KUMAR",
            cgtStaffCode: "EG:IAMSFMEP12",

            grtStaff: "ABHIJIT",
            grtStaffCode: "AM5FMEMP21",

            cgtDate: "2026-04-01",
            grtDate: "2026-06-01",

            createdAt: "2026-04-01 14:08:09",

            trainingStatus: "PASSED",

            cgtStatus: "TRUE",
            grtStatus: "TRUE",

            status: "PASSED",

        },

        {
            id: 3,

            memberName: "PRIYA SHARMA",
            memberCode: "MEM010125",

            branch: "SHREEJA GROUP",
            collectionCenter: "DEWAS",

            groupName: "GOLD GROUP",

            cgtStaff: "RAJ",
            cgtStaffCode: "BRIEG:E3",

            grtStaff: "JABIR HUSSAIN",
            grtStaffCode: "ANAND NAGAR2AM5FMEM15",

            cgtDate: "2026-05-10",
            grtDate: "2026-07-10",

            createdAt: "2026-05-10 11:20:10",

            trainingStatus: "PASSED",

            cgtStatus: "TRUE",
            grtStatus: "TRUE",

            status: "PASSED",

        },

        {
            id: 4,

            memberName: "NEHA VERMA",
            memberCode: "MEM010130",

            branch: "BRANCH M FINANCE",
            collectionCenter: "TULSI",

            groupName: "NEW GROUP",

            cgtStaff: "ROHIT",
            cgtStaffCode: "EG:IAMSFMEP12",

            grtStaff: "ABHIJIT",
            grtStaffCode: "AM5FMEMP21",

            cgtDate: "2026-05-20",
            grtDate: "2026-07-25",

            createdAt: "2026-05-20 10:12:20",

            trainingStatus: "PASSED",

            cgtStatus: "TRUE",
            grtStatus: "TRUE",

            status: "PASSED",

        },

        {
            id: 5,

            memberName: "POOJA DEVI",
            memberCode: "MEM010140",

            branch: "RAMNAGAR",
            collectionCenter: "PARSHURAMPUR",

            groupName: "SEEMA SHG",

            cgtStaff: "RAJ",
            cgtStaffCode: "BRIEG:E3",

            grtStaff: "JABIR HUSSAIN",
            grtStaffCode: "ANAND NAGAR2AM5FMEM15",

            cgtDate: "2026-06-01",
            grtDate: "2026-07-30",

            createdAt: "2026-06-01 09:30:00",

            trainingStatus: "PENDING",

            cgtStatus: "FALSE",
            grtStatus: "FALSE",

            status: "PENDING",

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

    const handleEdit = (record) => {

        setEditData(record);

        setShowForm(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = (formData) => {

        if (editData) {

            setRecords((prev) =>

                prev.map((item) =>

                    item.id === editData.id
                        ? {
                            ...formData,
                            id: editData.id,
                        }
                        : item

                )

            );

        } else {

            const newRecord = {

                ...formData,

                id:
                    Date.now(),

                createdAt:
                    new Date()
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " "),

            };

            setRecords((prev) => [

                newRecord,
                ...prev,

            ]);

        }

        handleClose();

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this record?"
            );

        if (!confirmDelete) {
            return;
        }

        setRecords((prev) =>

            prev.filter(
                (item) =>
                    item.id !== id
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

        setFilters((prev) => ({

            ...prev,

            [name]: value,

        }));

    };


    // =====================================================
    // APPLY FILTER
    // =====================================================

    const handleApplyFilters = () => {

        setAppliedFilters({
            ...filters,
        });

    };


    // =====================================================
    // RESET FILTER
    // =====================================================

    const handleResetFilters = () => {

        const resetData = {

            branch: "",
            collectionCenter: "",
            member: "",
            cgtStaff: "",
            grtStaff: "",
            cgtDate: "",
            grtDate: "",
            status: "All",

        };

        setFilters(resetData);

        setAppliedFilters({});

    };


    // =====================================================
    // FILTER RECORDS
    // =====================================================

    const filteredRecords =
        records.filter((record) => {

            const branchMatch =
                !appliedFilters.branch ||
                record.branch
                    .toLowerCase()
                    .includes(
                        appliedFilters.branch
                            .toLowerCase()
                    );


            const centerMatch =
                !appliedFilters.collectionCenter ||
                record.collectionCenter
                    .toLowerCase()
                    .includes(
                        appliedFilters.collectionCenter
                            .toLowerCase()
                    );


            const memberMatch =
                !appliedFilters.member ||
                record.memberName
                    .toLowerCase()
                    .includes(
                        appliedFilters.member
                            .toLowerCase()
                    );


            const cgtStaffMatch =
                !appliedFilters.cgtStaff ||
                record.cgtStaff
                    .toLowerCase()
                    .includes(
                        appliedFilters.cgtStaff
                            .toLowerCase()
                    );


            const grtStaffMatch =
                !appliedFilters.grtStaff ||
                record.grtStaff
                    .toLowerCase()
                    .includes(
                        appliedFilters.grtStaff
                            .toLowerCase()
                    );


            const cgtDateMatch =
                !appliedFilters.cgtDate ||
                record.cgtDate ===
                    appliedFilters.cgtDate;


            const grtDateMatch =
                !appliedFilters.grtDate ||
                record.grtDate ===
                    appliedFilters.grtDate;


            const statusMatch =
                !appliedFilters.status ||
                appliedFilters.status === "All" ||
                record.status ===
                    appliedFilters.status;


            return (
                branchMatch &&
                centerMatch &&
                memberMatch &&
                cgtStaffMatch &&
                grtStaffMatch &&
                cgtDateMatch &&
                grtDateMatch &&
                statusMatch
            );

        });


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="customer-cgt-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="customer-cgt-page-header">

                <div>

                    <h1>
                        CUSTOMERCGT
                    </h1>

                    <p>
                        Customer CGT & GRT Records
                    </p>

                </div>

            </div>


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <div className="customer-cgt-filter-card">


                <div className="customer-cgt-filter-header">

                    <h2>
                        🔎 SEARCH FILTERS
                    </h2>

                </div>


                <div className="customer-cgt-filter-grid">


                    {/* BRANCH */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            🏢 BRANCH
                        </label>

                        <select
                            name="branch"
                            value={filters.branch}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Branch
                            </option>

                            <option value="SHREEJA GROUP">
                                SHREEJA GROUP
                            </option>

                            <option value="BRANCH M FINANCE">
                                BRANCH M FINANCE
                            </option>

                            <option value="RAMNAGAR">
                                RAMNAGAR
                            </option>

                        </select>

                    </div>


                    {/* COLLECTION CENTER */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            🏢 COLLECTION CENTER
                        </label>

                        <select
                            name="collectionCenter"
                            value={filters.collectionCenter}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Collection Center
                            </option>

                            <option value="DEVAS">
                                DEVAS
                            </option>

                            <option value="TULSI">
                                TULSI
                            </option>

                            <option value="PARSHURAMPUR">
                                PARSHURAMPUR
                            </option>

                        </select>

                    </div>


                    {/* MEMBER */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 MEMBER (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="member"
                            placeholder="Search Member"
                            value={filters.member}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* CGT STAFF */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 CGT STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="cgtStaff"
                            placeholder="Search CGT Staff"
                            value={filters.cgtStaff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* GRT STAFF */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 GRT STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="grtStaff"
                            placeholder="Search GRT Staff"
                            value={filters.grtStaff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* CGT DATE */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            📅 CGT DATE
                        </label>

                        <input
                            type="date"
                            name="cgtDate"
                            value={filters.cgtDate}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* GRT DATE */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            📅 GRT DATE
                        </label>

                        <input
                            type="date"
                            name="grtDate"
                            value={filters.grtDate}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* STATUS */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            ℹ STATUS
                        </label>

                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="PASSED">
                                Passed
                            </option>

                            <option value="REJECT">
                                Reject
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                        </select>

                    </div>


                </div>


                {/* FILTER BUTTONS */}

                <div className="customer-cgt-filter-buttons">

                    <button
                        type="button"
                        className="customer-cgt-apply-btn"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </button>

                    <button
                        type="button"
                        className="customer-cgt-reset-btn"
                        onClick={handleResetFilters}
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <CustomerCgtTable

                records={filteredRecords}

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <CustomerCgtForm

                    data={editData}

                    onSave={handleSave}

                    onClose={handleClose}

                />

            )}

        </div>

    );

};


export default CustomerCgt;