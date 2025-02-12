import { ROUTES_ID } from "./routes-id";
import { flatRoutes } from "./routes-util";

export const routes = [
  //public routes

  {
    id: ROUTES_ID.login,
    path: "/login",
    title: "Login",
    modulePath: "LoginPage/LoginPage",
    fileName: "LoginPageAlias",
    isPublic: true,
  },
  {
    id: ROUTES_ID.register,
    path: "/register",
    title: "Register",
    modulePath: "RegisterPage/RegisterPage",
    fileName: "RegisterPageAlias",
    isPublic: true,
  },
  {
    id: ROUTES_ID.forceChangePassword,
    path: "/force-change-password",
    title: "Force Change Password",
    modulePath: "ForceChangePasswordPage/ForceChangePasswordPage",
    fileName: "ForceChangePasswordPageAlias",
    isPublic: true,
  },

  //private routes
  {
    id: ROUTES_ID.dashboard,
    path: "/",
    title: "Dashboard",
    modulePath: "DashboardPage/DashboardPage",
    fileName: "DashboardPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.dashboard,
    path: "/dashboard",
    title: "Dashboard",
    modulePath: "DashboardPage/DashboardPage",
    fileName: "DashboardPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.customers,
    path: "/customers",
    title: "Customers",
    modulePath: "CustomersPage/CustomersPage",
    fileName: "CustomersPageAlias",
    isPublic: false,
    children: [
      {
        id: ROUTES_ID.customerDetails,
        path: ":customerId",
        title: "Customer Details",
        modulePath: "CustomersPage/CustomerDetailsPage/CustomerDetailsPage",
        fileName: "CustomerDetailsPageAlias",
        isStaticPage: true,
      },
    ],
  },
  {
    id: ROUTES_ID.orders,
    path: "/orders",
    title: "Orders",
    modulePath: "OrdersPage/OrdersPage",
    fileName: "OrdersPageAlias",
    isPublic: false,
    children: [
      {
        id: ROUTES_ID.orderDetails,
        path: ":orderId",
        title: "Order Details",
        modulePath: "OrderDetailsPage/OrderDetailsPage",
        fileName: "OrderDetailsPageAlias",
      },
    ],
  },
  {
    id: ROUTES_ID.users,
    path: "/users",
    title: "Users",
    modulePath: "UsersPage/UsersPage",
    fileName: "UsersPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.products,
    path: "/products",
    title: "Products",
    modulePath: "ProductsPage/ProductsPage",
    fileName: "ProductsPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.categories,
    path: "/categories",
    title: "Categories",
    modulePath: "CategoriesPage/CategoriesPage",
    fileName: "CategoriesPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.myProfilePage,
    path: "/my-profile",
    title: "Profile",
    modulePath: "MyProfilePage/MyProfilePage",
    fileName: "MyProfilePageAlias",
    isPublic: false,
    children: [
      {
        id: ROUTES_ID.changePassword,
        title: "Change Password",
        path: "change-password",
        modulePath: "MyProfilePage/PasswordChangePage/PasswordChangePage",
        isStaticPage: true,
      },
      {
        id: ROUTES_ID.myProfileDetailPage,
        title: "Profile Details",
        path: "profile-details",
        modulePath: "MyProfilePage/ProfileDetailsPage/ProfileDetailsPage",
        isStaticPage: true,
      },
    ],
  },
  {
    id: ROUTES_ID.manageTeamMembers,
    path: "/manage-team",
    title: "Manage Team",
    modulePath: "ManageTeamMembersPage/ManageTeamMembersPage",
    fileName: "ManageTeamMembersPageAlias",
    isPublic: false,
  },
  {
    id: ROUTES_ID.calendar,
    path: "/calendar",
    title: "Calendar",
    modulePath: "CalendarPage/CalendarPage",
    fileName: "CalendarPageAlias",
    isPublic: false,
  },
  // {
  //   id: ROUTES_ID.feedback,
  //   path: "/feedback",
  //   title: "Feedback",
  //   modulePath: "FeedbackPage/FeedbackPage",
  //   fileName: "FeedbackPageAlias",
  //   isPublic: false,
  // },
  // {
  //   id: ROUTES_ID.faq,
  //   path: "/faq",
  //   title: "FAQ",
  //   modulePath: "FAQPage/FAQPage",
  //   fileName: "FAQPageAlias",
  //   isPublic: false,
  // },
];

export const FLAT_ROUTES = flatRoutes(routes);
const ROUTE_ID_MAP = {};
FLAT_ROUTES.map((el) => (ROUTE_ID_MAP[el.id] = el));

export const getRoutePath = (routeId) => {
  const routeInfo = ROUTE_ID_MAP[routeId];
  if (routeInfo) return routeInfo.path;
  else return "Undefined-Route-Path";
};

export const getRouteData = (routeId) => {
  return ROUTE_ID_MAP[routeId];
};

export const getRouteId = (routePath) => {
  const routeData = FLAT_ROUTES.find((el) => el.path === routePath);
  return routeData?.id;
};

export const publicRoutes = routes.filter((el) => el.isPublic);

export const isRoutePathChild = (pathName) => {
  const path = pathName.split("/");
  return path.length > 2;
};
