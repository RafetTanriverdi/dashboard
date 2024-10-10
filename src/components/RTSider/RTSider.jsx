import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TruckOutlined,
  ProductOutlined,
  ApartmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  IdcardOutlined,
  NotificationOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { getRouteId, getRoutePath } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import awsmobile from "@rt/aws-exports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "aws-amplify/auth";

Amplify.configure(awsmobile);

const RTSider = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = window.location.pathname;
  const fixedLocation = "/" + location.split("/")[1];

  const handleSignOut = async () => {
    await signOut()
      .then(() => {
        navigate(getRoutePath(ROUTES_ID.login));
        queryClient.clear();
      })
      .catch((err) => {
        console.error("Error signing out:", err);
      });
  };

  const mutation = useMutation({
    mutationKey: "signOut",
    mutationFn: handleSignOut,
  });

  const SignOut = () => {
    return (
      <div onClick={mutation.mutate} type="text">
        Sign Out
      </div>
    );
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined  />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.dashboard)}>Dashboard</NavLink>
      ),
    },
    {
      key: "customers",
      icon: <UserOutlined />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.customers)}>Customers</NavLink>
      ),
    },
    {
      key: "orders",
      icon: <TruckOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.orders)}>Orders</NavLink>,
    },
    {
      key: "products",
      icon: <ProductOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.products)}>Products</NavLink>,
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.users)}>Users</NavLink>,
    },
    {
      key: "categories",
      icon: <TruckOutlined />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.categories)}>Categories</NavLink>
      ),
    },
    {
      key: "myProfilePage",
      icon: <IdcardOutlined />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.myProfilePage)}>My Profile</NavLink>
      ),
    },
    {
      key: "manageTeamMembers",
      icon: <ApartmentOutlined />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.manageTeamMembers)}>
          Manage Team Members
        </NavLink>
      ),
    },
    {
      key: "calender",
      icon: <CalendarOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.calendar)}>Calender</NavLink>,
    },
    {
      key: "feedback",
      icon: <NotificationOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.feedback)}>Feedback</NavLink>,
    },
    {
      key: "faq",
      icon: <QuestionOutlined />,
      label: <NavLink to={getRoutePath(ROUTES_ID.faq)}>FAQ</NavLink>,
    },
  ];

  const signOutItem = {
    key: "signOut",
    icon: <LogoutOutlined onClick={mutation.mutate} />,
    label: <SignOut />,
  };

  const combinedMenu = [...menuItems, signOutItem];

  return (
    <Menu
      selectedKeys={[getRouteId(fixedLocation)]}
      mode="inline"
      items={combinedMenu}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
  );
};

export default RTSider;
