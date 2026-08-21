import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  getStates,
  deleteState,
} from "../../api/stateApi";


// =========================================================
// STATE TABLE
// =========================================================

const StateTable = ({
  onEdit,
}) => {


  // =======================================================
  // STATES
  // =======================================================

  const [states, setStates] =
    useState([]);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [search, setSearch] =
    useState("");


  const [entries, setEntries] =
    useState(10);


  // =======================================================
  // GET STATES
  // =======================================================

  const fetchStates = async () => {

    try {

      setLoading(true);

      setError("");


      console.log(
        "================================="
      );

      console.log(
        "GET STATES"
      );

      console.log(
        "================================="
      );


      const response =
        await getStates();


      console.log(
        "GET STATES API DATA:",
        response
      );


      // ===================================================
      // API RESPONSE
      // ===================================================

      let apiData = [];


      if (Array.isArray(response)) {

        apiData = response;

      }

      else if (
        Array.isArray(response?.data)
      ) {

        apiData =
          response.data;

      }

      else {

        apiData = [];

      }


      // ===================================================
      // MAP API DATA → TABLE DATA
      // ===================================================

      const formattedData =
        apiData.map((item) => ({

          id:
            item.stateId,

          stateId:
            item.stateId,

          stateCode:
            item.stateCode ?? "",

          stateName:
            item.stateName ?? "",

          countryId:
            item.countryId ?? 0,

          isActive:
            item.isActive,

          createdBy:
            item.createdBy ?? 0,

          createdDate:
            item.createdDate,

          modifiedBy:
            item.modifiedBy ?? 0,

          modifiedDate:
            item.modifiedDate,

          // UI status
          status:
            item.isActive
              ? "ACTIVE"
              : "INACTIVE",

        }));


      console.log(
        "FORMATTED STATES:",
        formattedData
      );


      setStates(
        formattedData
      );


    } catch (error) {

      console.error(
        "================================="
      );

      console.error(
        "GET STATES ERROR"
      );

      console.error(
        "================================="
      );

      console.error(
        error
      );

      console.error(
        error.response?.data
      );


      setError(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to load states."
      );

    } finally {

      setLoading(false);

    }

  };


  // =======================================================
  // CALL GET WHEN TABLE LOADS
  // =======================================================

  useEffect(() => {

    fetchStates();

  }, []);


  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this state?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      setLoading(true);


      console.log(
        "DELETE STATE ID:",
        id
      );


      await deleteState(id);


      // Remove immediately
      setStates((prev) =>
        prev.filter(
          (item) =>
            Number(item.stateId) !==
            Number(id)
        )
      );


      alert(
        "State deleted successfully!"
      );


    } catch (error) {

      console.error(
        "DELETE STATE ERROR:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to delete state."
      );

    } finally {

      setLoading(false);

    }

  };


  // =======================================================
  // SEARCH
  // =======================================================

  const filteredData =
    useMemo(() => {

      const value =
        search
          .trim()
          .toLowerCase();


      if (!value) {

        return states;

      }


      return states.filter(
        (item) => {

          return (

            item.stateName
              ?.toString()
              .toLowerCase()
              .includes(value)

            ||

            item.stateCode
              ?.toString()
              .toLowerCase()
              .includes(value)

            ||

            item.status
              ?.toString()
              .toLowerCase()
              .includes(value)

          );

        }
      );

    }, [states, search]);


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <>


      {/* =================================================
          SEARCH
      ================================================== */}

      <div className="common-search">

        <input

          type="text"

          placeholder="Search States..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

      </div>


      {/* =================================================
          ERROR
      ================================================== */}

      {error && (

        <div
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            border: "1px solid #fecdca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >

          {error}

        </div>

      )}


      {/* =================================================
          TABLE CARD
      ================================================== */}

      <div className="table-card">


        {/* =================================================
            ENTRIES
        ================================================== */}

        <EntriesDropdown

          value={entries}

          onChange={setEntries}

        />


        {/* =================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#666",
            }}
          >

            Loading States...

          </div>

        ) : (

          <table className="common-table">


            {/* =============================================
                HEADER
            ============================================== */}

            <thead>

              <tr>

                <th>
                  SR. NO.
                </th>

                <th>
                  STATE NAME
                </th>

                <th>
                  STATE CODE
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            {/* =============================================
                BODY
            ============================================== */}

            <tbody>

              {filteredData
                .slice(0, entries)
                .map(
                  (row, index) => (

                    <tr
                      key={
                        row.stateId
                      }
                    >

                      {/* SR NO */}

                      <td>

                        {index + 1}

                      </td>


                      {/* STATE NAME */}

                      <td>

                        {row.stateName}

                      </td>


                      {/* STATE CODE */}

                      <td>

                        {row.stateCode}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            row.isActive
                              ? "status-active"
                              : "status-inactive"
                          }
                        >

                          {row.isActive
                            ? "ACTIVE"
                            : "INACTIVE"}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div
                          className="table-action"
                        >

                          <EditButton

                            text="Edit"

                            onClick={() =>
                              onEdit(row)
                            }

                          />


                          <DeleteButton

                            text="Delete"

                            onClick={() =>
                              handleDelete(
                                row.stateId
                              )
                            }

                          />

                        </div>

                      </td>

                    </tr>

                  )
                )}


              {/* =========================================
                  NO DATA
              ========================================== */}

              {filteredData.length ===
                0 && (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign:
                        "center",
                      padding: "25px",
                    }}
                  >

                    No State Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

    </>

  );

};


export default StateTable;