import React, { useState } from "react";

import "./Branches.css";

// ================= Validation =================

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

const BranchesForm = ({
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({

    branchName: "",

    pincode: "",

    openingDate: "",

    contactEmail: "",

    address: "",

    contactNumber: "",

    city: "",

    landlineNumber: "",

    state: "",

    gstinNumber: "",

    country: "India",

    status: "ACTIVE",

  });

  // ================= Validation State =================

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
          name: "branchName",
          label: "Branch Name",
        },

        {
          name: "pincode",
          label: "Pincode",
        },

        {
          name: "openingDate",
          label: "Opening Date",
        },

        {
          name: "contactEmail",
          label: "Contact Email",
        },

        {
          name: "contactNumber",
          label: "Contact Number",
        },

        {
          name: "city",
          label: "City",
        },

        {
          name: "state",
          label: "State",
        },

      ]

    );

    if (Object.keys(validation).length > 0) {

      setErrors(validation);

      return;

    }

    setErrors({});

    onSave({

      ...formData,

      code: "BR-" + Date.now(),

      phone: formData.contactNumber,

      openingDate: formData.openingDate,

    });

  };

  return (

    <div className="branches-modal">

      <div className="branches-modal-content">

        {/* ===========================
                HEADER
        =========================== */}

        <div className="branches-modal-header">

          <h2>Add New Branch</h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        <form
          className="branches-form"
          onSubmit={handleSubmit}
        >

          {/* ================= Branch Name ================= */}

          <div className="branches-form-group">

            <label>
              Branch Name *
            </label>

            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className={errors.branchName ? "error-input" : ""}
            />

            {errors.branchName && (
              <p className="error-text">
                {errors.branchName}
              </p>
            )}

          </div>

          {/* ================= Pincode ================= */}

          <div className="branches-form-group">

            <label>
              Pincode *
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={errors.pincode ? "error-input" : ""}
            />

            {errors.pincode && (
              <p className="error-text">
                {errors.pincode}
              </p>
            )}

          </div>

          {/* ================= Opening Date ================= */}

          <div className="branches-form-group">

            <label>
              Opening Date *
            </label>

            <input
              type="date"
              name="openingDate"
              value={formData.openingDate}
              onChange={handleChange}
              className={errors.openingDate ? "error-input" : ""}
            />

            {errors.openingDate && (
              <p className="error-text">
                {errors.openingDate}
              </p>
            )}

          </div>

          {/* ================= Contact Email ================= */}

          <div className="branches-form-group">

            <label>
              Contact Email *
            </label>

            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={errors.contactEmail ? "error-input" : ""}
            />

            {errors.contactEmail && (
              <p className="error-text">
                {errors.contactEmail}
              </p>
            )}

          </div>

          {/* ================= Address ================= */}

          <div className="branches-form-group">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>

          {/* ================= Contact Number ================= */}

          <div className="branches-form-group">

            <label>
              Contact Number *
            </label>

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? "error-input" : ""}
            />

            {errors.contactNumber && (
              <p className="error-text">
                {errors.contactNumber}
              </p>
            )}

          </div>

          {/* ================= City ================= */}

          <div className="branches-form-group">

            <label>
              City *
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "error-input" : ""}
            />

            {errors.city && (
              <p className="error-text">
                {errors.city}
              </p>
            )}

          </div>

          {/* ================= Landline Number ================= */}

          <div className="branches-form-group">

            <label>
              Landline Number
            </label>

            <input
              type="text"
              name="landlineNumber"
              value={formData.landlineNumber}
              onChange={handleChange}
            />

          </div>

          {/* ================= State ================= */}

          <div className="branches-form-group">

            <label>
              Select State *
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? "error-input" : ""}
            >

              <option value="">
                Select State
              </option>

              <option value="ANDHRA PRADESH">
                Andhra Pradesh
              </option>

              <option value="ASSAM">
                Assam
              </option>

              <option value="BIHAR">
                Bihar
              </option>

              <option value="DELHI">
                Delhi
              </option>

              <option value="GUJARAT">
                Gujarat
              </option>

              <option value="KARNATAKA">
                Karnataka
              </option>

              <option value="MAHARASHTRA">
                Maharashtra
              </option>

              <option value="MADHYA PRADESH">
                Madhya Pradesh
              </option>

              <option value="RAJASTHAN">
                Rajasthan
              </option>

              <option value="TAMIL NADU">
                Tamil Nadu
              </option>

              <option value="UTTAR PRADESH">
                Uttar Pradesh
              </option>

              <option value="WEST BENGAL">
                West Bengal
              </option>

            </select>

            {errors.state && (
              <p className="error-text">
                {errors.state}
              </p>
            )}

          </div>

          {/* ================= GSTIN ================= */}

          <div className="branches-form-group">

            <label>
              GSTIN Number
            </label>

            <input
              type="text"
              name="gstinNumber"
              value={formData.gstinNumber}
              onChange={handleChange}
            />

          </div>

          {/* ================= Country ================= */}

          <div className="branches-form-group">

            <label>
              Country *
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              readOnly
            />

          </div>

          {/* ================= Status ================= */}

          <div className="branches-form-group">

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

          <div className="branches-form-buttons">

            <SaveButton
              text="Save Branch"
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

export default BranchesForm;