import React, { useState } from "react";

import "./StaffBranches.css";

// ================= Validation =================

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

const StaffBranchesForm = ({
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({

    branch: "",

    employeeCode: "",

    employeeName: "",

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

    setErrors((prev) => ({

      ...prev,

      [name]: "",

    }));

  };

  // ================= Handle Staff Change =================

  const handleStaffChange = (e) => {

    const value = e.target.value;

    if (value === "SHAIBAL GHOSE") {

      setFormData((prev) => ({

        ...prev,

        employeeName: "SHAIBAL GHOSE",

        employeeCode: "EMP01011",

      }));

    }

    else if (value === "GOURAV DEY") {

      setFormData((prev) => ({

        ...prev,

        employeeName: "GOURAV DEY",

        employeeCode: "EMP01013",

      }));

    }

    else {

      setFormData((prev) => ({

        ...prev,

        employeeName: "",

        employeeCode: "",

      }));

    }

    // Clear Staff error

    setErrors((prev) => ({

      ...prev,

      employeeName: "",

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
          name: "employeeName",
          label: "Staff",
        },

        {
          name: "remark",
          label: "Remark",
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

    <div className="staff-modal">

      <div className="staff-modal-content">

        {/* =========================
              HEADER
        ========================= */}

        <div className="staff-modal-header">

          <h2>Add New</h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        <form
          className="staff-form"
          onSubmit={handleSubmit}
        >
          {/* ================= Branch Name ================= */}

          <div className="staff-form-group">

            <label>
              Branch Name *
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

          {/* ================= Staff ID ================= */}

          <div className="staff-form-group">

            <label>
              Staff ID *
            </label>

            <select
              value={formData.employeeName}
              onChange={handleStaffChange}
              className={errors.employeeName ? "error-input" : ""}
            >

              <option value="">
                Select Staff
              </option>

              <option value="SHAIBAL GHOSE">
                SHAIBAL GHOSE (EMP01011)
              </option>

              <option value="GOURAV DEY">
                GOURAV DEY (EMP01013)
              </option>

            </select>

            {errors.employeeName && (
              <p className="error-text">
                {errors.employeeName}
              </p>
            )}

          </div>

          {/* ================= Remark ================= */}

          <div className="staff-form-group">

            <label>
              Remark *
            </label>

            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className={errors.remark ? "error-input" : ""}
            />

            {errors.remark && (
              <p className="error-text">
                {errors.remark}
              </p>
            )}

          </div>

          {/* ================= Status ================= */}

          <div className="staff-form-group">

            <label>
              Status *
            </label>

            <div className="radio-group">

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

          {/* ================= Buttons ================= */}

          <div className="staff-form-buttons">

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

export default StaffBranchesForm;