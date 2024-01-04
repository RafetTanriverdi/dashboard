import { ROUTES_ID } from "./routes-id";
import { flatRoutes } from "./routes-util";

export const routes = [
  //public routes
  {
    id: ROUTES_ID.home,
    path: "/",
    title: "Home",
    modulePath: "HomePage/HomePage",
    isPublic: true,
  },
  {
    id: ROUTES_ID.login,
    path: "/login",
    title: "Login",
    modulePath: "LoginPage/LoginPage",
    isPublic: true,
  },
  {
    id: ROUTES_ID.register,
    path: "/register",
    title: "Register",
    modulePath: "RegisterPage/RegisterPage",
    isPublic: true,
  },

  //private routes
  {
    id: ROUTES_ID.dashboard,
    path: "/dashboard",
    title: "Dashboard",
    modulePath: "DashboardPage/DashboardPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.customers,
    path: "/customers",
    title: "Customers",
    modulePath: "CustomersPage/CustomersPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.products,
    path: "/products",
    title: "Products",
    modulePath: "ProductsPage/ProductsPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.categories,	
    path: "/categories",
    title: "Categories",
    modulePath: "CategoriesPage/CategoriesPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.myProfilePage,	
    path: "/my-profile",
    title: "Profile",
    modulePath: "MyProfilePage/MyProfilePage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.manageTeamMembers,	
    path: "/manage-team",
    title: "Manage Team",
    modulePath: "ManageTeamMembersPage/ManageTeamMembersPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.calendar,	
    path: "/calendar",
    title: "Calendar",
    modulePath: "CalendarPage/CalendarPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.feedback,	
    path: "/feedback",
    title: "Feedback",
    modulePath: "FeedbackPage/FeedbackPage",
    isPublic: false,
  },
  {
    id: ROUTES_ID.faq,	
    path: "/faq",
    title: "FAQ",
    modulePath: "FAQPage/FAQPage",
    isPublic: false,
  },
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