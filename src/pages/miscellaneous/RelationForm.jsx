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

const RelationForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      relation: "",
      remark: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {

      setFormData({
        relation: data.relation || "",
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
          name: "relation",
          label: "Relation",
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
                    {data ? "Edit Relation" : "Add Relation"}
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
                            Relation <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="relation"
                            placeholder="Enter Relation"
                            value={formData.relation}
                            onChange={handleChange}
                            className={
                                errors.relation
                                    ? "error-input"
                                    : ""
                            }
                        />

                        {errors.relation && (
                            <p className="error-text">
                                {errors.relation}
                            </p>
                        )}

                    </div>

                    <div className="common-form-group">

                        <label>
                            Remark
                        </label>

                        <textarea
                            name="remark"
                            rows="3"
                            placeholder="Enter Remark"
                            value={formData.remark}
                            onChange={handleChange}
                        />

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

export default RelationForm;