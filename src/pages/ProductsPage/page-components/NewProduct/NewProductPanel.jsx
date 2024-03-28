import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const NewProductPanel = ({
  title,
  setTitle,
  price,
  setPrice,
  desription,
  setDescription,
  category,
  setCategory,
  form,
}) => {
  return (
    <>
      <Form layout="vertical" form={form}>
        <RTInput.text
          label="Title"
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <RTInput.text
          label="Price"
          name="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
        <RTInput.text
          label="Description"
          name="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={desription}
          required
        />
        <RTInput.text
          label="Category"
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        />
      </Form>
    </>
  );
};

export default NewProductPanel;
