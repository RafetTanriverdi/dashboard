import { Button, Form } from "antd";
import PropTypes from "prop-types";

const PrimaryButton = ({ onClick, text }) => {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={onClick}>
        {text}
      </Button>
    </Form.Item>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default PrimaryButton;
