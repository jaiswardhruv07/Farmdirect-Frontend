import apiRequest from "./api.service";

export const createOrder = async (items, deliveryAddress) => {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify({ items, deliveryAddress })
  });
};

export const getSellerOrders = async () => {
  return apiRequest("/orders/seller", {
    method: "GET"
  });
};

export const updateSellerOrderStatus = async (orderId, status) => {
  return apiRequest(`/orders/seller/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
};
