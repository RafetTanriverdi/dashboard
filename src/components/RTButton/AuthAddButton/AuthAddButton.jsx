import { Can } from "@rt/authorization/can";
import { Button } from "antd";
import PropTypes from "prop-types";

const AuthAddButton = ({ onClick, text, loading, action, subject }) => {
  return (
    <>
      <Can do={action} on={subject}>
        <Button type="primary" onClick={onClick} loading={loading}>
          {text}
        </Button>
      </Can>
    </>
  );
};

AuthAddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  loading: PropTypes.func,
  action: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
};
export default AuthAddButton;
