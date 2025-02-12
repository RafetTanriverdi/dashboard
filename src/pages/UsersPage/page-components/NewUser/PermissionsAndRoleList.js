export const roleOptions = [
  {
    name: "Admin",
    permissions: [
      "Product:Create",
      "Product:Read",
      "Product:Update",
      "Product:Delete",
      "Category:Create",
      "Category:Read",
      "Category:Update",
      "Category:Delete",
      "User:Create",
      "User:Read",
      "User:Update",
      "User:Delete",
      "Order:Refund",
      "Order:Read",
      "Order:Update",
      "Order:Delete",
      "Customer:Details",
      "Customer:Read",
      "Customer:Update",
      "Customer:Delete",
    ],
  },
  {
    name: "Product Manager",
    permissions: [
      "Product:Read",
      "Product:Create",
      "Product:Read",
      "Product:Update",
      "Product:Delete",
      "Category:Create",
      "Category:Read",
      "Category:Update",
      "Category:Delete",
    ],
  },
  {
    name:'Product Creator',
    permissions: [
      "Product:Read",
      "Product:Create",
      "Category:Create",
      "Category:Read",
    ],
  },
  {
    name: "Ship Manager",
    permissions: ["Order:Read", "Order:Update", "Order:Delete", "Order:Refund"],
  },
  {
    name: "Customer Service",
    permissions: [
      "Order:Read",
      "Order:Update",
      "Order:Delete",
      "Order:Refund",
      "Customer:Details",
      "Customer:Read",
      "Customer:Update",
      "Customer:Delete",
    ],
  },
  {
    name: "Finance",
    permissions: [
      "Order:Read",
      "Order:Update",
      "Customer:Details",
      "Customer:Read",
    ],
  },

  {
    name:'Marketing',
    permissions: [
      "Product:Read",
      "Category:Read",
      "Order:Read",
      "Customer:Read",
      "Customer:Details",
    ],
  },

  {
    name: "User",
    permissions: [
      "Product:Read",
      "Category:Read",
      "Order:Read",
      'User:Read',
      "Customer:Read",
      "Customer:Details",
    ],
  },
  { name: "Other", permissions: [] },
];

export const permissionsList = [
  {
    name: "Products",
    permissions: [
      "Product:Create",
      "Product:Read",
      "Product:Update",
      "Product:Delete",
    ],
  },
  {
    name: "Categories",
    permissions: [
      "Category:Create",
      "Category:Read",
      "Category:Update",
      "Category:Delete",
    ],
  },

  {
    name: "Orders",
    permissions: ["Order:Refund", "Order:Read", "Order:Update", "Order:Delete"],
  },
  {
    name: "Customer",
    permissions: [
      "Customer:Details",
      "Customer:Read",
      "Customer:Update",
      "Customer:Delete",
    ],
  },
  {
    name: "Users",
    permissions: ["User:Create", "User:Read", "User:Update", "User:Delete"],
  },
];

export const generateTreeDataFromPermissions = (permissionsList) => {
  return permissionsList.map((item) => ({
    title: item.name,
    key: item.name, // Make sure each group has a unique key
    children: item.permissions.map((permission) => ({
      title: permission.split(":")[1], // Extract 'Create', 'Read', etc.
      key: permission,
    })),
  }));
};

export const treeData = generateTreeDataFromPermissions(permissionsList);
