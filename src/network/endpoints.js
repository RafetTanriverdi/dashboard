export const ENDPOINTS = {
  USER: {
    DELETE: "users/:userId",
    UPDATE: "users/:userId",
    GET: "users/:userId",
    ADD: "users",
    LIST: "users",
  },
  PRODUCT: {
    LIST: "products",
    GET: "products/:productId",
    ADD: "products",
    UPDATE: "products/:productId",
    DELETE: "products/:productId",
  },
  CATEGORIES: {
    LIST: "categories",
    GET: "categories/:categoryId",
    ADD: "categories",
    UPDATE: "categories/:categoryId",
    DELETE: "categories/:categoryId",
  },
  CUSTOMERS: {
    LIST: "customers",
    GET: "customers/:customerId",
    UPDATE: "customers/:customerId",
    DELETE: "customers/:customerId",
  },
  ORDERS: {
    LIST: "orders",
    GET: "orders/:orderId",
    ADD: "orders",
    UPDATE: "orders/:orderId",
    DELETE: "orders/:orderId",
    REFUND: "orders/refund",
  },
};
