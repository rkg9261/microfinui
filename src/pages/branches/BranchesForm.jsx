import React, {
  useEffect,
  useState,
} from "react";

import "./Branches.css";

import {
  validateRequired,
} from "../../utils/validation";

import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";


const BranchesForm = ({
  onClose,
  onSave,
  editingBranch,
}) => {


  // INITIAL FORM DATA


  const initialFormData = {

    branchName: "",

    branchCode: "",

    city: "",

    pincode: "",

    address: "",

    // User-visible names
    stateName: "",

    districtName: "",

    // API values
    stateId: "",

    districtId: "",

    countryId: 1,

    companyId: 1,

    contactEmail: "",

    contactNumber: "",

    landlineNumber: "",

    gstinNumber: "",

    openingDate: "",

    isActive: true,

    createdBy: 1,
  };



  // FORM DATA


  const [
    formData,
    setFormData,
  ] = useState(initialFormData);



  // ERRORS


  const [
    errors,
    setErrors,
  ] = useState({});



  // SAVING


  const [
    saving,
    setSaving,
  ] = useState(false);



  // LOAD EDIT DATA


  useEffect(() => {

    if (!editingBranch) {

      setFormData({
        ...initialFormData,
      });

      setErrors({});

      return;
    }


    
    // EDIT MODE
    

    setFormData({

      branchName:
        editingBranch.branchName ||
        "",

      branchCode:
        editingBranch.branchCode ||
        "",

      city:
        editingBranch.city ||
        "",

      pincode:
        editingBranch.pincode ||
        "",

      address:
        editingBranch.address ||
        "",


     
      // STATE NAME
     

      stateName:
        editingBranch.stateName ||
        editingBranch.state?.stateName ||
        "",


     
      // DISTRICT NAME
     

      districtName:
        editingBranch.districtName ||
        editingBranch.district?.districtName ||
        "",


     
      // API IDS
     

      stateId:
        editingBranch.stateId ??
        "",

      districtId:
        editingBranch.districtId ??
        "",


      countryId:
        editingBranch.countryId ??
        1,

      companyId:
        editingBranch.companyId ??
        1,


      contactEmail:
        editingBranch.contactEmail ||
        "",

      contactNumber:
        editingBranch.contactNumber ||
        "",

      landlineNumber:
        editingBranch.landlineNumber ||
        "",

      gstinNumber:
        editingBranch.gstinNumber ||
        "",

      openingDate:
        editingBranch.openingDate
          ? editingBranch.openingDate.substring(
              0,
              10
            )
          : "",

      isActive:
        editingBranch.isActive !== false,

      createdBy:
        editingBranch.createdBy ??
        1,

    });

    setErrors({});

  }, [editingBranch]);



  // HANDLE CHANGE


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData(
      (previous) => ({

        ...previous,

        [name]: value,

      })
    );


    setErrors(
      (previous) => ({

        ...previous,

        [name]: "",

      })
    );

  };



  // RESET FORM


  const resetForm = () => {

    setFormData({
      ...initialFormData,
    });

    setErrors({});

  };



  // SUBMIT


  const handleSubmit = async (e) => {

    e.preventDefault();


    
    // VALIDATION
    

    const validation =
      validateRequired(

        formData,

        [

          {
            name: "branchName",
            label: "Branch Name",
          },

          {
            name: "branchCode",
            label: "Branch Code",
          },

          {
            name: "city",
            label: "City",
          },

          {
            name: "pincode",
            label: "Pincode",
          },

          {
            name: "stateName",
            label: "State",
          },

          {
            name: "districtName",
            label: "District",
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

        ]

      );


    if (
      Object.keys(validation).length > 0
    ) {

      setErrors(validation);

      return;

    }


    
    // CHECK STATE ID
    

    if (
      !formData.stateId
    ) {

      setErrors({

        stateName:
          "State ID could not be found for this state.",

      });

      return;

    }


    
    // CHECK DISTRICT ID
    

    if (
      !formData.districtId
    ) {

      setErrors({

        districtName:
          "District ID could not be found for this district.",

      });

      return;

    }


    
    // CLEAR ERRORS
    

    setErrors({});


    
    // EXISTING API BODY
    

    const branchData = {

      branchName:
        formData.branchName.trim(),

      branchCode:
        formData.branchCode.trim(),

      city:
        formData.city.trim(),

      pincode:
        formData.pincode.trim(),

      address:
        formData.address.trim(),


     
      // Existing API still receives IDs

      stateId:
        Number(formData.stateId),

      countryId:
        Number(formData.countryId),

      companyId:
        formData.companyId
          ? Number(formData.companyId)
          : null,

      districtId:
        Number(formData.districtId),


      contactEmail:
        formData.contactEmail.trim(),

      contactNumber:
        formData.contactNumber.trim(),

      landlineNumber:
        formData.landlineNumber.trim(),

      gstinNumber:
        formData.gstinNumber.trim(),

      openingDate:
        formData.openingDate
          ? `${formData.openingDate}T00:00:00`
          : null,

      isActive:
        formData.isActive,

      createdBy:
        Number(formData.createdBy),

    };


    
    // CONSOLE
    

    console.log(
      "===================================="
    );

    console.log(
      editingBranch
        ? "UPDATE BRANCH BODY:"
        : "CREATE BRANCH BODY:"
    );

    console.log(branchData);

    console.log(
      "===================================="
    );


    
    // SAVE
    

    try {

      setSaving(true);


      await onSave(
        branchData
      );


      resetForm();

    }

    catch (error) {

      console.error(
        "BRANCH FORM SUBMIT ERROR:",
        error
      );

    }

    finally {

      setSaving(false);

    }

  };



  // TITLE


  const title =
    editingBranch
      ? "Edit Branch"
      : "Add New Branch";



  // JSX


  return (

    <div className="branches-modal">

      <div className="branches-modal-content">


        {/*  HEADER */}
          
       

        <div className="branches-modal-header">

          <h2>
            {title}
          </h2>

          <CloseButton
            onClick={onClose}
            disabled={saving}
          />

        </div>


        {/* FORM*/}
           
        

        <form
          className="branches-form"
          onSubmit={handleSubmit}
        >


          {/* BRANCH NAME*/}
             
          

          <div className="branches-form-group">

            <label>
              Branch Name *
            </label>

            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter branch name"
              className={
                errors.branchName
                  ? "error-input"
                  : ""
              }
            />

            {errors.branchName && (

              <p className="error-text">
                {errors.branchName}
              </p>

            )}

          </div>


          {/* BRANCH CODE*/}
             
          

          <div className="branches-form-group">

            <label>
              Branch Code *
            </label>

            <input
              type="text"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter branch code"
              className={
                errors.branchCode
                  ? "error-input"
                  : ""
              }
            />

            {errors.branchCode && (

              <p className="error-text">
                {errors.branchCode}
              </p>

            )}

          </div>


          {/* CITY*/}
             
          

          <div className="branches-form-group">

            <label>
              City *
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter city"
              className={
                errors.city
                  ? "error-input"
                  : ""
              }
            />

            {errors.city && (

              <p className="error-text">
                {errors.city}
              </p>

            )}

          </div>


          {/* PINCODE*/}
             
          

          <div className="branches-form-group">

            <label>
              Pincode *
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              disabled={saving}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter pincode"
              className={
                errors.pincode
                  ? "error-input"
                  : ""
              }
            />

            {errors.pincode && (

              <p className="error-text">
                {errors.pincode}
              </p>

            )}

          </div>


          {/*OPENING DATE  */}
              
        

          <div className="branches-form-group">

            <label>
              Opening Date *
            </label>

            <input
              type="date"
              name="openingDate"
              value={formData.openingDate}
              onChange={handleChange}
              disabled={saving}
              className={
                errors.openingDate
                  ? "error-input"
                  : ""
              }
            />

            {errors.openingDate && (

              <p className="error-text">
                {errors.openingDate}
              </p>

            )}

          </div>


          {/*EMAIL*/}
              
          

          <div className="branches-form-group">

            <label>
              Contact Email *
            </label>

            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter email"
              className={
                errors.contactEmail
                  ? "error-input"
                  : ""
              }
            />

            {errors.contactEmail && (

              <p className="error-text">
                {errors.contactEmail}
              </p>

            )}

          </div>


          {/* ADDRESS*/}
             
          

          <div className="branches-form-group">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter address"
            />

          </div>


          {/* CONTACT NUMBER*/}
             
          

          <div className="branches-form-group">

            <label>
              Contact Number *
            </label>

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={saving}
              maxLength={20}
              inputMode="numeric"
              placeholder="Enter contact number"
              className={
                errors.contactNumber
                  ? "error-input"
                  : ""
              }
            />

            {errors.contactNumber && (

              <p className="error-text">
                {errors.contactNumber}
              </p>

            )}

          </div>


          {/* LANDLINE*/}
             
          

          <div className="branches-form-group">

            <label>
              Landline Number
            </label>

            <input
              type="text"
              name="landlineNumber"
              value={formData.landlineNumber}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter landline number"
            />

          </div>


          {/*STATE NAME - INPUT*/}
              
          

          <div className="branches-form-group">

            <label>
              State *
            </label>

            <input
              type="text"
              name="stateName"
              value={formData.stateName}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter state name"
              className={
                errors.stateName
                  ? "error-input"
                  : ""
              }
            />

            {errors.stateName && (

              <p className="error-text">
                {errors.stateName}
              </p>

            )}

          </div>


          {/*DISTRICT NAME - INPUT*/}
              
          

          <div className="branches-form-group">

            <label>
              District *
            </label>

            <input
              type="text"
              name="districtName"
              value={formData.districtName}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter district name"
              className={
                errors.districtName
                  ? "error-input"
                  : ""
              }
            />

            {errors.districtName && (

              <p className="error-text">
                {errors.districtName}
              </p>

            )}

          </div>


          {/* GSTIN */}
             
         

          <div className="branches-form-group">

            <label>
              GSTIN Number
            </label>

            <input
              type="text"
              name="gstinNumber"
              value={formData.gstinNumber}
              onChange={handleChange}
              disabled={saving}
              placeholder="Enter GSTIN number"
            />

          </div>


          {/*COUNTRY */}
              
         

          <div className="branches-form-group">

            <label>
              Country
            </label>

            <input
              type="text"
              value="India"
              disabled
            />

          </div>


          {/*COMPANY*/}
              
          

          <div className="branches-form-group">

            <label>
              Company
            </label>

            <input
              type="text"
              value="Company ID: 1"
              disabled
            />

          </div>


          {/*STATUS */}

              
         
          <div className="branches-form-group">

            <label>
              Status
            </label>

            <div className="radio-group">

              <label>

                <input
                  type="radio"
                  name="isActive"
                  checked={
                    formData.isActive === true
                  }
                  onChange={() => {

                    setFormData(
                      previous => ({

                        ...previous,

                        isActive: true,

                      })
                    );

                  }}
                  disabled={saving}
                />

                Active

              </label>


              <label>

                <input
                  type="radio"
                  name="isActive"
                  checked={
                    formData.isActive === false
                  }
                  onChange={() => {

                    setFormData(
                      previous => ({

                        ...previous,

                        isActive: false,

                      })
                    );

                  }}
                  disabled={saving}
                />

                Inactive

              </label>

            </div>

          </div>


          {/*BUTTONS */}
              
         

          <div className="branches-form-buttons">

            <SaveButton
              text={
                saving
                  ? editingBranch
                    ? "Updating..."
                    : "Saving..."
                  : editingBranch
                    ? "Update Branch"
                    : "Save Branch"
              }
              type="submit"
              disabled={saving}
            />


            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
              disabled={saving}
            />

          </div>

        </form>

      </div>

    </div>

  );

};


export default BranchesForm;