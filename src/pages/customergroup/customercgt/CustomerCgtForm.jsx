import React, {
    useEffect,
    useState,
} from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import {
    validateRequired,
} from "../../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../../components/buttons";


const CustomerCgtForm = ({
    data,
    onSave,
    onClose,
}) => {


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        branch: "",
        member: "",
        group: "",

        cgtStaffId: "",
        grtStaffId: "",

    });


    // =====================================================
    // ERRORS
    // =====================================================

    const [errors, setErrors] =
        useState({});


    // =====================================================
    // EDIT DATA
    // =====================================================

    useEffect(() => {

        if (data) {

            setFormData({

                branch:
                    data.branch || "",

                member:
                    data.memberName || "",

                group:
                    data.groupName || "",

                cgtStaffId:
                    data.cgtStaff || "",

                grtStaffId:
                    data.grtStaff || "",

            });

        }

    }, [data]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));


        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: "",

            }));

        }

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = (e) => {

        e.preventDefault();


        const validationErrors =
            validateRequired(

                formData,

                [

                    {
                        name: "branch",
                        label: "Branch",
                    },

                    {
                        name: "member",
                        label: "Member",
                    },

                    {
                        name: "cgtStaffId",
                        label: "CGT Staff ID",
                    },

                    {
                        name: "grtStaffId",
                        label: "GRT Staff ID",
                    },

                ]

            );


        setErrors(validationErrors);


        if (
            Object.keys(validationErrors).length > 0
        ) {

            return;

        }


        onSave({

            branch:
                formData.branch,

            memberName:
                formData.member,

            memberCode:
                data?.memberCode || "NEW",

            groupName:
                formData.group || "N/A",

            collectionCenter:
                data?.collectionCenter || "N/A",

            cgtStaff:
                formData.cgtStaffId,

            cgtStaffCode:
                data?.cgtStaffCode || "NEW",

            grtStaff:
                formData.grtStaffId,

            grtStaffCode:
                data?.grtStaffCode || "NEW",

            cgtDate:
                data?.cgtDate ||
                new Date()
                    .toISOString()
                    .split("T")[0],

            grtDate:
                data?.grtDate ||
                new Date()
                    .toISOString()
                    .split("T")[0],

            trainingStatus:
                data?.trainingStatus ||
                "PENDING",

            cgtStatus:
                data?.cgtStatus ||
                "TRUE",

            grtStatus:
                data?.grtStatus ||
                "TRUE",

            status:
                data?.status ||
                "PENDING",

        });

    };


    return (

        <div className="common-modal">


            <div className="common-modal-content">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT CUSTOMER CGT"
                            : "ADD NEW"
                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="common-form customer-cgt-form"
                    onSubmit={handleSubmit}
                >


                    <div className="common-form-grid">


                        {/* =================================================
                            BRANCH
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                Branch

                                <span>
                                    {" "}*
                                </span>

                            </label>


                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className={
                                    errors.branch
                                        ? "error-input"
                                        : ""
                                }
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


                            {errors.branch && (

                                <p className="error-text">
                                    {errors.branch}
                                </p>

                            )}

                        </div>


                        {/* =================================================
                            MEMBER
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                Member (Type Here)

                                <span>
                                    {" "}*
                                </span>

                            </label>


                            <input
                                type="text"
                                name="member"
                                placeholder="Search Member"
                                value={formData.member}
                                onChange={handleChange}
                                className={
                                    errors.member
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.member && (

                                <p className="error-text">
                                    {errors.member}
                                </p>

                            )}

                        </div>


                        {/* =================================================
                            GROUP
                        ================================================= */}

                        <div className="common-form-group">

                            <label>
                                Group
                            </label>


                            <input
                                type="text"
                                name="group"
                                placeholder="Search Group"
                                value={formData.group}
                                onChange={handleChange}
                            />

                        </div>


                        {/* =================================================
                            CGT STAFF
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                CGT Staff ID

                                <span>
                                    {" "}*
                                </span>

                            </label>


                            <input
                                type="text"
                                name="cgtStaffId"
                                placeholder="Select CGT Staff"
                                value={formData.cgtStaffId}
                                onChange={handleChange}
                                className={
                                    errors.cgtStaffId
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.cgtStaffId && (

                                <p className="error-text">
                                    {errors.cgtStaffId}
                                </p>

                            )}

                        </div>


                        {/* =================================================
                            GRT STAFF
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                GRT Staff ID

                                <span>
                                    {" "}*
                                </span>

                            </label>


                            <input
                                type="text"
                                name="grtStaffId"
                                placeholder="Select GRT Staff"
                                value={formData.grtStaffId}
                                onChange={handleChange}
                                className={
                                    errors.grtStaffId
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.grtStaffId && (

                                <p className="error-text">
                                    {errors.grtStaffId}
                                </p>

                            )}

                        </div>


                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="common-form-buttons">

                        <SaveButton
                            type="submit"
                            text="Save"
                        />


                        <CancelButton
                            type="button"
                            text="Cancel"
                            onClick={onClose}
                        />

                    </div>


                </form>

            </div>

        </div>

    );

};


export default CustomerCgtForm;