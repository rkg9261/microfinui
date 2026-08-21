import React, {
  useEffect,
  useState,
} from "react";

import "../../components/common/Table.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import {
  getLoanPlans,
} from "../../api/loanPlanApi";


const LoanPlanTable = ({
  onEdit,
  onDelete,
  searchTerm,
  refreshTable,
}) => {


  // STATES


  const [loanPlans, setLoanPlans] = useState([]);
   

  const [entries, setEntries] =   useState(10);
 

  const [loading, setLoading] = useState(false);
   

  const [error, setError] = useState("");
   



  // GET LOAN PLANS


  const fetchLoanPlans = async () => {

    try {

      setLoading(true);

      setError("");


     
      console.log(
        "GET LOAN PLANS API"
      );

     


      const response =
        await getLoanPlans();


      console.log(
        "LOAN PLANS API RESPONSE:"
      );

      console.log(
        response
      );


     
      // HANDLE API RESPONSE
     

      if (Array.isArray(response)) {

        setLoanPlans(response);

      }

      else if (
        Array.isArray(response?.data)
      ) {

        setLoanPlans(
          response.data
        );

      }

      else {

        setLoanPlans([]);

      }


    } catch (error) {

    

      console.error(
        "GET LOAN PLANS ERROR"
      );

     

      console.error(
        error
      );

      console.error(
        "API ERROR:",
        error.response?.data
      );


      setError(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to load loan plans."
      );


      setLoanPlans([]);

    } finally {

      setLoading(false);

    }

  };



  // GET API WHEN TABLE LOADS


  useEffect(() => {

    fetchLoanPlans();

  }, [refreshTable]);



  // SEARCH


  const filteredLoanPlans =
    loanPlans.filter((item) => {

      const search =
        (searchTerm || "")
          .trim()
          .toLowerCase();


      if (!search) {

        return true;

      }


      return (

        item.planName
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.loanType
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.recoveryType
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.status
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.planAmount
          ?.toString()
          .includes(search)

      );

    });



  // LOADING


  if (loading) {

    return (

      <div
        className="loan-plan-loading"
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#666",
        }}
      >

        Loading Loan Plans...

      </div>

    );

  }



  // ERROR


  if (error) {

    return (

      <div
        style={{
          padding: "15px",
          color: "#b42318",
          background: "#fee4e2",
          border: "1px solid #fecdca",
          borderRadius: "8px",
          marginTop: "15px",
        }}
      >

        {error}

      </div>

    );

  }



  // TABLE


  return (

    <div className="table-wrapper">


      {/*ENTRIES */}
      

      <div className="table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={setEntries}
        />

      </div>


      {/*TABLE*/}
       

      <table className="common-table">

        <thead>

          <tr>

            <th>
              S.No
            </th>

            <th>
              Plan Name
            </th>

            <th>
              Loan Type
            </th>

            <th>
              Plan Amount
            </th>

            <th>
              No. Of EMI
            </th>

            <th>
              Recovery Type
            </th>

            <th>
              Status
            </th>

            <th width="170">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {filteredLoanPlans.length > 0 ? (

            filteredLoanPlans
              .slice(0, entries)
              .map((item, index) => (

                <tr
                  key={item.id}
                >

                  {/* S.NO */}

                  <td>
                    {index + 1}
                  </td>


                  {/* PLAN NAME */}

                  <td>
                    {item.planName}
                  </td>


                  {/* LOAN TYPE */}

                  <td>
                    {item.loanType}
                  </td>


                  {/* PLAN AMOUNT */}

                  <td>
                    ₹
                    {Number(
                      item.planAmount || 0
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>


                  {/* NUMBER OF EMI */}

                  <td>
                    {item.numberOfEmi}
                  </td>


                  {/* RECOVERY TYPE */}

                  <td>
                    {item.recoveryType}
                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`table-status ${
                        item.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <div className="table-action">

                      {/* EDIT */}

                      <EditButton
                        onClick={() =>
                          onEdit(item)
                        }
                      />


                      {/* DELETE */}

                      <DeleteButton
                        onClick={() =>
                          onDelete(item.id)
                        }
                      />

                    </div>

                  </td>

                </tr>

              ))

          ) : (

            <tr>

              <td
                colSpan="8"
                className="table-empty"
              >

                No Loan Plan Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};


export default LoanPlanTable;