import React, {
  useEffect,
  useState,
} from "react";

import "./Group.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

import {
  validateRequired,
} from "../../utils/validation";

import "../../utils/validation.css";

const GroupForm = ({
  data,
  onSave,
  onClose,
}) => {

  const initialForm = {

    branch: "",

    groupName: "",

    city: "",

    collectionTime: "",

    address: "",

    collectionDay: "",

    centerLeader: "",

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

  const handleReset = () => {

    setFormData(initialForm);

    setErrors({});

  };

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
          name: "groupName",
          label: "Group Name",
        },

        {
          name: "city",
          label: "City / Village Name",
        },

        {
          name: "collectionTime",
          label: "Collection Time",
        },

        {
          name: "address",
          label: "Address",
        },

        {
          name: "collectionDay",
          label: "Collection Day",
        },

        {
          name: "centerLeader",
          label: "Center Leader",
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

    <div className="group-modal">

      <div className="group-modal-content">

        <div className="group-modal-header">

          <h2>

            {data
              ? "Edit Group"
              : "Add New Group"}

          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        <form
          className="group-form"
          onSubmit={handleSubmit}
        >

          <div className="group-form-grid">

      {/* ================= Left Column ================= */}

            <div className="group-form-group">

              <label>
                Branch Name <span>*</span>
              </label>

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={
                  errors.branch ? "error-input" : ""
                }
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

            <div className="group-form-group">

              <label>
                City / Village Name <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City / Village"
                className={
                  errors.city ? "error-input" : ""
                }
              />

              {errors.city && (

                <p className="error-text">
                  {errors.city}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Group Name <span>*</span>
              </label>

              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                placeholder="Enter Group Name"
                className={
                  errors.groupName
                    ? "error-input"
                    : ""
                }
              />

              {errors.groupName && (

                <p className="error-text">
                  {errors.groupName}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Collection Time <span>*</span>
              </label>

              <input
                type="time"
                name="collectionTime"
                value={formData.collectionTime}
                onChange={handleChange}
                className={
                  errors.collectionTime
                    ? "error-input"
                    : ""
                }
              />

              {errors.collectionTime && (

                <p className="error-text">
                  {errors.collectionTime}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Address <span>*</span>
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className={
                  errors.address
                    ? "error-input"
                    : ""
                }
              />

              {errors.address && (

                <p className="error-text">
                  {errors.address}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Collection Day <span>*</span>
              </label>

              <select
                name="collectionDay"
                value={formData.collectionDay}
                onChange={handleChange}
                className={
                  errors.collectionDay
                    ? "error-input"
                    : ""
                }
              >

                <option value="">
                  Select Collection Day
                </option>

                <option value="MONDAY">
                  Monday
                </option>

                <option value="TUESDAY">
                  Tuesday
                </option>

                <option value="WEDNESDAY">
                  Wednesday
                </option>

                <option value="THURSDAY">
                  Thursday
                </option>

                <option value="FRIDAY">
                  Friday
                </option>

                <option value="SATURDAY">
                  Saturday
                </option>

                <option value="SUNDAY">
                  Sunday
                </option>

              </select>

              {errors.collectionDay && (

                <p className="error-text">
                  {errors.collectionDay}
                </p>

              )}

            </div>



       {/* ================= Center Leader ================= */}

            <div className="group-form-group">

              <label>
                Center Leader (Type Here) <span>*</span>
              </label>

              <input
                type="text"
                name="centerLeader"
                value={formData.centerLeader}
                onChange={handleChange}
                placeholder="Enter Center Leader"
                className={
                  errors.centerLeader
                    ? "error-input"
                    : ""
                }
              />

              {errors.centerLeader && (

                <p className="error-text">
                  {errors.centerLeader}
                </p>

              )}

            </div>

            {/* ================= Group Status ================= */}

            <div className="group-form-group">

              <label>
                Group Status
              </label>

              <div className="radio-group">

                <label className="radio-item">

                  <input
                    type="radio"
                    name="status"
                    value="ACTIVE"
                    checked={
                      formData.status ===
                      "ACTIVE"
                    }
                    onChange={handleChange}
                  />

                  Active

                </label>

                <label className="radio-item">

                  <input
                    type="radio"
                    name="status"
                    value="INACTIVE"
                    checked={
                      formData.status ===
                      "INACTIVE"
                    }
                    onChange={handleChange}
                  />

                  Inactive

                </label>

              </div>

            </div>

          </div>

          {/* ================= Buttons ================= */}

          <div className="group-form-buttons">

            <SaveButton
              text={
                data
                  ? "Update Group"
                  : "Save Group"
              }
              type="submit"
            />

            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
            />

            <button
              type="button"
              className="btn btn-reset"
              onClick={handleReset}
            >

              Reset

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default GroupForm;