import { Button } from "antd";
import PropTypes from "prop-types";

const AddButton = ({ onClick, text }) => {
  return (
    <>
      <Button type="primary" onClick={onClick}>
        {text}
      </Button>
    </>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
export default AddButton;
