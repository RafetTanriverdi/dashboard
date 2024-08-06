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
  dropdownRender,
  allowClear = true,
  defaultValue,
  style = { width: '100%' },
  disabled = false,
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
      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        dropdownRender={dropdownRender}
        allowClear={allowClear}
        defaultValue={defaultValue}
        style={style}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default RTSelect;
