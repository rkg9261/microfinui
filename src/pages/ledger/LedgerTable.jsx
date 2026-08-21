import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const LedgerTable = ({
  ledgers,
  onEdit,
}) => {

  const [search, setSearch] = useState("");

  // ============================================
  // SEARCH
  // ============================================

  const filteredLedgers = ledgers.filter((item) => {

    const searchValue = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.alias.toLowerCase().includes(searchValue) ||
      item.group.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="ledger-table-container">

      {/* SEARCH */}

      <div className="ledger-search-box">

        <span className="ledger-search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search Table"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* TABLE */}

      <div className="ledger-table-scroll">

        <table className="ledger-table">

          <thead>

            <tr>

              <th>
                NAME
              </th>

              <th>
                ALIAS
              </th>

              <th>
                GROUP
              </th>

              <th>
                STATUS
              </th>

              <th className="ledger-actions-heading">
                ACTIONS
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredLedgers.length > 0 ? (

              filteredLedgers.map((item) => (

                <tr key={item.id}>

                  <td className="ledger-name">
                    {item.name}
                  </td>

                  <td>
                    {item.alias}
                  </td>

                  <td>
                    {item.group}
                  </td>

                  <td>

                    <span
                      className={
                        item.status === "Active"
                          ? "ledger-status active"
                          : "ledger-status inactive"
                      }
                    >
                      {item.status.toUpperCase()}
                    </span>

                  </td>

                  <td className="ledger-action-cell">

                    <button
                      type="button"
                      className="ledger-edit-button"
                      onClick={() =>
                        onEdit(item)
                      }
                      title="Edit Ledger"
                    >
                      <FaEdit />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="ledger-no-data"
                >
                  NO DATA FOUND
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* FOOTER */}

      <div className="ledger-table-footer">

        <span>
          Showing 1 to {filteredLedgers.length} of{" "}
          {filteredLedgers.length} entries
        </span>

        <div className="ledger-pagination">

          <button disabled>
            ‹
          </button>

          <button className="ledger-page-active">
            1
          </button>

          <button disabled>
            ›
          </button>

        </div>

      </div>

    </div>
  );
};

export default LedgerTable;