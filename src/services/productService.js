import apiRequest from "./api.service";

export const getPublicProducts = async () => {
  return apiRequest("/products", {
    method: "GET"
  });
};
