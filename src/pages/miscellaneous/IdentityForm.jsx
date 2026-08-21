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

const IdentityForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      identity: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {

      setFormData({
        identity: data.identity || "",
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
          name: "identity",
          label: "Identity",
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
                    {data ? "Edit Identity" : "Add Identity"}
                </h2>

                <CloseButton onClick={onClose} />

            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="common-form"
            >

                <div className="common-form-grid">

                    <div className="common-form-group">

                        <label>
                            Identity <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="identity"
                            value={formData.identity}
                            onChange={handleChange}
                            placeholder="Enter Identity"
                            className={
                                errors.identity
                                    ? "error-input"
                                    : ""
                            }
                        />

                        {errors.identity && (
                            <p className="error-text">
                                {errors.identity}
                            </p>
                        )}

                    </div>

                    <div className="common-form-group">

                        <label>
                            Status <span>*</span>
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

                </div>

                <div className="common-form-buttons">

                    <SaveButton type="submit" />

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

export default IdentityForm;