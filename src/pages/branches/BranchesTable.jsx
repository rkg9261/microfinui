import React, {
  useEffect,
  useState,
} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  getBranches,
} from "../../api/branchApi";


const BranchesTable = ({
  search,
  refreshTable,
  onEdit,
  onDelete,
}) => {

  
  // STATES
  

  const [branches, setBranches] = useState([]);
   

  const [entries, setEntries] =  useState(10);
  

  const [loading, setLoading] =  useState(false);
  

  const [error, setError] =  useState("");
  


  
  // GET BRANCHES API
  

  const fetchBranches = async () => {

    try {

      setLoading(true);

      setError("");


      console.log(
        "================================="
      );

      console.log(
        "GET /api/Branches"
      );


      const response =
        await getBranches();


      console.log(
        "GET BRANCHES RESPONSE:",
        response
      );


    

      if (Array.isArray(response)) {

        setBranches(response);

      }




      else if (
        Array.isArray(response?.data)
      ) {

        setBranches(
          response.data
        );

      }


 

      else if (
        Array.isArray(response?.result)
      ) {

        setBranches(
          response.result
        );

      }


            // UNKNOWN RESPONSE
      
      else {

        console.warn(
          "Unexpected GET response:",
          response
        );

        setBranches([]);

      }


      console.log(
        "================================="
      );


    } catch (error) {

      console.error(
        "GET BRANCHES ERROR:",
        error
      );

      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "API ERROR:",
          error.response.data
        );

      }


      setError(
        "Failed to load branches."
      );

      setBranches([]);

    } finally {

      setLoading(false);

    }

  };


  
  

  useEffect(() => {

    fetchBranches();

  }, [refreshTable]);


  
  // SEARCH
  

  const filteredBranches =
    branches.filter((item) => {

      const searchText =
        search.toLowerCase();


      const branchName =
        (
          item.branchName || ""
        ).toLowerCase();


      const branchCode =
        (
          item.branchCode ||
          item.code ||
          ""
        ).toLowerCase();


      const city =
        (
          item.city || ""
        ).toLowerCase();


      const phone =
        (
          item.contactNumber ||
          item.phone ||
          ""
        ).toLowerCase();


      return (

        branchName.includes(
          searchText
        )

        ||

        branchCode.includes(
          searchText
        )

        ||

        city.includes(
          searchText
        )

        ||

        phone.includes(
          searchText
        )

      );

    });


  
  // DATE FORMAT
  

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }


    const newDate =
      new Date(date);


    if (
      Number.isNaN(
        newDate.getTime()
      )
    ) {

      return date;

    }


    return newDate.toLocaleDateString(
      "en-IN"
    );

  };


  
  // LOADING
  

  if (loading) {

    return (

      <div className="table-wrapper">

        <div className="table-loading">

          Loading branches...

        </div>

      </div>

    );

  }


  
  // TABLE
  

  return (

    <div className="table-wrapper">


      {/*    ENTRIES */}
       
      

      <EntriesDropdown

        value={entries}

        onChange={setEntries}

      />


      {/*  ERROR*/}
         
       

      {error && (

        <div className="branches-table-error">

          {error}

          <button
            type="button"
            onClick={fetchBranches}
          >
            Retry
          </button>

        </div>

      )}


      {/*  TABLE */}
         
      

      <table className="common-table">


        {/*  TABLE HEADER  */}
           
       

        <thead>

          <tr>

            <th>
              Sr. No.
            </th>

            <th>
              Branch Name
            </th>

            <th>
              Code
            </th>

            <th>
              Phone
            </th>

            <th>
              City
            </th>

            <th>
              State
            </th>

            <th>
              Opening Date
            </th>

            <th>
              Status
            </th>

            <th width="170">
              Action
            </th>

          </tr>

        </thead>


        {/*  TABLE BODY */}
           
        

        <tbody>


          {filteredBranches.length > 0 ? (

            filteredBranches
              .slice(0, entries)
              .map(
                (item, index) => (

                  <tr
                    key={
                      item.branchId ||
                      item.id ||
                      index
                    }
                  >


                    {/* SR NO */}
                       
                   

                    <td>

                      {index + 1}

                    </td>


                    {/*
                        BRANCH NAME
                    */}

                    <td>

                      {item.branchName ||
                        "-"}

                    </td>


                    {/* CODE*/}
                    
                       

                    <td>

                      {item.branchCode ||
                        item.code ||
                        "-"}

                    </td>


                    {/*PHONE  */}
                        
                  

                    <td>

                      {item.contactNumber ||
                        item.phone ||
                        "-"}

                    </td>


                    {/* CITY  */}
                       
                  

                    <td>

                      {item.city ||
                        "-"}

                    </td>


                    {/* STATE*/}
                       
                    

                    <td>

                      {item.stateName ||
                        item.state ||
                        item.stateId ||
                        "-"}

                    </td>


                    {/*  OPENING DATE*/}
                      
                    

                    <td>

                      {formatDate(
                        item.openingDate
                      )}

                    </td>


                    {/* STATUS */}
                       
                   

                    <td>

                      <span
                        className={`table-status ${
                          item.isActive === true ||
                          item.status === "ACTIVE"
                            ? "active"
                            : "inactive"
                        }`}
                      >

                        {item.isActive === true ||
                        item.status === "ACTIVE"
                          ? "ACTIVE"
                          : "INACTIVE"}

                      </span>

                    </td>


                    {/* ACTION */}
                       
                   

                    <td>

                      <div className="table-action">


                        <EditButton

                          onClick={() =>
                            onEdit(item)
                          }

                        />


                        <DeleteButton

                          onClick={() =>
                            onDelete(item)
                          }

                        />


                      </div>

                    </td>


                  </tr>

                )
              )

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