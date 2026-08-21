import React, { useEffect, useState } from "react";

import "./LoanPlan.css";

import {
  validateRequired,
} from "../../utils/validation";

import "../../utils/validation.css";

import {
  CloseButton,
  SaveButton,
  CalculateEmiButton,
  CancelButton,
} from "../../components/buttons";

import {
  createLoanPlan,
  updateLoanPlan,
} from "../../api/loanPlanApi";


const LoanPlanForm = ({
  onClose,
  onSaveSuccess,
  initialData,
}) => {

  // =========================================================
  // DEFAULT FORM DATA
  // EXACT SAME NAMES AS ASP.NET API MODEL
  // =========================================================

  const defaultFormData = {

    id: 0,

    loanType: "",

    planName: "",

    planAmount: "",

    paidAmount: "",

    numberOfEmi: "",

    recoveryType: "",

    holidayExclude: false,

    gstChargeInclude: false,

    fileChargeInclude: false,

    fileCharge: "",

    processingFeeChargeInclude: false,

    processingFeePercentage: "",

    processingFeeAmount: "",

    insuranceFeeChargeInclude: false,

    insuranceFeeType: "",

    insuranceFeeAmount: "",

    status: "Active",

    createdAt: null,

    updatedAt: null,
  };


  // =========================================================
  // STATE
  // =========================================================

  const [formData, setFormData] = useState(
    defaultFormData
  );

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);


  // =========================================================
  // EDIT MODE
  // =========================================================

  const isEditMode = Boolean(
    initialData?.id
  );


  // =========================================================
  // LOAD EXISTING DATA
  // =========================================================

  useEffect(() => {

    if (!initialData) {

      setFormData({
        ...defaultFormData,
      });

      setErrors({});

      return;
    }


    console.log(
      "======================================"
    );

    console.log(
      "EDIT LOAN PLAN DATA FROM API"
    );

    console.log(
      initialData
    );

    console.log(
      "======================================"
    );


    // =======================================================
    // DIRECT API DATA → FORM DATA
    // SAME PROPERTY NAMES
    // =======================================================

    setFormData({

      id:
        initialData.id ?? 0,

      loanType:
        initialData.loanType ?? "",

      planName:
        initialData.planName ?? "",

      planAmount:
        initialData.planAmount ?? "",

      paidAmount:
        initialData.paidAmount ?? "",

      numberOfEmi:
        initialData.numberOfEmi ?? "",

      recoveryType:
        initialData.recoveryType ?? "",

      holidayExclude:
        initialData.holidayExclude ?? false,

      gstChargeInclude:
        initialData.gstChargeInclude ?? false,

      fileChargeInclude:
        initialData.fileChargeInclude ?? false,

      fileCharge:
        initialData.fileCharge ?? "",

      processingFeeChargeInclude:
        initialData.processingFeeChargeInclude ?? false,

      processingFeePercentage:
        initialData.processingFeePercentage ?? "",

      processingFeeAmount:
        initialData.processingFeeAmount ?? "",

      insuranceFeeChargeInclude:
        initialData.insuranceFeeChargeInclude ?? false,

      insuranceFeeType:
        initialData.insuranceFeeType ?? "",

      insuranceFeeAmount:
        initialData.insuranceFeeAmount ?? "",

      status:
        initialData.status ?? "Active",

      createdAt:
        initialData.createdAt ?? null,

      updatedAt:
        initialData.updatedAt ?? null,

    });


    setErrors({});

  }, [initialData]);


  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));


    setErrors((prev) => ({
      ...prev,

      [name]: "",
    }));

  };


  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {

    const validation = validateRequired(
      formData,
      [

        {
          name: "loanType",
          label: "Loan Type",
        },

        {
          name: "planName",
          label: "Plan Name",
        },

        {
          name: "planAmount",
          label: "Plan Amount",
        },

        {
          name: "paidAmount",
          label: "Paid Amount",
        },

        {
          name: "numberOfEmi",
          label: "Number Of EMI",
        },

        {
          name: "recoveryType",
          label: "Recovery Type",
        },

        {
          name: "fileCharge",
          label: "File Charge",
        },

        {
          name: "processingFeePercentage",
          label: "Processing Fee (%)",
        },

        {
          name: "processingFeeAmount",
          label: "Processing Fee Amount",
        },

        {
          name: "insuranceFeeType",
          label: "Insurance Type",
        },

        {
          name: "insuranceFeeAmount",
          label: "Insurance Amount",
        },

      ]
    );


    setErrors(validation);


    return Object.keys(validation).length === 0;

  };


  // =========================================================
  // CREATE API BODY
  // EXACT ASP.NET MODEL NAMES
  // =========================================================

  const createPayload = () => {

    const payload = {

      // =====================================================
      // ID
      // =====================================================

      id:
        isEditMode
          ? Number(formData.id)
          : 0,


      // =====================================================
      // LOAN TYPE
      // =====================================================

      loanType:
        formData.loanType,


      // =====================================================
      // PLAN NAME
      // =====================================================

      planName:
        formData.planName,


      // =====================================================
      // PLAN AMOUNT
      // =====================================================

      planAmount:
        Number(formData.planAmount || 0),


      // =====================================================
      // PAID AMOUNT
      // =====================================================

      paidAmount:
        Number(formData.paidAmount || 0),


      // =====================================================
      // NUMBER OF EMI
      // =====================================================

      numberOfEmi:
        Number(formData.numberOfEmi || 0),


      // =====================================================
      // RECOVERY TYPE
      // =====================================================

      recoveryType:
        formData.recoveryType,


      // =====================================================
      // HOLIDAY EXCLUDE
      // =====================================================

      holidayExclude:
        Boolean(formData.holidayExclude),


      // =====================================================
      // GST CHARGE INCLUDE
      // =====================================================

      gstChargeInclude:
        Boolean(formData.gstChargeInclude),


      // =====================================================
      // FILE CHARGE INCLUDE
      // =====================================================

      fileChargeInclude:
        Boolean(formData.fileChargeInclude),


      // =====================================================
      // FILE CHARGE
      // =====================================================

      fileCharge:
        Number(formData.fileCharge || 0),


      // =====================================================
      // PROCESSING FEE CHARGE INCLUDE
      // =====================================================

      processingFeeChargeInclude:
        Boolean(
          formData.processingFeeChargeInclude
        ),


      // =====================================================
      // PROCESSING FEE PERCENTAGE
      // =====================================================

      processingFeePercentage:
        Number(
          formData.processingFeePercentage || 0
        ),


      // =====================================================
      // PROCESSING FEE AMOUNT
      // =====================================================

      processingFeeAmount:
        Number(
          formData.processingFeeAmount || 0
        ),


      // =====================================================
      // INSURANCE FEE CHARGE INCLUDE
      // =====================================================

      insuranceFeeChargeInclude:
        Boolean(
          formData.insuranceFeeChargeInclude
        ),


      // =====================================================
      // INSURANCE FEE TYPE
      // =====================================================

      insuranceFeeType:
        formData.insuranceFeeType,


      // =====================================================
      // INSURANCE FEE AMOUNT
      // =====================================================

      insuranceFeeAmount:
        Number(
          formData.insuranceFeeAmount || 0
        ),


      // =====================================================
      // STATUS
      // =====================================================

      status:
        formData.status,

    };


    // =======================================================
    // CREATED DATE
    // Only send when editing
    // =======================================================

    if (
      isEditMode &&
      formData.createdAt
    ) {

      payload.createdAt =
        formData.createdAt;

    }


    // =======================================================
    // UPDATED DATE
    // =======================================================

    if (isEditMode) {

      payload.updatedAt =
        new Date().toISOString();

    }


    return payload;

  };


  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async () => {

    // =======================================================
    // VALIDATE
    // =======================================================

    if (!validateForm()) {

      return;

    }


    try {

      setSaving(true);


      // =====================================================
      // API BODY
      // =====================================================

      const payload =
        createPayload();


      // =====================================================
      // CONSOLE API BODY
      // =====================================================

      console.log(
        "=========================================="
      );

      console.log(
        isEditMode
          ? "PUT - UPDATE LOAN PLAN"
          : "POST - CREATE LOAN PLAN"
      );

      console.log(
        "API BODY:"
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "=========================================="
      );


      let response;


      // =====================================================
      // UPDATE
      // =====================================================

      if (isEditMode) {

        console.log(
          "Updating ID:",
          formData.id
        );


        response =
          await updateLoanPlan(
            Number(formData.id),
            payload
          );


        console.log(
          "UPDATE RESPONSE:"
        );

        console.log(
          response
        );


        alert(
          "Loan Plan Updated Successfully"
        );

      }


      // =====================================================
      // CREATE
      // =====================================================

      else {

        response =
          await createLoanPlan(
            payload
          );


        console.log(
          "CREATE RESPONSE:"
        );

        console.log(
          response
        );


        alert(
          "Loan Plan Saved Successfully"
        );

      }


      // =====================================================
      // REFRESH TABLE
      // =====================================================

      if (onSaveSuccess) {

        await onSaveSuccess(
          response
        );

      }

    } catch (error) {

      console.error(
        "=========================================="
      );

      console.error(
        "LOAN PLAN SAVE ERROR"
      );

      console.error(
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "ERROR DATA:",
        error.response?.data
      );

      console.error(
        "=========================================="
      );


      alert(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to save Loan Plan."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // CALCULATE EMI
  // =========================================================

  const handleCalculateEmi = () => {

    const planAmount =
      Number(
        formData.planAmount || 0
      );

    const paidAmount =
      Number(
        formData.paidAmount || 0
      );

    const emiCount =
      Number(
        formData.numberOfEmi || 0
      );


    if (
      planAmount <= 0 ||
      paidAmount <= 0 ||
      emiCount <= 0
    ) {

      alert(
        "Please enter Plan Amount, Paid Amount and Number Of EMI."
      );

      return;

    }


    const emi =
      paidAmount / emiCount;


    alert(
      `EMI Amount: ₹${emi.toFixed(2)}`
    );

  };


  // =========================================================
  // JSX
  // =========================================================

  return (

    <div className="loan-plan-modal">

      <div className="loan-plan-modal-content">


        {/* =================================================
            HEADER
        ================================================== */}

        <div className="loan-plan-modal-header">

          <h2>

            {isEditMode
              ? "Edit Loan Plan"
              : "Add Loan Plan"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* =================================================
            FORM
        ================================================== */}

        <div className="loan-plan-form">


          {/* =================================================
              LOAN TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Loan Type *
            </label>

            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
            >

              <option value="">
                Select Loan Type
              </option>

              <option value="Daily">
                Daily
              </option>

              <option value="Weekly">
                Weekly
              </option>

              <option value="Monthly">
                Monthly
              </option>

              <option value="Yearly">
                Yearly
              </option>

            </select>

            {errors.loanType && (
              <p className="error-text">
                {errors.loanType}
              </p>
            )}

          </div>


          {/* =================================================
              PLAN NAME
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Plan Name *
            </label>

            <input
              type="text"
              name="planName"
              placeholder="Enter Plan Name"
              value={formData.planName}
              onChange={handleChange}
            />

            {errors.planName && (
              <p className="error-text">
                {errors.planName}
              </p>
            )}

          </div>


          {/* =================================================
              NUMBER OF EMI
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Number Of EMI *
            </label>

            <input
              type="number"
              name="numberOfEmi"
              placeholder="Enter Number Of EMI"
              value={formData.numberOfEmi}
              onChange={handleChange}
              min="1"
            />

            {errors.numberOfEmi && (
              <p className="error-text">
                {errors.numberOfEmi}
              </p>
            )}

          </div>


          {/* =================================================
              RECOVERY TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Recovery Type *
            </label>

            <select
              name="recoveryType"
              value={formData.recoveryType}
              onChange={handleChange}
            >

              <option value="">
                Select Recovery Type
              </option>

              <option value="Daily">
                Daily
              </option>

              <option value="Weekly">
                Weekly
              </option>

              <option value="BiWeekly">
                BiWeekly
              </option>

              <option value="HalfMonthly">
                HalfMonthly
              </option>

              <option value="Monthly">
                Monthly
              </option>

            </select>

            {errors.recoveryType && (
              <p className="error-text">
                {errors.recoveryType}
              </p>
            )}

          </div>


          {/* =================================================
              PLAN AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Plan Amount *
            </label>

            <input
              type="number"
              name="planAmount"
              placeholder="Enter Plan Amount"
              value={formData.planAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.planAmount && (
              <p className="error-text">
                {errors.planAmount}
              </p>
            )}

          </div>


          {/* =================================================
              PAID AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Paid Amount *
            </label>

            <input
              type="number"
              name="paidAmount"
              placeholder="Enter Paid Amount"
              value={formData.paidAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.paidAmount && (
              <p className="error-text">
                {errors.paidAmount}
              </p>
            )}

          </div>


          {/* =================================================
              HOLIDAY EXCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Holiday Exclude
            </label>

            <select
              name="holidayExclude"
              value={
                formData.holidayExclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  holidayExclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              GST CHARGE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              GST Charge Include
            </label>

            <select
              name="gstChargeInclude"
              value={
                formData.gstChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gstChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              FILE CHARGE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              File Charge Include
            </label>

            <select
              name="fileChargeInclude"
              value={
                formData.fileChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  fileChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              FILE CHARGE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              File Charge *
            </label>

            <input
              type="number"
              name="fileCharge"
              placeholder="Enter File Charge"
              value={formData.fileCharge}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.fileCharge && (
              <p className="error-text">
                {errors.fileCharge}
              </p>
            )}

          </div>


          {/* =================================================
              PROCESSING FEE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee Include
            </label>

            <select
              name="processingFeeChargeInclude"
              value={
                formData.processingFeeChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  processingFeeChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              PROCESSING FEE %
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee (%) *
            </label>

            <input
              type="number"
              name="processingFeePercentage"
              placeholder="Enter Processing Fee %"
              value={
                formData.processingFeePercentage
              }
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.processingFeePercentage && (
              <p className="error-text">
                {errors.processingFeePercentage}
              </p>
            )}

          </div>


          {/* =================================================
              PROCESSING FEE AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee Amount *
            </label>

            <input
              type="number"
              name="processingFeeAmount"
              placeholder="Enter Processing Fee Amount"
              value={
                formData.processingFeeAmount
              }
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.processingFeeAmount && (
              <p className="error-text">
                {errors.processingFeeAmount}
              </p>
            )}

          </div>


          {/* =================================================
              INSURANCE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Charge Include
            </label>

            <select
              name="insuranceFeeChargeInclude"
              value={
                formData.insuranceFeeChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  insuranceFeeChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              INSURANCE TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Type *
            </label>

            <select
              name="insuranceFeeType"
              value={
                formData.insuranceFeeType
              }
              onChange={handleChange}
            >

              <option value="">
                Select Insurance Type
              </option>

              <option value="Fixed">
                Fixed
              </option>

              <option value="Percentage">
                Percentage
              </option>

            </select>

            {errors.insuranceFeeType && (
              <p className="error-text">
                {errors.insuranceFeeType}
              </p>
            )}

          </div>


          {/* =================================================
              INSURANCE AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Amount *
            </label>

            <input
              type="number"
              name="insuranceFeeAmount"
              placeholder="Enter Insurance Amount"
              value={
                formData.insuranceFeeAmount
              }
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.insuranceFeeAmount && (
              <p className="error-text">
                {errors.insuranceFeeAmount}
              </p>
            )}

          </div>


          {/* =================================================
              STATUS
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================== */}

        <div className="loan-plan-form-buttons">

          <SaveButton
            onClick={handleSave}
            disabled={saving}
          />

          <CalculateEmiButton
            onClick={handleCalculateEmi}
            disabled={saving}
          />

          <CancelButton
            onClick={onClose}
            disabled={saving}
          />

        </div>

      </div>

    </div>

  );

};


export default LoanPlanForm;