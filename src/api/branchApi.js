import axiosInstance from "./axiosInstance";

// =====================================================
// GET ALL BRANCHES
// =====================================================

export const getBranches = async () => {
  const response = await axiosInstance.get("/Branches");

  console.log("GET BRANCHES RESPONSE:", response.data);

  return response.data;
};


// =====================================================
// CREATE BRANCH
// =====================================================

export const createBranch = async (branchData) => {
  const response = await axiosInstance.post(
    "/Branches",
    branchData
  );

  console.log("POST BRANCH RESPONSE:", response.data);

  return response.data;
};


// =====================================================
// UPDATE BRANCH
// =====================================================

export const updateBranch = async (
  branchId,
  branchData
) => {
  const response = await axiosInstance.put(
    `/Branches/${branchId}`,
    branchData
  );

  console.log("PUT BRANCH RESPONSE:", response.data);

  return response.data;
};


// =====================================================
// DELETE BRANCH
// =====================================================

export const deleteBranch = async (branchId) => {
  const response = await axiosInstance.delete(
    `/Branches/${branchId}`
  );

  console.log("DELETE BRANCH RESPONSE:", response.data);

  return response.data;
};