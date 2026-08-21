import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";

import ProductSupplierTable from "./ProductSupplierTable";
import ProductSupplierForm from "./ProductSupplierForm";

import "./ProductSupplier.css";

const ProductSupplier = () => {

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const [refresh, setRefresh] = useState(0);


    // =====================================================
    // ADD
    // =====================================================

    const handleAdd = () => {

        setEditData(null);

        setShowForm(true);

    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (supplier) => {

        setEditData(supplier);

        setShowForm(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =====================================================
    // SAVE SUCCESS
    // =====================================================

    const handleSaveSuccess = () => {

        setShowForm(false);

        setEditData(null);

        setRefresh((prev) => prev + 1);

    };


    return (

        <div className="product-supplier-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="product-supplier-page-header">

                <div>

                    <h1>
                        PRODUCT SUPPLIER
                    </h1>

                    <p>
                        Manage Product Supplier
                    </p>

                </div>

            </div>


            {/* =================================================
                LIST CARD
            ================================================= */}

            <div className="product-supplier-card">


                {/* CARD HEADER */}

                <div className="product-supplier-card-header">

                    <div>

                        <h2>
                            PRODUCT SUPPLIER LIST
                        </h2>

                    </div>


                    <AddButton
                        onClick={handleAdd}
                    />

                </div>
                  
                  <hr/>

                {/* TABLE */}

                <ProductSupplierTable
                    onEdit={handleEdit}
                    refresh={refresh}
                />

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <ProductSupplierForm

                    editData={editData}

                    onClose={handleClose}

                    onSaveSuccess={handleSaveSuccess}

                />

            )}

        </div>

    );

};

export default ProductSupplier;