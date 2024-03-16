import { Button, Form } from "antd";
import PropTypes from "prop-types";

const LinkButton = ({ onClick, text }) => {
  return (
    <Form.Item>
      <Button type="link"  onClick={onClick}>
        {text}
      </Button>
    </Form.Item>
  );
};

LinkButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
