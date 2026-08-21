import React, {
    useEffect,
    useState,
} from "react";

import "../../components/common/CommonForm.css";
import "../../utils/validation.css";

import { validateRequired } from "../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../components/buttons";

const SessionMasterForm = ({
    data,
    onSave,
    onClose,
}) => {

    const [formData, setFormData] =
        useState({

            session: "",

            startDate: "",

            endDate: "",

            startYear: "",

            endYear: "",

            remark: "",

            status: "ACTIVE",

        });

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        if (data) {

            setFormData({

                session: data.session || "",

                startDate:
                    data.startDate || "",

                endDate:
                    data.endDate || "",

                startYear:
                    data.startYear || "",

                endYear:
                    data.endYear || "",

                remark:
                    data.remark || "",

                status:
                    data.status || "ACTIVE",

            });

        }

    }, [data]);

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

        setErrors((prev) => ({

            ...prev,

            [name]: "",

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const validationErrors =
            validateRequired(formData, [

                {
                    name: "session",
                    label: "Session",
                },

                {
                    name: "startDate",
                    label: "Start Date",
                },

                {
                    name: "endDate",
                    label: "End Date",
                },

                {
                    name: "startYear",
                    label: "Start Year",
                },

                {
                    name: "endYear",
                    label: "End Year",
                },

                {
                    name: "remark",
                    label: "Remark",
                },

                {
                    name: "status",
                    label: "Status",
                },

            ]);

        if (
            Object.keys(validationErrors)
                .length > 0
        ) {

            setErrors(validationErrors);

            return;

        }

        onSave(formData);

    };

    return (

        <div className="common-modal">

            <div className="common-modal-content">

                {/* Header */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "Edit Session"
                            : "Add New"}

                    </h2>

                    <CloseButton
                        onClick={onClose}
                    />

                </div>

                {/* Form */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >

                    <div className="common-form-grid">

                        <div className="common-form-group">

                            <label>

                                Session <span>*</span>

                            </label>

                            <input
                                type="text"
                                name="session"
                                value={formData.session}
                                onChange={handleChange}
                                placeholder="2026-2027"
                                className={
                                    errors.session
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.session && (
                                <p className="error-text">
                                    {errors.session}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                Start Year <span>*</span>

                            </label>

                            <input
                                type="number"
                                name="startYear"
                                value={formData.startYear}
                                onChange={handleChange}
                                placeholder="2026"
                                className={
                                    errors.startYear
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.startYear && (
                                <p className="error-text">
                                    {errors.startYear}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                Start Date <span>*</span>

                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className={
                                    errors.startDate
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.startDate && (
                                <p className="error-text">
                                    {errors.startDate}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                End Year <span>*</span>

                            </label>

                            <input
                                type="number"
                                name="endYear"
                                value={formData.endYear}
                                onChange={handleChange}
                                placeholder="2027"
                                className={
                                    errors.endYear
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.endYear && (
                                <p className="error-text">
                                    {errors.endYear}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                End Date <span>*</span>

                            </label>

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className={
                                    errors.endDate
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.endDate && (
                                <p className="error-text">
                                    {errors.endDate}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                Select Status <span>*</span>

                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={
                                    errors.status
                                        ? "error-input"
                                        : ""
                                }
                            >

                                <option value="">

                                    Select Status

                                </option>

                                <option value="ACTIVE">

                                    ACTIVE

                                </option>

                                <option value="INACTIVE">

                                    INACTIVE

                                </option>

                            </select>

                            {errors.status && (
                                <p className="error-text">
                                    {errors.status}
                                </p>
                            )}

                        </div>

                        <div className="common-form-group">

                            <label>

                                Remark <span>*</span>

                            </label>

                            <input
                                type="text"
                                name="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                placeholder="Enter Remark"
                                className={
                                    errors.remark
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.remark && (
                                <p className="error-text">
                                    {errors.remark}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="common-form-buttons">

                        <SaveButton
                            type="submit"
                        />

                        <CancelButton
                            type="button"
                            onClick={onClose}
                        />

                    </div>

                </form>

            </div>

        </div>

    );

};

export default SessionMasterForm;