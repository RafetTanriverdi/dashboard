import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const EditProductPanel = ({
  form,
  newTitle,
  setNewTitle,
  newPrice,
  setNewPrice,
  newDescription,
  setNewDescription,
  newCategory,
  setNewCategory,
}) => {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          Title: newTitle,
          Price: newPrice,
          Description: newDescription,
          Category: newCategory,
        }}
      >
        <RTInput.text
          label="Title"
          name="Title"
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <RTInput.number
          label="Price"
          name="Price"
          onChange={(value) => setNewPrice(value)}
          required
        />
        <RTInput.text
          label="Description"
          name="Description"
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <RTInput.text
          label="Category"
          name="Category"
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default EditProductPanel;
