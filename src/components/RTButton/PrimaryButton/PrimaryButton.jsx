import { Button, Form } from "antd";
import PropTypes from "prop-types";

const PrimaryButton = ({ onClick, text, icon ,loading}) => {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={onClick} icon={icon} loading={loading}>
        {text}
      </Button>
    </Form.Item>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  loading: PropTypes.object,
};

export default PrimaryButton;
