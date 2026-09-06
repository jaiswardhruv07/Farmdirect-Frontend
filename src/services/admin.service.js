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
