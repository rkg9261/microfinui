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

const ReasonForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      reason: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {

      setFormData({
        reason: data.reason || "",
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
          name: "reason",
          label: "Reason",
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
                    {data ? "Edit Reason" : "Add Reason"}
                </h2>

                <CloseButton onClick={onClose} />

            </div>

            {/* Form */}

            <form
                className="common-form"
                onSubmit={handleSubmit}
            >

                <div className="common-form-grid">

                    <div className="common-form-group">

                        <label>
                            Reason <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="reason"
                            placeholder="Enter Reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className={
                                errors.reason
                                    ? "error-input"
                                    : ""
                            }
                        />

                        {errors.reason && (
                            <p className="error-text">
                                {errors.reason}
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

export default ReasonForm;