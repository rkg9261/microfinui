import React, {
    useMemo,
    useState,
} from "react";

import ViewButton
    from "../../../components/buttons/ViewButton";

import EditButton
    from "../../../components/buttons/EditButton";

import DeleteButton
    from "../../../components/buttons/DeleteButton";

import EntriesDropdown
    from "../../../components/common/EntriesDropdown";

import ProductLoanView
    from "./ProductLoanView";

import "./ProductLoan.css";


const ProductLoanTable = ({
    onEdit,
    refresh,
}) => {


    // ==========================================
    // STATES
    // ==========================================

    const [search, setSearch] =
        useState("");

    const [entries, setEntries] =
        useState(10);

    const [viewData, setViewData] =
        useState(null);


    // ==========================================
    // SAMPLE DATA
    // ==========================================

    const [loans, setLoans] = useState([

        {

            id: 1,

            loanId: "I12BR1",

            memberName: "DIPU (M010109)",

            mobile: "8127914811",

            branch: "SHREEJA GROUP",

            branchCenter: "SHREEJA CENTER",

            groupName: "SHREEJA GROUP",

            product: "AIR COOLER (007)",

            supplierName: "OM ALL SERVICE CENTER",

            mfgDate: "2026-07-21",

            expireDate: "2027-07-21",

            imeiNo1: "864890070708952",

            imeiNo2: "",

            insuranceCompanyName: "ABC INSURANCE",

            serialNo: "AC001",

            warranty: "1 YEAR",

            productMrp: "15000",

            discountAmount: "2500",

            salePrice: "12500",

            gstAmount: "0",

            units: "1",

            downPayment: "2000",

            loanAmount: "10500",

            disbursementAmount: "10500",

            totalAmount: "12500",

            isRefurbished: "NO",

            insuranceNumber: "INS001",

            insuranceStartDate: "2026-07-21",

            insuranceEndDate: "2027-07-21",

            remark: "",

            description: "Air cooler product loan",

            createdAt: "21-07-2026",

            status: "DISBURSED",

        },


        {

            id: 2,

            loanId: "I12BR2",

            memberName: "MAKSUD ALAM (BR10115596)",

            mobile: "9801366081",

            branch: "SHREEJA GROUP",

            branchCenter: "SHREEJA CENTER",

            groupName: "SHREEJA GROUP",

            product: "AIR COOLER (007)",

            supplierName: "SONI KUMARI",

            mfgDate: "2026-07-21",

            expireDate: "2027-07-21",

            imeiNo1: "",

            imeiNo2: "",

            insuranceCompanyName: "",

            serialNo: "AC002",

            warranty: "1 YEAR",

            productMrp: "15000",

            discountAmount: "2500",

            salePrice: "12500",

            gstAmount: "0",

            units: "1",

            downPayment: "2000",

            loanAmount: "10500",

            disbursementAmount: "10500",

            totalAmount: "12500",

            isRefurbished: "NO",

            insuranceNumber: "",

            insuranceStartDate: "",

            insuranceEndDate: "",

            remark: "",

            description: "",

            createdAt: "21-07-2026",

            status: "PENDING",

        },


        {

            id: 3,

            loanId: "I12BR3",

            memberName: "VEERPAL KAUR",

            mobile: "6656666666",

            branch: "LASKARHAT",

            branchCenter: "LASKARHAT CENTER",

            groupName: "LASKARHAT GROUP",

            product: "AIR COOLER",

            supplierName: "LOCAL",

            mfgDate: "2026-07-20",

            expireDate: "2027-07-20",

            imeiNo1: "",

            imeiNo2: "",

            insuranceCompanyName: "",

            serialNo: "AC003",

            warranty: "1 YEAR",

            productMrp: "15000",

            discountAmount: "2500",

            salePrice: "12500",

            gstAmount: "0",

            units: "1",

            downPayment: "2000",

            loanAmount: "10500",

            disbursementAmount: "10500",

            totalAmount: "12500",

            isRefurbished: "NO",

            insuranceNumber: "",

            insuranceStartDate: "",

            insuranceEndDate: "",

            remark: "",

            description: "",

            createdAt: "20-07-2026",

            status: "DELETED",

        },

    ]);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredLoans = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();


        return loans.filter((item) => {

            return (

                String(item.loanId)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.memberName)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.mobile)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.branch)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.product)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.status)
                    .toLowerCase()
                    .includes(value)

            );

        });

    }, [loans, search, refresh]);


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this Product Loan?"
            );


        if (!confirmDelete) {

            return;

        }


        setLoans((prev) =>
            prev.filter(
                (item) =>
                    item.id !== id
            )
        );

    };


    // ==========================================
    // VIEW
    // ==========================================

    const handleView = (loan) => {

        setViewData(loan);

    };


    return (

        <>


            {/* ==========================================
                CONTROLS
            ========================================== */}

            <div className="product-loan-controls">


                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Loan..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
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

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                LOAN ID
                            </th>

                            <th>
                                MEM NAME
                            </th>

                            <th>
                                MOBILE
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                BRANCH CENTER
                            </th>

                            <th>
                                GROUP NAME
                            </th>

                            <th>
                                PRODUCT
                            </th>

                            <th>
                                DISBURSEMENT DATE
                            </th>

                            <th>
                                EMI START DATE
                            </th>

                            <th>
                                EMI LAST DATE
                            </th>

                            <th>
                                TOTAL PRICE
                            </th>

                            <th>
                                DOWN PAYMENT
                            </th>

                            <th>
                                LOAN AMOUNT
                            </th>

                            <th>
                                STATUS
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredLoans
                            .slice(0, entries)
                            .map(
                                (
                                    loan,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            loan.id
                                        }
                                    >


                                        <td>
                                            {index + 1}
                                        </td>


                                        <td>
                                            {loan.loanId}
                                        </td>


                                        <td>
                                            {loan.memberName}
                                        </td>


                                        <td>
                                            {loan.mobile}
                                        </td>


                                        <td>
                                            {loan.branch}
                                        </td>


                                        <td>
                                            {loan.branchCenter}
                                        </td>


                                        <td>
                                            {loan.groupName}
                                        </td>


                                        <td>
                                            {loan.product}
                                        </td>


                                        <td>
                                            {loan.mfgDate}
                                        </td>


                                        <td>
                                            {loan.mfgDate}
                                        </td>


                                        <td>
                                            {loan.expireDate}
                                        </td>


                                        <td>
                                            ₹ {loan.totalAmount}
                                        </td>


                                        <td>
                                            ₹ {loan.downPayment}
                                        </td>


                                        <td>
                                            ₹ {loan.loanAmount}
                                        </td>


                                        <td>

                                            <span
                                                className={`table-status ${
                                                    String(
                                                        loan.status
                                                    ).toLowerCase()
                                                }`}
                                            >

                                                {
                                                    loan.status
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            <div className="table-action">


                                                <ViewButton
                                                    onClick={() =>
                                                        handleView(
                                                            loan
                                                        )
                                                    }
                                                />


                                                <EditButton
                                                    onClick={() =>
                                                        onEdit(
                                                            loan
                                                        )
                                                    }
                                                />


                                                <DeleteButton
                                                    onClick={() =>
                                                        handleDelete(
                                                            loan.id
                                                        )
                                                    }
                                                />


                                            </div>

                                        </td>


                                    </tr>

                                )
                            )}


                        {filteredLoans.length === 0 && (

                            <tr>

                                <td
                                    colSpan="16"
                                    className="table-empty"
                                >

                                    No Product Loan Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="product-loan-table-footer">


                <div>

                    Showing{" "}

                    {filteredLoans.length === 0
                        ? 0
                        : 1}

                    {" "}to{" "}

                    {Math.min(
                        entries,
                        filteredLoans.length
                    )}

                    {" "}of{" "}

                    {filteredLoans.length}

                    {" "}entries

                </div>


                <div className="product-loan-pagination">

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

                <ProductLoanView

                    data={viewData}

                    onClose={() =>
                        setViewData(null)
                    }

                />

            )}

        </>

    );

};


export default ProductLoanTable;