import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const EditUserPanel = ({
  form,
  newName,
  setNewName,
  setNewNumber,
  newNumber,
  newRole,
  setNewRole,
  newPermissions,
  setNewPermissions,
}) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          Name: newName,
          Number: newNumber,
          Role: newRole,
          Permissions: newPermissions,

          
        }}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setNewName(e.target.value)}
          required
        />
     
        <RTInput.text
          label="Number"
          name="Number"
          onChange={(e) => setNewNumber(e.target.value)}
          required
        />
        <RTInput.text
          label="Role"
          name="Role"
          onChange={(e) => setNewRole(e.target.value)}
          required
        />
        <RTInput.text
          label="Permissions"
          name="Permissions"
          onChange={(e) => setNewPermissions(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default EditUserPanel;
