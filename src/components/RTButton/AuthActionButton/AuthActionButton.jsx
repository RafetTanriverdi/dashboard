import { Can } from "@rt/authorization/can";
import PropTypes from "prop-types";

const AuthActionButton = ({ action, subject, onClick, name }) => {
  return (
    <>
      <Can do={action} on={subject}>
        <a  type='link' role="button" onClick={onClick}>
          {name}
        </a>
      </Can>
    </>
  );
};

AuthActionButton.proptypes = {
  action: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default AuthActionButton;
