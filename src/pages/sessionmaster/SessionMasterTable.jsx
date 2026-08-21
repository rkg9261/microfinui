import React, {
    useMemo,
    useState,
} from "react";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
    AddButton,
    EditButton,
} from "../../components/buttons";

const SessionMasterTable = ({
    data,
    onAdd,
    onEdit,
}) => {

    const [search, setSearch] =
        useState("");

    const [entries, setEntries] =
        useState(10);

    const filteredData = useMemo(() => {

        return data.filter((item) =>

            item.session
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            item.startYear
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            item.endYear
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

        <div className="session-card">

            {/* Header */}

            <div className="session-card-header">

                <h3>

                    SESSION LIST

                </h3>

                <AddButton
                    text="Add New"
                    onClick={onAdd}
                />

            </div>

            {/* Toolbar */}

            <div className="table-toolbar">

                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />

                <div className="table-search">

                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            {/* Table */}

            <table className="common-table">

                <thead>

                    <tr>

                        <th>

                            SR. NO.

                        </th>

                        <th>

                            SESSION

                        </th>

                        <th>

                            START DATE

                        </th>

                        <th>

                            END DATE

                        </th>

                        <th>

                            START YEAR

                        </th>

                        <th>

                            END YEAR

                        </th>

                        <th>

                            REMARK

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

                    {

                        filteredData

                            .slice(0, entries)

                            .map((row, index) => (

                                <tr key={row.id}>

                                    <td>

                                        {index + 1}

                                    </td>

                                    <td>

                                        {row.session}

                                    </td>

                                    <td>

                                        {row.startDate}

                                    </td>

                                    <td>

                                        {row.endDate}

                                    </td>

                                    <td>

                                        {row.startYear}

                                    </td>

                                    <td>

                                        {row.endYear}

                                    </td>

                                    <td>

                                        {row.remark}

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                row.status ===
                                                "ACTIVE"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }
                                        >

                                            {row.status}

                                        </span>

                                    </td>

                                    <td>

                                        <EditButton
                                            text=""
                                            onClick={() =>
                                                onEdit(
                                                    row
                                                )
                                            }
                                        />

                                    </td>

                                </tr>

                            ))

                    }

                    {

                        filteredData.length === 0 && (

                            <tr>

                                <td
                                    colSpan="9"
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "20px",
                                    }}
                                >

                                    No Records Found

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

            {/* Footer */}

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

export default SessionMasterTable;