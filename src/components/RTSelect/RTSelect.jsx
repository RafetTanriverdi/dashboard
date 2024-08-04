import { Select } from "antd";
import { Form } from "antd";

const RTSelect = ({
  options,
  label,
  name,
  placeholder,
  onChange,
  required,
    value,
}) => {
  return (
    <Form.Item label={label} name={name}  rules={[
        {
          required: required,
          message: `Please enter a valid ${label}`,
        },
      ]}>
      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
  );
};

export default RTSelect;
