import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { Switch } from "antd";

const RTSwitch = ({ name, label, defaultChecked,onChange }) => {
  return (
    <Form.Item name={name} label={label}>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default RTSwitch;
