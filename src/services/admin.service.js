import apiRequest from "./api.service";

export const createUser = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  roleId
}) => {
  return apiRequest("/admin/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      password,
      roleId
    })
  });
};

export const getAllProducts = async () => {
  return apiRequest("/admin/products", {
    method: "GET"
  });
};

export const getPendingProfiles = async () => {
  return apiRequest("/admin/profiles/pending", {
    method: "GET"
  });
};

export const approveProfile = async (profileType, profileId) => {
  return apiRequest(`/admin/profiles/${profileType}/${profileId}/approve`, {
    method: "PATCH"
  });
};

export const rejectProfile = async (profileType, profileId, rejectionReason) => {
  return apiRequest(`/admin/profiles/${profileType}/${profileId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ rejectionReason })
  });
};
