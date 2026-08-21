import React, {
  useEffect,
  useState,
} from "react";

import "../../components/common/CommonForm.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

import {
  validateRequired,
} from "../../utils/validation";

import "../../utils/validation.css";

const DesignationForm = ({
  data,
  onSave,
  onClose,
}) => {

  const initialForm = {

    name: "",

    status: "ACTIVE",

  };

  const [formData, setFormData] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {

      setFormData({

        ...initialForm,

        ...data,

      });

    } else {

      setFormData(initialForm);

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

    const validation = validateRequired(

      formData,

      [

        {

          name: "name",

          label: "Designation Name",

        },

        {

          name: "status",

          label: "Status",

        },

      ]

    );

    if (
      Object.keys(validation).length > 0
    ) {

      setErrors(validation);

      return;

    }

    setErrors({});

    onSave(formData);

  };

  return (

    <div className="common-modal">

      <div className="common-modal-content">

        {/* ================= Header ================= */}

        <div className="common-modal-header">

          <h2>

            {

              data

                ? "Edit Designation"

                : "Add New Designation"

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

            {/* ================= Designation Name ================= */}

            <div className="common-form-group">

              <label>
                Designation Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Designation Name"
                value={formData.name}
                onChange={handleChange}
                className={
                  errors.name
                    ? "error-input"
                    : ""
                }
              />

              {errors.name && (

                <p className="error-text">

                  {errors.name}

                </p>

              )}

            </div>

            {/* ================= Status ================= */}

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

          </div>

          {/* ================= Buttons ================= */}

          <div className="common-form-buttons">

            <SaveButton
              text={
                data
                  ? "Update Designation"
                  : "Save Designation"
              }
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

export default DesignationForm;