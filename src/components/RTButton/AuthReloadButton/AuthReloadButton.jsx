import { ReloadOutlined } from "@ant-design/icons";
import { Can } from "@rt/authorization/can";
import { Button } from "antd";
import PropTypes from "prop-types";

const AuthReloadButton = ({ onClick, action, subject }) => {
  return (
    <Can do={action} on={subject}>
      <Button
        type="default"
        shape="default"
        icon={<ReloadOutlined />}
        onClick={onClick}
      />
    </Can>
  );
};

AuthReloadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  action:PropTypes.object.isRequired,
  subject:PropTypes.object.isRequired
};

export default AuthReloadButton;
