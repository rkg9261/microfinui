import React, {
    useMemo,
    useState,
} from "react";

import "../../../components/common/Table.css";
import "../../../components/common/Search.css";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import { AddButton, EditButton,ViewButton} from "../../../components/buttons";

const ProductCategoryTable = ({
    data,
    onAdd,
    onEdit,
    onView,
}) => {

    const [search, setSearch] = useState("");

    const [entries, setEntries] = useState(10);

    const filteredData = useMemo(() => {

        return data.filter((item) =>

            item.category
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            item.code
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            item.remark
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            item.status
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [data, search]);

    return (

        <div className="product-category-card">

            <div className="product-category-card-header">

                <h3>PRODUCT CATEGORY LIST</h3>

                <AddButton
                    text="Add New"
                    onClick={onAdd}
                />

            </div>

            <div className="table-toolbar">

                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />

                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Categ..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            <table className="common-table">

                <thead>

                    <tr>

                        <th>SR. NO.</th>

                        <th>CATEGORY</th>

                        <th>CODE</th>

                        <th>REMARK</th>

                        <th>CREATED AT</th>

                        <th>STATUS</th>

                        <th>ACTION</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredData
                            .slice(0, entries)
                            .map((row, index) => (

                                <tr key={row.id}>

                                    <td>{index + 1}</td>

                                    <td>{row.category}</td>

                                    <td>{row.code}</td>

                                    <td>{row.remark}</td>

                                    <td>{row.createdAt}</td>

                                    <td>

                                        <span
                                            className={
                                                row.status === "ACTIVE"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }
                                        >
                                            {row.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                                
                                                alignItems: "center",
                                            }}
                                        >

                                            <ViewButton
                                                onClick={() =>
                                                    onView(row)
                                                }
                                            />

                                            <EditButton
                                                text=""
                                                onClick={() =>
                                                    onEdit(row)
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))

                    }

                    {

                        filteredData.length === 0 && (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                    }}
                                >
                                    No Records Found
                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

            <div className="table-footer">

                <span>

                    Showing 1 to{" "}

                    {

                        Math.min(
                            entries,
                            filteredData.length
                        )

                    }{" "}

                    of {filteredData.length}

                </span>

                <div className="pagination">

                    <button className="page-btn">
                        Prev
                    </button>

                    <button className="page-btn active">
                        1
                    </button>

                    <button className="page-btn">
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ProductCategoryTable;