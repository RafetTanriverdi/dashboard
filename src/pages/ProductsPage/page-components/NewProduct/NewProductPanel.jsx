import { RTInput } from "@rt/components/RTInput";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import { Form } from "antd";

const NewProductPanel = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
  category,
  setCategory,
  form,
  setImageFile,
  categories,
}) => {
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Seçilen dosyayı state'e kaydet
  };

  const selectedOptions = categories?.map((category) => ({
    label: category?.categoryName,
    value: category?.categoryId,
  }));

  const selectedValue =categories?.filter((e) => e.categoryId === category).categoryName;

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
          value={description}
          required
        />
        <RTSelect
          label={"Category"}
          name={"Category"}
          options={selectedOptions}
          placeholder={"Select a Category"}
          onChange={(value) => setCategory(value)}
          value={selectedValue}
          required={true}
        />
        <Form.Item
          label="Product Image"
          name="Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>
      </Form>
    </>
  );
};

export default NewProductPanel;
