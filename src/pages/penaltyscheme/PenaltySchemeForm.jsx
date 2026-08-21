import React, {
  useEffect,
  useState,
} from "react";

import "./PenaltyScheme.css";

import { validateRequired,} from "../../utils/validation";
 


import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";


const PenaltySchemeForm = ({
  onClose,
  onSave,
  editData,
}) => {


 
  // DEFAULT FORM
 

  const defaultFormData = {

    schemeName: "",

    penaltyType: "FIXED",

    amount: "",

    minimumAmount: "",

    gracePeriod: "",

    penaltyMode: "ONE TIME",

    recurring: "NO",

    status: "ACTIVE",

  };


 
  // FORM STATE
 

  const [formData, setFormData] = useState(defaultFormData );

  // ERRORS
  const [errors, setErrors] = useState({});

  // EDIT DATA → FORM
 

  useEffect(() => {

    if (editData) {

      console.log(
        "Loading Edit Data:",
        editData
      );


      setFormData({

        schemeName:
          editData.schemeName ?? "",

        penaltyType:
          editData.penaltyType ?? "FIXED",

        amount:
          editData.amount ?? "",

        minimumAmount:
          editData.minimumAmount ?? "",

        gracePeriod:
          editData.gracePeriod ?? "",

        penaltyMode:
          editData.penaltyMode ?? "ONE TIME",

        recurring:
          editData.recurring ?? "NO",

        status:
          editData.status ?? "ACTIVE",

      });

    }

    else {

      // Empty form for Add
      setFormData(
        defaultFormData
      );

    }


    // Clear validation errors
    setErrors({});

  }, [editData]);


 
  // HANDLE CHANGE
 

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


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


 
  // SUBMIT
 

  const handleSubmit = (e) => {

    e.preventDefault();


    const validation =
      validateRequired(

        formData,

        [

          {
            name: "schemeName",
            label:
              "Penalty Scheme Name",
          },

          {
            name: "gracePeriod",
            label:
              "Grace Period",
          },

          {
            name: "amount",
            label:
              "Amount / Percentage",
          },

          {
            name: "minimumAmount",
            label:
              "Minimum Due Amount",
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


 
  // JSX
 

  return (

    <div className="penalty-modal">

      <div className="penalty-modal-content">


        {/* HEADER */}

        <div className="penalty-modal-header">

          <h2>

            {editData
              ? "Edit Penalty Scheme"
              : "Add New Penalty Scheme"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* FORM  */}

        <form
          onSubmit={handleSubmit}
          className="penalty-form"
        >


          {/*  SCHEME NAME */}

          <div className="penalty-form-group">

            <label> Penalty Scheme Name * </label>

            <input

              type="text"

              name="schemeName"

              value={
                formData.schemeName
              }

              onChange={
                handleChange
              }

              className={
                errors.schemeName
                  ? "error-input"
                  : ""
              }

            />


            {errors.schemeName && (

              <p className="error-text">

                {errors.schemeName}

              </p>

            )}

          </div>


          {/* GRACE PERIOD*/}
              
           

          <div className="penalty-form-group">

            <label>
              Grace Period (Days) *
            </label>


            <input

              type="number"

              name="gracePeriod"

              value={
                formData.gracePeriod
              }

              onChange={
                handleChange
              }

              className={
                errors.gracePeriod
                  ? "error-input"
                  : ""
              }

            />


            {errors.gracePeriod && (

              <p className="error-text">

                {errors.gracePeriod}

              </p>

            )}

          </div>


          {/*  PENALTY TYPE */}
             
          

          <div className="penalty-form-group">

            <label>
              Penalty Type *
            </label>


            <div className="radio-group">


              <label>

                <input

                  type="radio"

                  name="penaltyType"

                  value="FIXED"

                  checked={
                    formData.penaltyType ===
                    "FIXED"
                  }

                  onChange={
                    handleChange
                  }

                />

                Fixed

              </label>


              <label>

                <input

                  type="radio"

                  name="penaltyType"

                  value="PERCENTAGE"

                  checked={
                    formData.penaltyType ===
                    "PERCENTAGE"
                  }

                  onChange={
                    handleChange
                  }

                />

                Percentage

              </label>


            </div>

          </div>


          {/* PENALTY MODE*/}
              
           

          <div className="penalty-form-group">

            <label>
              Penalty Mode *
            </label>


            <div className="radio-group">


              <label>

                <input

                  type="radio"

                  name="penaltyMode"

                  value="ONE TIME"

                  checked={
                    formData.penaltyMode ===
                    "ONE TIME"
                  }

                  onChange={
                    handleChange
                  }

                />

                One Time

              </label>


              <label>

                <input

                  type="radio"

                  name="penaltyMode"

                  value="DAILY"

                  checked={
                    formData.penaltyMode ===
                    "DAILY"
                  }

                  onChange={
                    handleChange
                  }

                />

                Daily

              </label>


            </div>

          </div>


          {/* AMOUNT*/}
              
           

          <div className="penalty-form-group">

            <label>
              Amount / Percentage *
            </label>


            <input

              type="number"

              name="amount"

              value={
                formData.amount
              }

              onChange={
                handleChange
              }

              className={
                errors.amount
                  ? "error-input"
                  : ""
              }

            />


            {errors.amount && (

              <p className="error-text">

                {errors.amount}

              </p>

            )}

          </div>


          {/* MINIMUM AMOUNT */}
              
          

          <div className="penalty-form-group">

            <label>
              Minimum Due Amount *
            </label>


            <input

              type="number"

              name="minimumAmount"

              value={
                formData.minimumAmount
              }

              onChange={
                handleChange
              }

              className={
                errors.minimumAmount
                  ? "error-input"
                  : ""
              }

            />


            {errors.minimumAmount && (

              <p className="error-text">

                {errors.minimumAmount}

              </p>

            )}

          </div>


          {/*  RECURRING */}
             
          

          <div className="penalty-form-group">

            <label>
              Is Recurring *
            </label>


            <div className="radio-group">


              <label>

                <input

                  type="radio"

                  name="recurring"

                  value="YES"

                  checked={
                    formData.recurring ===
                    "YES"
                  }

                  onChange={
                    handleChange
                  }

                />

                Yes

              </label>


              <label>

                <input

                  type="radio"

                  name="recurring"

                  value="NO"

                  checked={
                    formData.recurring ===
                    "NO"
                  }

                  onChange={
                    handleChange
                  }

                />

                No

              </label>


            </div>

          </div>


          {/* 
              STATUS
           */}

          <div className="penalty-form-group">

            <label>
              Status
            </label>


            <select

              name="status"

              value={
                formData.status
              }

              onChange={
                handleChange
              }

            >

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>

            </select>

          </div>


          {/* BUTTONS */}
             
           

          <div className="penalty-form-buttons">

            <SaveButton
              type="submit"
            />


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


export default PenaltySchemeForm;