import React from "react";
import { FaEdit } from "react-icons/fa";

const AcGroupTable = ({ groups, onEdit }) => {
  return (
    <div className="acgroup-table-wrapper">

      <div className="acgroup-table-search">
        <input
          type="text"
          placeholder="Search table..."
        />

        <span className="acgroup-search-icon">
          🔍
        </span>
      </div>

      <div className="acgroup-table-scroll">

        <table className="acgroup-table">

          <thead>
            <tr>
              <th>GROUP</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th className="acgroup-action-header">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>

            {groups.length > 0 ? (
              groups.map((item) => (
                <tr key={item.id}>

                  <td className="acgroup-name">
                    {item.group}
                  </td>

                  <td>
                    {item.type}
                  </td>

                  <td>
                    <span
                      className={
                        item.status === "Active"
                          ? "acgroup-status active"
                          : "acgroup-status inactive"
                      }
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="acgroup-action-cell">

                    <button
                      type="button"
                      className="acgroup-edit-button"
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="acgroup-no-data"
                >
                  NO DATA FOUND
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* TABLE FOOTER */}
      <div className="acgroup-table-footer">

        <div>
          Showing 1 to {groups.length} of{" "}
          {groups.length} entries
        </div>

        <div className="acgroup-pagination">

          <button disabled>
            ‹
          </button>

          <button className="active">
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

export default AcGroupTable;