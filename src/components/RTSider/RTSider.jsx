import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { getRouteId, getRoutePath } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import awsmobile from "@rt/aws-exports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "aws-amplify/auth";
import { ChartSpline } from "lucide-react";
import { Users } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { Box } from "lucide-react";
import { Blocks } from "lucide-react";
import { Truck } from "lucide-react";
import { SquareUser } from "lucide-react";
import { Network } from "lucide-react";
import { CalendarRange } from "lucide-react";
// import { Megaphone } from "lucide-react";
// import { ShieldQuestion } from "lucide-react";
import { LogOut } from "lucide-react";

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
    onSuccess: () => {
      if (window.innerWidth < 768) {
        localStorage.setItem("collapse", "true");
      }
    },
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
      icon: <ChartSpline />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.dashboard)}>Dashboard</NavLink>
      ),
    },
    {
      key: "customers",
      icon: <Users />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.customers)}>Customers</NavLink>
      ),
    },
    {
      key: "orders",
      icon: <Truck />,
      label: <NavLink to={getRoutePath(ROUTES_ID.orders)}>Orders</NavLink>,
    },
    {
      key: "products",
      icon: <Box />,
      label: <NavLink to={getRoutePath(ROUTES_ID.products)}>Products</NavLink>,
    },
    {
      key: "categories",
      icon: <Blocks />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.categories)}>Categories</NavLink>
      ),
    },
    {
      key: "users",
      icon: <UserRoundPlus />,
      label: <NavLink to={getRoutePath(ROUTES_ID.users)}>Users</NavLink>,
    },

    {
      key: "myProfilePage",
      icon: <SquareUser />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.myProfilePage)}>My Profile</NavLink>
      ),
    },
    {
      key: "manageTeamMembers",
      icon: <Network />,
      label: (
        <NavLink to={getRoutePath(ROUTES_ID.manageTeamMembers)}>
          Manage Team Members
        </NavLink>
      ),
    },
    {
      key: "calendar",
      icon: <CalendarRange />,
      label: <NavLink to={getRoutePath(ROUTES_ID.calendar)}>Calendar</NavLink>,
    },
    // {
    //   key: "feedback",
    //   icon: <Megaphone />,
    //   label: <NavLink to={getRoutePath(ROUTES_ID.feedback)}>Feedback</NavLink>,
    // },
    // {
    //   key: "faq",
    //   icon: <ShieldQuestion />,
    //   label: <NavLink to={getRoutePath(ROUTES_ID.faq)}>FAQ</NavLink>,
    // },
  ];

  const signOutItem = {
    key: "signOut",
    icon: <LogOut onClick={mutation.mutate} />,
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
