import { Button } from "antd";
import PropTypes from "prop-types";

const AddButton = ({ onClick, text, loading }) => {
  return (
    <>
      <Button type="primary" onClick={onClick} loading={loading}>
        {text}
      </Button>
    </>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  loading: PropTypes.func,
};
export default AddButton;
