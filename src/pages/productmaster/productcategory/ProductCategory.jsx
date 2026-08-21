import React, { useState } from "react";

import "./ProductCategory.css";

import "../../../components/common/Table.css";
import "../../../components/common/Search.css";
import "../../../components/common/CommonForm.css";

import ProductCategoryTable from "./ProductCategoryTable";
import ProductCategoryForm from "./ProductCategoryForm";
import ProductCategoryView from "./ProductCategoryView";

const ProductCategory = () => {

    const [showForm, setShowForm] = useState(false);

    const [showView, setShowView] = useState(false);

    const [editingData, setEditingData] = useState(null);

    const [viewData, setViewData] = useState(null);

    const [categoryList, setCategoryList] = useState([
        {
            id: 1,
            category: "COOLER",
            code: "007",
            remark: "COOLER",
            createdAt: "21-07-2026",
            status: "ACTIVE",
        },
        {
            id: 2,
            category: "FRIDGE",
            code: "000001",
            remark: "HOME APPLIANCE",
            createdAt: "30-05-2026",
            status: "ACTIVE",
        },

    ]);

    const handleAdd = () => {
        setEditingData(null);
        setShowForm(true);
    };

    const handleEdit = (row) => {
        setEditingData(row);
        setShowForm(true);
    };

    const handleView = (row) => {
        setViewData(row);
        setShowView(true);
    };

    const handleSave = (formData) => {

        if (editingData) {

            setCategoryList((prev) =>
                prev.map((item) =>
                    item.id === editingData.id
                        ? {
                              ...item,
                              ...formData,
                          }
                        : item
                )
            );

        } else {

            setCategoryList((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    createdAt: new Date()
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-"),
                    ...formData,
                },
            ]);

        }

        setShowForm(false);
        setEditingData(null);
    };

    return (

        <div className="product-category-page">

            <div className="product-category-header">
        <div>
                <h2>PRODUCT CATEGORY</h2>
                <p>Manage Product Category</p>
        </div>
            </div>

            <ProductCategoryTable
                data={categoryList}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onView={handleView}
            />

            {showForm && (

                <ProductCategoryForm
                    data={editingData}
                    onSave={handleSave}
                    onClose={() => {
                        setShowForm(false);
                        setEditingData(null);
                    }}
                />

            )}

            {showView && (

                <ProductCategoryView
                    data={viewData}
                    onClose={() => {
                        setShowView(false);
                        setViewData(null);
                    }}
                />

            )}

        </div>

    );

};

export default ProductCategory;