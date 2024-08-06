import { Form } from "antd";
import { InputNumber } from "antd";
import PropTypes from "prop-types";

const Number = ({
  onChange,
  defaultValue,
  value,
  label,
  name,
  required,
  min,
  prefix,
  parser,
  formatter,
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
      <InputNumber
        style={{ width: "100%" }}
        prefix={prefix}
        min={min}
        defaultValue={defaultValue}
        formatter={formatter}
        parser={parser || ((value) => value.replace(/[^\d]/g, ""))}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
  );
};

Number.PropTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.number,
  prefix: PropTypes.string,
  parser: PropTypes.func,
  formatter: PropTypes.func,
};

export default Number;
