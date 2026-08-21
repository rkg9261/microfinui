import React, {
  useState,
} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  getPenaltySchemeById,
  deletePenaltyScheme,
} from "../../api/penaltySchemeApi";


const PenaltySchemeTable = ({
  data,
  onEdit,
  onDeleteSuccess,
}) => {


  const [entries, setEntries] =
    useState(10);

  // EDIT

  const handleEdit = async (id) => {

    try {

      console.log(
        "Getting penalty scheme:",
        id
      );


      const response =
        await getPenaltySchemeById(id);


      console.log(
        "Edit Data:",
        response
      );


     
      const selectedData =
        response?.data ?? response;


   
      onEdit(selectedData);


    } catch (error) {

      console.error(
        "Get penalty scheme error:",
        error
      );


      alert(
        "Unable to load penalty scheme"
      );

    }

  };


  // DELETE

  const handleDelete = async (id) => {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this penalty scheme?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      console.log(
        "Deleting penalty scheme:",
        id
      );


      await deletePenaltyScheme(id);


      alert(
        "Penalty Scheme deleted successfully"
      );


      // Reload GET data
      onDeleteSuccess();


    } catch (error) {

      console.error(
        "Delete penalty scheme error:",
        error
      );


      alert(
        "Unable to delete penalty scheme"
      );

    }

  };


  // JSX

  return (

    <div className="table-wrapper">


      {/* ENTRIES*/}

      <EntriesDropdown

        value={entries}

        onChange={setEntries}

      />


      {/* TABLE */}
          
      

      <table className="common-table">


        {/*  HEADER*/}

        <thead>

          <tr>

            <th>
              Sr. No.
            </th>

            <th>
              Penalty Scheme
            </th>

            <th>
              Type
            </th>

            <th>
              Amount / Percentage
            </th>

            <th>
              Minimum Amount
            </th>

            <th>
              Grace Period
            </th>

            <th>
              Penalty Mode
            </th>

            <th>
              Recurring
            </th>

            <th>
              Created At
            </th>

            <th>
              Status
            </th>

            <th width="170">
              Action
            </th>

          </tr>

        </thead>


        {/* 
            BODY
         */}

        <tbody>


          {data.length > 0 ? (


            data
              .slice(0, entries)
              .map((item, index) => (


                <tr key={item.id}>


                  {/* Sr No */}

                  <td>
                    {index + 1}
                  </td>


                  {/* Scheme */}

                  <td>
                    {item.schemeName}
                  </td>


                  {/* Type */}

                  <td>
                    {item.penaltyType}
                  </td>


                  {/* Amount */}

                  <td>
                    ₹{item.amount}
                  </td>


                  {/* Minimum Amount */}

                  <td>
                    ₹{item.minimumAmount}
                  </td>


                  {/* Grace Period */}

                  <td>
                    {item.gracePeriod}
                  </td>


                  {/* Penalty Mode */}

                  <td>
                    {item.penaltyMode}
                  </td>


                  {/* Recurring */}

                  <td>
                    {item.recurring}
                  </td>


                  {/* Created */}

                  <td>
                    {item.createdAt}
                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={
                        `table-status ${
                          item.status ===
                          "ACTIVE"
                            ? "active"
                            : "inactive"
                        }`
                      }
                    >

                      {item.status}

                    </span>

                  </td>


                  {/* Actions */}

                  <td>

                    <div className="table-action">


                      {/*  EDIT */}
                         
                      

                      <EditButton

                        onClick={() =>
                          handleEdit(
                            item.id
                          )
                        }

                      />


                      {/*  DELETE*/}
                         
                       

                      <DeleteButton

                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }

                      />


                    </div>

                  </td>


                </tr>

              ))


          ) : (


            <tr>

              <td

                colSpan="11"

                className="table-empty"

              >

                No Penalty Scheme Found

              </td>

            </tr>


          )}


        </tbody>

      </table>

    </div>

  );

};


export default PenaltySchemeTable;