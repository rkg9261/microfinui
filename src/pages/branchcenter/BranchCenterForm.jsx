import React, { useState } from "react";

import "./BranchCenter.css";

// Validation
import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

const BranchCenterForm = ({
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({

    branch: "",

    name: "",

    description: "",

    remark: "",

    status: "ACTIVE",

  });

  // ================= Validation =================

  const [errors, setErrors] = useState({});

  // ================= Handle Change =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

    // Remove error while typing

    setErrors((prev) => ({

      ...prev,

      [name]: "",

    }));

  };

  // ================= Handle Submit =================

  const handleSubmit = (e) => {

    e.preventDefault();

    const validation = validateRequired(

      formData,

      [

        {
          name: "branch",
          label: "Branch Name",
        },

        {
          name: "name",
          label: "Center Name",
        },

      ]

    );

    if (Object.keys(validation).length > 0) {

      setErrors(validation);

      return;

    }

    setErrors({});

    onSave(formData);

  };

  return (

    <div className="branch-center-modal">

      <div className="branch-center-modal-content">

        {/* ================= HEADER ================= */}

        <div className="branch-center-modal-header">

          <h2>ADD NEW</h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        {/* ================= FORM ================= */}

        <form
          className="branch-center-form"
          onSubmit={handleSubmit}
        >
          <div className="branch-center-form-grid">

            {/* ================= Branch ================= */}

            <div className="branch-center-form-group">

              <label>
                Branch Name <span>*</span>
              </label>

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={errors.branch ? "error-input" : ""}
              >
                <option value="">
                  Select Company Branch
                </option>

                <option value="LASKARHAT">
                  LASKARHAT
                </option>

                <option value="JAGATPURA">
                  JAGATPURA
                </option>

              </select>

              {errors.branch && (
                <p className="error-text">
                  {errors.branch}
                </p>
              )}

            </div>

            {/* ================= Remark ================= */}

            <div className="branch-center-form-group">

              <label>
                Remark
              </label>

              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />

            </div>

            {/* ================= Center Name ================= */}

            <div className="branch-center-form-group">

              <label>
                Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error-input" : ""}
              />

              {errors.name && (
                <p className="error-text">
                  {errors.name}
                </p>
              )}

            </div>

            {/* ================= Description ================= */}

            <div className="branch-center-form-group">

              <label>
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            {/* ================= Status ================= */}

            <div className="branch-center-form-group">

              <label>
                Status
              </label>

              <div className="branch-center-radio-group">

                <label>

                  <input
                    type="radio"
                    name="status"
                    value="ACTIVE"
                    checked={formData.status === "ACTIVE"}
                    onChange={handleChange}
                  />

                  Active

                </label>

                <label>

                  <input
                    type="radio"
                    name="status"
                    value="INACTIVE"
                    checked={formData.status === "INACTIVE"}
                    onChange={handleChange}
                  />

                  Inactive

                </label>

              </div>

            </div>

          </div>

          {/* ================= Buttons ================= */}

          <div className="branch-center-form-buttons">

            <SaveButton
              text="Save"
              type="submit"
            />

            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
            />

          </div>

        </form>

      </div>

    </div>

  );

};

export default BranchCenterForm;