import React, { useEffect, useState } from "react";

import { validateRequired } from "../../utils/validation";

const initialFormData = {
  branch: "",
  distanceFromBranch: "",
  surveyDate: "",
  possibleCenter: "",
  areaName: "",
  mfiWorking: "",
  villageName: "",
  mfiName: "",
  populationOfVillages: "",
  majorOperationPeople: "",
  politicalSituation: "",
  roadStatus: "",
  lawAndOrderSituation: "",
  hinduReligionPercentage: "",
  muslimReligionPercentage: "",
  generalCastePercentage: "",
  sikhReligionPercentage: "",
  obcCastePercentage: "",
  christianReligionPercentage: "",
  scCastePercentage: "",
  stCastePercentage: "",
  otherReligionPercentage: "",
  otherCastePercentage: "",
  remark: "",
};

const AreaSummaryForm = ({
  area,
  onClose,
  onSave,
}) => {

  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] =
    useState({});

  /* =====================================================
     EDIT DATA
  ===================================================== */

  useEffect(() => {

    if (area) {

      setFormData({
        branch: area.branch || "",
        distanceFromBranch:
          area.distanceFromBranch || "",
        surveyDate:
          area.surveyDate || "",
        possibleCenter:
          area.possibleCenter || "",
        areaName:
          area.areaName || "",
        mfiWorking:
          area.mfiWorking || "",
        villageName:
          area.villageName || "",
        mfiName:
          area.mfiName || "",
        populationOfVillages:
          area.populationOfVillages || "",
        majorOperationPeople:
          area.majorOperationPeople || "",
        politicalSituation:
          area.politicalSituation || "",
        roadStatus:
          area.roadStatus || "",
        lawAndOrderSituation:
          area.lawAndOrderSituation || "",
        hinduReligionPercentage:
          area.hinduReligionPercentage || "",
        muslimReligionPercentage:
          area.muslimReligionPercentage || "",
        generalCastePercentage:
          area.generalCastePercentage || "",
        sikhReligionPercentage:
          area.sikhReligionPercentage || "",
        obcCastePercentage:
          area.obcCastePercentage || "",
        christianReligionPercentage:
          area.christianReligionPercentage || "",
        scCastePercentage:
          area.scCastePercentage || "",
        stCastePercentage:
          area.stCastePercentage || "",
        otherReligionPercentage:
          area.otherReligionPercentage || "",
        otherCastePercentage:
          area.otherCastePercentage || "",
        remark:
          area.remark || "",
      });

    } else {

      setFormData(initialFormData);

    }

    setErrors({});

  }, [area]);


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

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


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    const requiredFields = [

      {
        name: "branch",
        label: "Branch",
      },

      {
        name: "distanceFromBranch",
        label: "Distance From Branch",
      },

      {
        name: "surveyDate",
        label: "Survey Date",
      },

      {
        name: "possibleCenter",
        label: "Possible Center",
      },

      {
        name: "areaName",
        label: "Area Name",
      },

      {
        name: "mfiWorking",
        label: "MFI Working",
      },

      {
        name: "villageName",
        label: "Village Name",
      },

      {
        name: "mfiName",
        label: "MFI Name",
      },

      {
        name: "populationOfVillages",
        label: "Population Of Villages",
      },

      {
        name: "majorOperationPeople",
        label: "Major Operation People",
      },

      {
        name: "politicalSituation",
        label: "Political Situation",
      },

      {
        name: "roadStatus",
        label: "Road Status",
      },

      {
        name: "lawAndOrderSituation",
        label: "Law And Order Situation",
      },

      {
        name: "hinduReligionPercentage",
        label: "Hindu Religion Percentage",
      },

      {
        name: "muslimReligionPercentage",
        label: "Muslim Religion Percentage",
      },

      {
        name: "generalCastePercentage",
        label: "General Caste Percentage",
      },

      {
        name: "sikhReligionPercentage",
        label: "Sikh Religion Percentage",
      },

      {
        name: "obcCastePercentage",
        label: "OBC Caste Percentage",
      },

      {
        name: "christianReligionPercentage",
        label: "Christian Religion Percentage",
      },

      {
        name: "scCastePercentage",
        label: "SC Caste Percentage",
      },

      {
        name: "stCastePercentage",
        label: "ST Caste Percentage",
      },

      {
        name: "otherReligionPercentage",
        label: "Other Religion Percentage",
      },

      {
        name: "otherCastePercentage",
        label: "Other Caste Percentage",
      },

    ];

    const validationErrors =
      validateRequired(
        formData,
        requiredFields
      );

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    onSave(formData);
  };


  /* =====================================================
     FIELD
  ===================================================== */

  const renderInput = ({
    name,
    label,
    type = "text",
    required = true,
    placeholder = "",
  }) => {

    return (
      <div className="area-summary-form-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>

        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={
            errors[name]
              ? "area-summary-input error"
              : "area-summary-input"
          }
        />

        {errors[name] && (
          <span className="area-summary-error">
            {errors[name]}
          </span>
        )}

      </div>
    );
  };


  /* =====================================================
     SELECT
  ===================================================== */

  const renderSelect = ({
    name,
    label,
    options,
    required = true,
  }) => {

    return (
      <div className="area-summary-form-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>

        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={
            errors[name]
              ? "area-summary-input error"
              : "area-summary-input"
          }
        >

          <option value="">
            Select {label}
          </option>

          {options.map((option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          ))}

        </select>

        {errors[name] && (
          <span className="area-summary-error">
            {errors[name]}
          </span>
        )}

      </div>
    );
  };


  return (
    <div className="area-summary-modal-overlay">

      <div className="area-summary-form-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="area-summary-modal-header">

          <h2>
            {area
              ? "EDIT AREA SURVEY"
              : "ADD NEW"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="area-summary-modal-close"
          >
            ×
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="area-summary-form"
        >

          <div className="area-summary-form-grid">

            {renderSelect({
              name: "branch",
              label: "Branch",
              options: [
                "KOLKATA - DALHOUSIE",
                "JAGATAPURA",
                "LASKARHAT",
                "SHREEJA GROUP",
                "RAM CAPITAL TRUST",
              ],
            })}


            {renderInput({
              name: "distanceFromBranch",
              label: "Distance From Branch",
            })}


            {renderInput({
              name: "surveyDate",
              label: "Survey Date",
              type: "date",
            })}


            {renderSelect({
              name: "possibleCenter",
              label: "Possible Center",
              options: [
                "YES",
                "NO",
              ],
            })}


            {renderInput({
              name: "areaName",
              label: "Area Name",
            })}


            {renderSelect({
              name: "mfiWorking",
              label: "MFI Working",
              options: [
                "YES",
                "NO",
              ],
            })}


            {renderInput({
              name: "villageName",
              label: "Village Name",
            })}


            {renderInput({
              name: "mfiName",
              label: "MFI Name",
              placeholder: "Micro Finance Name",
            })}


            {renderInput({
              name: "populationOfVillages",
              label: "Population Of Villages",
            })}


            {renderInput({
              name: "majorOperationPeople",
              label: "Major Operation People",
            })}


            {renderInput({
              name: "politicalSituation",
              label: "Political Situation",
            })}


            {renderInput({
              name: "roadStatus",
              label: "Road Status",
            })}


            {renderInput({
              name: "lawAndOrderSituation",
              label: "Law And Order Situation",
            })}


            {renderInput({
              name: "hinduReligionPercentage",
              label: "Hindu Religion Percentage",
            })}


            {renderInput({
              name: "generalCastePercentage",
              label: "General Caste Percentage",
            })}


            {renderInput({
              name: "muslimReligionPercentage",
              label: "Muslim Religion Percentage",
            })}


            {renderInput({
              name: "sikhReligionPercentage",
              label: "Sikh Religion Percentage",
            })}


            {renderInput({
              name: "obcCastePercentage",
              label: "OBC Caste Percentage",
            })}


            {renderInput({
              name: "christianReligionPercentage",
              label: "Christian Religion Percentage",
            })}


            {renderInput({
              name: "scCastePercentage",
              label: "SC Caste Percentage",
            })}


            {renderInput({
              name: "stCastePercentage",
              label: "ST Caste Percentage",
            })}


            {renderInput({
              name: "otherReligionPercentage",
              label: "Other Religion Percentage",
            })}


            {renderInput({
              name: "otherCastePercentage",
              label: "Other Caste Percentage",
            })}


            {renderInput({
              name: "remark",
              label: "Remark",
              required: false,
            })}

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="area-summary-form-actions">

            <button
              type="submit"
              className="area-summary-save-button"
            >
              {area ? "UPDATE" : "SAVE"}
            </button>

            <button
              type="button"
              className="area-summary-cancel-button"
              onClick={onClose}
            >
              CANCEL
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AreaSummaryForm;