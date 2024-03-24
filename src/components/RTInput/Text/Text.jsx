import PropTypes from "prop-types";
import { Form } from "antd";
import { Input } from "antd";


const Text = ({
  label,
  name,
  required,
  onChange,
  value,
  defaultValue,
  className,
  placeholder,
  onKeyDown,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      
      rules={[
        {
          required: required,
          message: `Please enter a valid ${label}`,
        },
      ]}
    >
      <Input
      
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        className={className}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </Form.Item>
  );
};

Text.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func,
  defaultValue: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default Text;
