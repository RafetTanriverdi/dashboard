import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const EditCustomerPanel = ({
  form,
  newName,
  setNewName,
  setNewEmail,
  newEmail,
  setNewNumber,
  newNumber,
  setNewPassword,
  newPassword,
  setNewPasswordConfirm,
  newPasswordConfirm,
}) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          Name: newName,
          Email: newEmail,
          Number: newNumber,
          Password: newPassword,
          "Confirm Password": newPasswordConfirm,
          
        }}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <RTInput.text
          label="Email"
          name="Email"
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <RTInput.text
          label="Number"
          name="Number"
          onChange={(e) => setNewNumber(e.target.value)}
          required
        />
        <RTInput.text
          label="Password"
          name="Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <RTInput.text
          label="Confirm Password"
          name="Confirm Password"
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default EditCustomerPanel;
