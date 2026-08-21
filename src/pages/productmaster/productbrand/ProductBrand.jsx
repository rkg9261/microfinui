import React, { useState } from "react";

import "./ProductBrand.css";

import ProductBrandTable from "./ProductBrandTable";
import ProductBrandForm from "./ProductBrandForm";
import ProductBrandView from "./ProductBrandView";

const ProductBrand = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      brand: "LOCAL",
      code: "0007",
      remark: "LOCAL BRAND",
      createdAt: "21-07-2026",
      status: "ACTIVE",
    },
    {
      id: 2,
      brand: "FRIDGE",
      code: "0000001",
      remark: "01",
      createdAt: "30-05-2026",
      status: "ACTIVE",
    },
  
  ]);

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  const [showView, setShowView] = useState(false);

  const [viewData, setViewData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setShowForm(true);
  };

  const handleView = (row) => {
    setViewData(row);
    setShowView(true);
  };

  const handleSave = (formData) => {
    if (editData) {
      setBrands((prev) =>
        prev.map((item) =>
          item.id === editData.id
            ? {
                ...item,
                brand: formData.brand,
                code: formData.code,
                remark: formData.remark,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newBrand = {
        id: Date.now(),
        brand: formData.brand,
        code: formData.code,
        remark: formData.remark,
        status: formData.status,
        createdAt: new Date().toLocaleDateString("en-GB"),
      };

      setBrands((prev) => [...prev, newBrand]);
    }

    setShowForm(false);
  };

  return (
    <div className="product-brand-page">
     <div className="page-title">
      <h2> PRODUCT BRAND </h2>
      <p>Manage Product Brand</p>
      </div>

      <ProductBrandTable
        data={brands}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
      />

      {showForm && (
        <ProductBrandForm
          data={editData}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showView && (
        <ProductBrandView
          data={viewData}
          onClose={() => setShowView(false)}
        />
      )}

    </div>
  );
};

export default ProductBrand;