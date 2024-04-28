import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const NewCustomerPanel = ({
  name,
  setName,
  form,
  email,
  setEmail,
  setNumber,
  number,
  setPassword,
  password,
  setPasswordConfirm,
  passwordConfirm,
}) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        defaultValue={{
          Name: name,
          Email: email,
          Number: number,
          Password: password,
          "Confirm Password": passwordConfirm,
        }}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <RTInput.text
          label="Email"
          name="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <RTInput.text
          label="Number"
          name="Number"
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <RTInput.text
          label="Password"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <RTInput.text
          label="Confirm Password"
          name="Confirm Password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default NewCustomerPanel;
