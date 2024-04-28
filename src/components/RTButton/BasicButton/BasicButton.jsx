import { Button } from "antd";
import PropTypes from "prop-types";

const BasicButton = ({ onClick, icon, text }) => {
  return (
    <Button onClick={onClick} type="default" icon={icon}>
      {text}
    </Button>
  );
};

BasicButton.prototypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};
export default BasicButton;
