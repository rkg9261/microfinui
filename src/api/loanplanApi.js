import api from "./axiosInstance";



// GET ALL LOAN PLANS


export const getLoanPlans = async () => {
  try {
    const response = await api.get("/LoanPlans");

    console.log("GET LOAN PLANS:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "GET LOAN PLANS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// GET LOAN PLAN BY ID


export const getLoanPlanById = async (id) => {
  try {
    const response = await api.get(`/LoanPlans/${id}`);

    console.log(
      "GET LOAN PLAN BY ID:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "GET LOAN PLAN BY ID ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// CREATE LOAN PLAN


export const createLoanPlan = async (data) => {
  try {
    console.log(
      "CREATE LOAN PLAN REQUEST:",
      data
    );

    const response = await api.post(
      "/LoanPlans",
      data
    );

    console.log(
      "CREATE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "CREATE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// UPDATE LOAN PLAN


export const updateLoanPlan = async (id, data) => {
  try {
    const payload = {
      id: Number(id),

      ...data,
    };

    console.log(
      "UPDATE LOAN PLAN ID:",
      id
    );

    console.log(
      "UPDATE LOAN PLAN REQUEST:",
      payload
    );

    const response = await api.put(
      `/LoanPlans/${id}`,
      payload
    );

    console.log(
      "UPDATE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "UPDATE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// DELETE LOAN PLAN


export const deleteLoanPlan = async (id) => {
  try {
    console.log(
      "DELETE LOAN PLAN ID:",
      id
    );

    const response = await api.delete(
      `/LoanPlans/${id}`
    );

    console.log(
      "DELETE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};