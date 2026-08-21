import api from "./axiosInstance";


// =========================================================
// GET ALL STATES
// =========================================================

export const getStates = async () => {
  try {

    const response = await api.get("/States");

    console.log(
      "GET STATES RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "GET STATES ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// =========================================================
// GET STATE BY ID
// =========================================================

export const getStateById = async (id) => {
  try {

    const response = await api.get(
      `/States/${id}`
    );

    console.log(
      "GET STATE BY ID RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "GET STATE BY ID ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// =========================================================
// CREATE STATE
// =========================================================

export const createState = async (data) => {
  try {

    console.log(
      "CREATE STATE REQUEST:",
      data
    );

    const response = await api.post(
      "/States",
      data
    );

    console.log(
      "CREATE STATE RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "CREATE STATE ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// =========================================================
// UPDATE STATE
// =========================================================

export const updateState = async (id, data) => {
  try {

    const payload = {
      stateId: Number(id),

      ...data,
    };

    console.log(
      "UPDATE STATE REQUEST:",
      payload
    );

    const response = await api.put(
      `/States/${id}`,
      payload
    );

    console.log(
      "UPDATE STATE RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "UPDATE STATE ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// =========================================================
// DELETE STATE
// =========================================================

export const deleteState = async (id) => {
  try {

    console.log(
      "DELETE STATE ID:",
      id
    );

    const response = await api.delete(
      `/States/${id}`
    );

    console.log(
      "DELETE STATE RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "DELETE STATE ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};