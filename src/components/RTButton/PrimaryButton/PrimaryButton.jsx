import { Button, Form } from "antd";
import PropTypes from "prop-types";

const PrimaryButton = ({ onClick, text, icon }) => {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={onClick} icon={icon}>
        {text}
      </Button>
    </Form.Item>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default PrimaryButton;
