import React,{useState} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";
import EntriesDropdown from "../../components/common/EntriesDropdown";

const BranchesTable = ({ data }) => {
 const [entries, setEntries] = useState(10);

  return (
    <div className="table-wrapper">
        
            {/* Entry list dropdown */}
      <EntriesDropdown value={entries} onChange={setEntries}/>

      <table className="common-table">

        <thead>

          <tr>

            <th>Sr. No.</th>

            <th>Branch Name</th>

            <th>Code</th>

            <th>Phone</th>

            <th>City</th>

            <th>State</th>

            <th>Opening Date</th>

            <th>Status</th>

            <th width="170">Action</th>

          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (

            data.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.branchName}</td>

                <td>{item.code}</td>

                <td>{item.phone}</td>

                <td>{item.city}</td>

                <td>{item.state}</td>

                <td>{item.openingDate}</td>

                <td>

                  <span
                    className={`table-status ${
                      item.status === "ACTIVE"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="table-action">

                    <EditButton
                      onClick={() =>
                        alert("Edit Button Clicked")
                      }
                    />

                    <DeleteButton
                      onClick={() =>
                        alert("Delete Button Clicked")
                      }
                    />

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="9"
                className="table-empty"
              >
                No Branch Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default BranchesTable;