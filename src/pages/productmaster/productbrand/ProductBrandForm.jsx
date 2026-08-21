import React, {
  useEffect,
  useState,
} from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import { validateRequired } from "../../../utils/validation";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../../components/buttons";

const ProductBrandForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      brand: "",
      code: "",
      remark: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {

      setFormData({
        brand: data.brand || "",
        code: data.code || "",
        remark: data.remark || "",
        status: data.status || "ACTIVE",
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

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors =
      validateRequired(formData, [

        {
          name: "brand",
          label: "Brand Name",
        },

        {
          name: "code",
          label: "Brand Code",
        },

        {
          name: "remark",
          label: "Remark",
        },

      ]);

    if (
      Object.keys(validationErrors).length > 0
    ) {

      setErrors(validationErrors);

      return;

    }

    onSave(formData);

  };

  return (

    <div className="common-modal">

      <div className="common-modal-content">

        {/* Header */}

        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit Product Brand"
              : "Add New"}

          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        {/* Form */}

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">

            {/* Brand Name */}

            <div className="common-form-group">

              <label>

                Brand Name <span>*</span>

              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter Brand Name"
                className={
                  errors.brand
                    ? "error-input"
                    : ""
                }
              />

              {errors.brand && (

                <p className="error-text">

                  {errors.brand}

                </p>

              )}

            </div>

            {/* Remark */}

            <div className="common-form-group">

              <label>

                Remark <span>*</span>

              </label>

              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                placeholder="Enter Remark"
                className={
                  errors.remark
                    ? "error-input"
                    : ""
                }
              />

              {errors.remark && (

                <p className="error-text">

                  {errors.remark}

                </p>

              )}

            </div>

            {/* Brand Code */}

            <div className="common-form-group">

              <label>

                Brand Code <span>*</span>

              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter Brand Code"
                className={
                  errors.code
                    ? "error-input"
                    : ""
                }
              />

              {errors.code && (

                <p className="error-text">

                  {errors.code}

                </p>

              )}

            </div>

            {/* Status */}

            <div className="common-form-group">

              <label>

                Status

              </label>

              <div className="radio-group">

                <label>

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

                <label>

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

          {/* Buttons */}

          <div className="common-form-buttons">

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

export default ProductBrandForm;