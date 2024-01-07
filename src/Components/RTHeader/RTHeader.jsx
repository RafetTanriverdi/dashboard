import { NavLink } from "react-router-dom";
import { getRoutePath } from "../../Routes/routes";
import { ROUTES_ID } from "../../Routes/routes-id";
import { Space } from "antd";

const Pages = () => {
  return (
    <div>
      <Space>
        <NavLink to={getRoutePath(ROUTES_ID.home)} className={({isActive})=>isActive?'active-link':''} >Home</NavLink>
        <NavLink to={getRoutePath(ROUTES_ID.login)} className={({isActive})=>isActive?'active-link':''} >Login</NavLink>
        <NavLink to={getRoutePath(ROUTES_ID.register)} className={({isActive})=>isActive?'active-link':''} >Register</NavLink>
      </Space>
    </div>
  );
};

const RTHeader = () => {
  return (
    <>
      <Pages />
    </>
  );
};

export default RTHeader;
