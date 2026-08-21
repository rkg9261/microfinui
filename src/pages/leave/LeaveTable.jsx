import React, {
  useMemo,
  useState,
} from "react";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

const LeaveTable = ({
  data,
  onEdit,
  onDelete,
}) => {

  const [search, setSearch] =
    useState("");

  const [entries, setEntries] =
    useState(10);

  const filteredData = useMemo(() => {

    const value =
      search.toLowerCase();

    return data.filter((item) =>

      item.name
        .toLowerCase()
        .includes(value) ||

      item.status
        .toLowerCase()
        .includes(value)

    );

  }, [data, search]);

  return (
    <>
     <div className="common-search">

          <input
            type="text"
            placeholder="Search Leave..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

    <div className="table-card">

      {/* ================= Toolbar ================= */}

      <div className="table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={setEntries}
        />

       

      </div>

      {/* ================= Table ================= */}

      <table className="common-table">

        <thead>

          <tr>

            <th>SR. NO.</th>

            <th>NAME</th>

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

                  <td>

                    {index + 1}

                  </td>

                  <td>

                    {row.name}

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

                    <div className="table-action">

                      <EditButton
                        text="Edit"
                        onClick={() =>
                          onEdit(row)
                        }
                      />

                      <DeleteButton
                        text="Delete"
                        onClick={() =>
                          onDelete(row.id)
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
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "25px",
                  }}
                >

                  No Leave Found

                </td>

              </tr>

            )

          }

        </tbody>

      </table>

      {/* ================= Footer ================= */}

      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "18px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >

        <div>

          Showing 1 to{" "}

          {

            Math.min(
              entries,
              filteredData.length
            )

          }{" "}

          of {filteredData.length} entries

        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >

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

      </div> */}

    </div>
</>
  );

};

export default LeaveTable;