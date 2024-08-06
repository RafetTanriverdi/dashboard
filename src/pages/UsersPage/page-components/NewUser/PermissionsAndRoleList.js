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
      ],
    },
    {
      name: "Manager",
      permissions: ["Product:Read", "Category:Read", "User:Read"],
    },
    { name: "User", permissions: ["Product:Read"] },
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