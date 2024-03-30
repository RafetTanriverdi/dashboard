import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const EditCategoryPanel = ({ form, newName, setNewName }) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          Name: newName,
        }}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setNewName(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default EditCategoryPanel;
