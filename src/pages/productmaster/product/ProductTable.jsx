import React, {
    useMemo,
    useState,
} from "react";

import ViewButton from "../../../components/buttons/ViewButton";
import EditButton from "../../../components/buttons/EditButton";
import DeleteButton from "../../../components/buttons/DeleteButton";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import ProductView from "./ProductView";

import "./Product.css";


const ProductTable = ({
    onEdit,
    refresh,
}) => {

    const [search, setSearch] = useState("");

    const [entries, setEntries] = useState(10);

    const [viewData, setViewData] = useState(null);


    // ==========================================
    // SAMPLE DATA
    // ==========================================

    const [products, setProducts] = useState([

        {
            id: 1,

            productName: "AIR COOLER (007)",

            productCode: "007",

            variantName: "150 LTR",

            brandName: "LOCAL",

            categoryName: "COOLER",

            hsnSac: "8476",

            mrpPrice: "15000",

            costPrice: "13000",

            salePrice: "12500",

            discountAmount: "2500",

            gstPercentage: "0",

            gstAmount: "0",

            total: "12500",

            remark: "",

            createdAt: "21-07-2026",

            status: "ACTIVE",

        },


        {
            id: 2,

            productName: "LG FRIDGE (010000)",

            productCode: "010000",

            variantName: "250 LTR",

            brandName: "FRIDGE",

            categoryName: "FRIDGE",

            hsnSac: "8418",

            mrpPrice: "17000",

            costPrice: "15000",

            salePrice: "14550",

            discountAmount: "2450",

            gstPercentage: "18",

            gstAmount: "2619",

            total: "17169",

            remark: "",

            createdAt: "30-05-2026",

            status: "ACTIVE",

        },


    ]);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredProducts = useMemo(() => {

        const value =
            search.toLowerCase().trim();


        return products.filter((item) => {

            return (

                item.productName
                    .toLowerCase()
                    .includes(value)

                ||

                item.productCode
                    .toLowerCase()
                    .includes(value)

                ||

                item.variantName
                    .toLowerCase()
                    .includes(value)

                ||

                item.brandName
                    .toLowerCase()
                    .includes(value)

                ||

                item.categoryName
                    .toLowerCase()
                    .includes(value)

                ||

                item.hsnSac
                    .toLowerCase()
                    .includes(value)

                ||

                item.remark
                    .toLowerCase()
                    .includes(value)

                ||

                item.status
                    .toLowerCase()
                    .includes(value)

            );

        });

    }, [products, search, refresh]);


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this Product?"
            );


        if (!confirmDelete) {
            return;
        }


        setProducts((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );

    };


    // ==========================================
    // VIEW
    // ==========================================

    const handleView = (product) => {

        setViewData(product);

    };


    return (

        <>

            {/* ==========================================
                CONTROLS
            ========================================== */}

            <div className="product-controls">

                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ==========================================
                TABLE
            ========================================== */}

            <div className="table-wrapper">

                <table className="common-table">

                    <thead>

                        <tr>

                            <th>SR. NO.</th>

                            <th>PRODUCT</th>

                            <th>SALE PRICE</th>

                            <th>BRAND</th>

                            <th>CATEGORY</th>

                            <th>HSN/SAC</th>

                            <th>REMARK</th>

                            <th>CREATED AT</th>

                            <th>STATUS</th>

                            <th>ACTION</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredProducts
                            .slice(0, entries)
                            .map((product, index) => (

                                <tr key={product.id}>

                                    <td>
                                        {index + 1}
                                    </td>


                                    <td>
                                        {product.productName}
                                    </td>


                                    <td>
                                        {product.salePrice}
                                    </td>


                                    <td>
                                        {product.brandName}
                                    </td>


                                    <td>
                                        {product.categoryName}
                                    </td>


                                    <td>
                                        {product.hsnSac || "-"}
                                    </td>


                                    <td>
                                        {product.remark || "-"}
                                    </td>


                                    <td>
                                        {product.createdAt}
                                    </td>


                                    <td>

                                        <span
                                            className={`table-status ${
                                                product.status.toLowerCase()
                                            }`}
                                        >

                                            {product.status}

                                        </span>

                                    </td>


                                    <td>

                                        <div className="table-action">

                                            <ViewButton
                                                onClick={() =>
                                                    handleView(product)
                                                }
                                            />

                                            <EditButton
                                                onClick={() =>
                                                    onEdit(product)
                                                }
                                            />

                                            <DeleteButton
                                                onClick={() =>
                                                    handleDelete(
                                                        product.id
                                                    )
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}


                        {filteredProducts.length === 0 && (

                            <tr>

                                <td
                                    colSpan="10"
                                    className="table-empty"
                                >
                                    No Product Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="product-table-footer">

                <div>

                    Showing{" "}

                    {filteredProducts.length === 0
                        ? 0
                        : 1}

                    {" "}to{" "}

                    {Math.min(
                        entries,
                        filteredProducts.length
                    )}

                    {" "}of{" "}

                    {filteredProducts.length}

                    {" "}entries

                </div>


                <div className="product-pagination">

                    <button>
                        Prev
                    </button>

                    <button className="active">
                        1
                    </button>

                    <button>
                        2
                    </button>

                    <button>
                        Next
                    </button>

                </div>

            </div>


            {/* ==========================================
                VIEW
            ========================================== */}

            {viewData && (

                <ProductView

                    data={viewData}

                    onClose={() =>
                        setViewData(null)
                    }

                />

            )}

        </>

    );

};

export default ProductTable;