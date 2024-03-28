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
        prefix="$"
        min={min}
        defaultValue={defaultValue}
        formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
  );
};

Number.Proptypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.number,
};
export default Number;
