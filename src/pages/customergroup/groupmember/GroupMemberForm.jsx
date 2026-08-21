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


const GroupMemberForm = ({
    data,
    onSave,
    onClose,
}) => {


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        branch: "",

        group: "",

        member: "",

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

                group:
                    data.name || "",

                member:
                    data.memberName || "",

            });

        } else {

            setFormData({

                branch: "",

                group: "",

                member: "",

            });

        }

        setErrors({});

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
                        name: "group",
                        label: "Group",
                    },

                    {
                        name: "member",
                        label: "Member",
                    },

                ]

            );


        setErrors(
            validationErrors
        );


        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            return;

        }


        onSave({

            branch:
                formData.branch,

            name:
                formData.group,

            memberName:
                formData.member,

            group:
                formData.group,

            member:
                formData.member,

        });

    };


    return (

        <div className="common-modal">


            <div
                className="common-modal-content group-member-form-modal"
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT GROUP MEMBER"
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
                    className="common-form group-member-form"
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
                                    *
                                </span>

                            </label>


                            <select

                                name="branch"

                                value={
                                    formData.branch
                                }

                                onChange={
                                    handleChange
                                }

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

                                <option value="JAGATPURA">
                                    JAGATPURA
                                </option>

                            </select>


                            {errors.branch && (

                                <p className="error-text">

                                    {
                                        errors.branch
                                    }

                                </p>

                            )}

                        </div>


                        {/* =================================================
                            MEMBER
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                Member

                                <span>
                                    *
                                </span>

                            </label>


                            <select

                                name="member"

                                value={
                                    formData.member
                                }

                                onChange={
                                    handleChange
                                }

                                className={
                                    errors.member
                                        ? "error-input"
                                        : ""
                                }

                            >

                                <option value="">
                                    Select Member
                                </option>

                                <option value="RAJESH TIK">
                                    RAJESH TIK
                                </option>

                                <option value="VIJAY SANKHALA">
                                    VIJAY SANKHALA
                                </option>

                                <option value="JAY">
                                    JAY
                                </option>

                                <option value="MANIBIDYAKUMARI">
                                    MANIBIDYAKUMARI
                                </option>

                                <option value="GEETANJALI DEVI">
                                    GEETANJALI DEVI
                                </option>

                                <option value="SONY">
                                    SONY
                                </option>

                                <option value="AVINASH PRAJAPATI">
                                    AVINASH PRAJAPATI
                                </option>

                            </select>


                            {errors.member && (

                                <p className="error-text">

                                    {
                                        errors.member
                                    }

                                </p>

                            )}

                        </div>


                        {/* =================================================
                            GROUP
                        ================================================= */}

                        <div className="common-form-group">

                            <label>

                                Group

                                <span>
                                    *
                                </span>

                            </label>


                            <select

                                name="group"

                                value={
                                    formData.group
                                }

                                onChange={
                                    handleChange
                                }

                                className={
                                    errors.group
                                        ? "error-input"
                                        : ""
                                }

                            >

                                <option value="">
                                    Select Group
                                </option>

                                <option value="01SLF GROUP">
                                    01SLF GROUP
                                </option>

                                <option value="HGJCHFJHG">
                                    HGJCHFJHG
                                </option>

                                <option value="SEEMA SHG">
                                    SEEMA SHG
                                </option>

                                <option value="SATHI">
                                    SATHI
                                </option>

                                <option value="ALPHA GROUP">
                                    ALPHA GROUP
                                </option>

                                <option value="NEW SHG">
                                    NEW SHG
                                </option>

                                <option value="MAHILA GROUP">
                                    MAHILA GROUP
                                </option>

                            </select>


                            {errors.group && (

                                <p className="error-text">

                                    {
                                        errors.group
                                    }

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
                            text="Create"
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


export default GroupMemberForm;