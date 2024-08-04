import { RTInput } from "@rt/components/RTInput";
import { Form, Select } from "antd";

const NewUserPanel = ({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  role,
  setRole,
  permissions,
  setPermissions,
  form,
}) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <RTInput.text
          label="Email"
          name="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <RTInput.text
          label="Phone Number"
          name="PhoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          required
        />
        <RTInput.text
          label="Role"
          name="Role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
          required
        />
        <Form.Item
          label="Permissions"
          name="Permissions"
          rules={[{ required: true, message: 'Please select permissions!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select Permissions"
            value={permissions}
            onChange={(value) => setPermissions(value)}
          >
            <Select.Option value="read">Read</Select.Option>
            <Select.Option value="write">Write</Select.Option>
            <Select.Option value="delete">Delete</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewUserPanel;