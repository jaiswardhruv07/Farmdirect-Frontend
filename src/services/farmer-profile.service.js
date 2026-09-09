import apiRequest from "./api.service";

export const getFarmerProfile = async () => {
  return apiRequest("/profiles/farmer/me", {
    method: "GET"
  });
};

export const createFarmerProfile = async (profileData) => {
  return apiRequest("/profiles/farmer", {
    method: "POST",
    body: JSON.stringify(profileData)
  });
};

export const updateFarmerProfile = async (profileData) => {
  return apiRequest("/profiles/farmer/me", {
    method: "PATCH",
    body: JSON.stringify(profileData)
  });
};
