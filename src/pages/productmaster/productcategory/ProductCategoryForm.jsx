import React, {
    useEffect,
    useState,
} from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import { validateRequired } from "../../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../../components/buttons";

const ProductCategoryForm = ({
    data,
    onSave,
    onClose,
}) => {

    const [formData, setFormData] = useState({
        category: "",
        code: "",
        remark: "",
        status: "ACTIVE",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (data) {

            setFormData({
                category: data.category || "",
                code: data.code || "",
                remark: data.remark || "",
                status: data.status || "ACTIVE",
            });

        }

    }, [data]);

    const handleChange = (e) => {

        const { name, value } = e.target;

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

    const handleSubmit = (e) => {

        e.preventDefault();

        const validationErrors = validateRequired(
            formData,
            [
                {
                    name: "category",
                    label: "Category Name",
                },
                {
                    name: "code",
                    label: "Category Code",
                },
            ]
        );

        setErrors(validationErrors);

        if (
            Object.keys(validationErrors).length > 0
        ) {
            return;
        }

        onSave(formData);

    };

    return (

        <div className="common-modal">

            <div className="common-modal-content">

                <div className="common-modal-header">

                    <h2>

                        {

                            data
                                ? "Edit Product Category"
                                : "Add Product Category"

                        }

                    </h2>

                    <CloseButton
                        onClick={onClose}
                    />

                </div>

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >

                    <div className="common-form-grid">

                        <div className="common-form-group">

                            <label>

                                Category Name *

                            </label>

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={
                                    errors.category
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {

                                errors.category && (

                                    <p className="error-text">

                                        {errors.category}

                                    </p>

                                )

                            }

                        </div>

                        <div className="common-form-group">

                            <label>

                                Category Code *

                            </label>

                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className={
                                    errors.code
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {

                                errors.code && (

                                    <p className="error-text">

                                        {errors.code}

                                    </p>

                                )

                            }

                        </div>

                <div className="common-form-group">
    <label>Status</label>

    <div className="status-radio-group">

        <label className="status-radio-label">
            <input
                type="radio"
                name="status"
                value="ACTIVE"
                checked={formData.status === "ACTIVE"}
                onChange={handleChange}
            />
            <span>Active</span>
        </label>

        <label className="status-radio-label">
            <input
                type="radio"
                name="status"
                value="INACTIVE"
                checked={formData.status === "INACTIVE"}
                onChange={handleChange}
            />
            <span>Inactive</span>
        </label>

    </div>
</div>

                        

                    </div>

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

export default ProductCategoryForm;