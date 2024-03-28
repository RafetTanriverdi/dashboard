import { Alert } from "antd";
import PropTypes from "prop-types";

const RTAlert = ({ type, message }) => {
  return (
    <>
      <Alert type={type} message={message} />
    </>
  );
};

RTAlert.Proptypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default RTAlert;
