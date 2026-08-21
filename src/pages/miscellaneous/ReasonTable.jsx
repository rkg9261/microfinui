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

const ReasonTable = ({
  data,
  onAdd,
  onEdit,
}) => {

  const [search, setSearch] =
    useState("");

  const [entries, setEntries] =
    useState(5);

  const filteredData = useMemo(() => {

    return data.filter((item) =>

      item.reason
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.status
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [data, search]);

  return (

    <div className="misc-card">

      {/* ================= Header ================= */}

      <div className="misc-card-header">

        <h3>

          Reason Details

        </h3>

        <AddButton
          text="+"
          onClick={onAdd}
        />

      </div>

      {/* ================= Toolbar ================= */}

      <div className="table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={setEntries}
        />

        <div className="table-search">

          <input
            type="text"
            placeholder="Search Table"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ================= Table ================= */}

      <table className="common-table">

        <thead>

          <tr>

            <th>

              Reason

            </th>

            <th>

              Status

            </th>

            <th>

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {

            filteredData

              .slice(0, entries)

              .map((row) => (

                <tr key={row.id}>

                  <td>

                    {row.reason}

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
                        onEdit(row)
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
                  colSpan="3"
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

      {/* ================= Footer ================= */}

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

export default ReasonTable;