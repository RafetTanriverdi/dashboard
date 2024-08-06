import { Input } from "antd";
import { Form } from "antd";
import PropTypes from "prop-types";

const Phone = ({
  label,
  name,
  placeholder,
  style,
  required,
  onChange,
  defaultValue,
  pattern,
  value,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Please Enter a valid ${label}`,
        },
        {
          pattern: pattern,
          message: `Please Enter a valid ${label}`,


        },
      ]}
    >
      <Input
        style={style}
        prefix="+"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
      />
    </Form.Item>
  );
};
Phone.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func,
  defaultValue: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  pattern: PropTypes.instanceOf(RegExp).isRequired,
};

export default Phone;
