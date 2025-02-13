import { getToken } from "@rt/authentication/auth-utils";
import { jwtDecode } from "jwt-decode";

export const getAuthItems = () => {
  const idToken = getToken().IdToken;

  if (!idToken) {
    return [];
  }
  const permissionKey = "custom:permissions";
  const decodedToken = jwtDecode(idToken);
  const permissions = decodedToken[permissionKey];
  if (!permissions) {
    return [];
  }
  const permissionsArray = permissions.split(",");

  return permissionsArray.map((permission) => {
    const [subject, action] = permission.split(":");
    return { subject, action };
  });
};

export const Permissions = {
  users: {
    subject: "User",
    actions: {
      create:"Create",
      read: "Read",
      update: "Update",
      delete: "Delete",
    },
  },
  products: {
    subject: "Product",
    actions: {
      create: "Create",
      read: "Read",
      update: "Update",
      delete: "Delete",
    },
  },
  categories: {
    subject: "Category",
    actions: {
      create: "Create",
      read: "Read",
      update: "Update",
      delete: "Delete",
    },
  },
  orders: {
    subject: "Order",
    actions: {
      refund: "Refund",
      read: "Read",
      update: "Update",
      delete: "Delete",
    },
  },
  customers: {
    subject: "Customer",
    actions: {
      details: "Details",
      read: "Read",
      update: "Update",
      delete: "Delete",
    },
  },
};
