import apiRequest from "./api.service";

export const loginUser = async (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });
};

export const registerUser = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  roleId
}) => {
  return apiRequest("/auth/register", {
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

export const getPublicRoles = async () => {
  return apiRequest("/auth/roles", {
    method: "GET"
  });
};

export const getCurrentUser = async () => {
  return apiRequest("/auth/me", {
    method: "GET"
  });
};
