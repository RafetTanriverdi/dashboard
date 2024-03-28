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
      <Form layout="vertical" form={form}>
        <RTInput.text
          label="Title"
          name="Title"
          onChange={(e) => setNewTitle(e.target.value)}
          defaultValue={newTitle}
          required
        />
        <RTInput.text
          label="Price"
          name="Price"
          onChange={(e) => setNewPrice(e.target.value)}
          defaultValue={newPrice}
          required
        />
        <RTInput.text
          label="Description"
          name="Description"
          onChange={(e) => setNewDescription(e.target.value)}
          defaultValue={newDescription}
        />
        <RTInput.text
          label="Category"
          name="Category"
          onChange={(e) => setNewCategory(e.target.value)}
          defaultValue={newCategory}
          required
        />
      </Form>
    </>
  );
};

export default EditProductPanel;
