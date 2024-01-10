import { Space } from 'antd';
import './RTHeader.scss'
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '../../routing/routes';
import { ROUTES_ID } from '../../routing/routes-id';

const Pages = () => {
  return (
    <div >
      <Space className="link-container" >
        <NavLink
          to={getRoutePath(ROUTES_ID.home)}
          className={({ isActive }) => (isActive ? "active-link" : "active")}
        >
          Home
        </NavLink>
        <NavLink
          to={getRoutePath(ROUTES_ID.login)}
          className={({ isActive }) => (isActive ? "active-link" : "active")}
        >
          Login
        </NavLink>
        <NavLink
          to={getRoutePath(ROUTES_ID.register)}
          className={({ isActive }) => (isActive ? "active-link" : "active")}
        >
          Register
        </NavLink>
        <NavLink
          to={getRoutePath(ROUTES_ID.contact)}
          className={({ isActive }) => (isActive ? "active-link" : "active")}
        >
          Contact
        </NavLink>
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