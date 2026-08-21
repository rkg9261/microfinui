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

const StateForm = ({
  data,
  onSave,
  onClose,
}) => {

  const initialForm = {

    name: "",

    shortName: "",

    stateCode: "",

    status: "ACTIVE",

  };

  // add state api
  


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

    const validation =
      validateRequired(

        formData,

        [

          {
            name: "name",
            label: "State Name",
          },

          {
            name: "shortName",
            label: "Short Name",
          },

          {
            name: "stateCode",
            label: "State Code",
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

            {data
              ? "Edit State"
              : "Add New State"}

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

            {/* ================= Name ================= */}

            <div className="common-form-group">

              <label>
                Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter State Name"
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

            {/* ================= State Code ================= */}

            <div className="common-form-group">

              <label>
                State Code <span>*</span>
              </label>

              <input
                type="text"
                name="stateCode"
                value={formData.stateCode}
                onChange={handleChange}
                placeholder="Enter State Code"
                className={
                  errors.stateCode
                    ? "error-input"
                    : ""
                }
              />

              {errors.stateCode && (

                <p className="error-text">

                  {errors.stateCode}

                </p>

              )}

            </div>

            {/* ================= Short Name ================= */}

            <div className="common-form-group">

              <label>
                Short Name <span>*</span>
              </label>

              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                placeholder="Enter Short Name"
                className={
                  errors.shortName
                    ? "error-input"
                    : ""
                }
              />

              {errors.shortName && (

                <p className="error-text">

                  {errors.shortName}

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
                  ? "Update"
                  : "Save"
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

export default StateForm;