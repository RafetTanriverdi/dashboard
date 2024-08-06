import { RTInput } from "@rt/components/RTInput";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import { Form } from "antd";
import { dollarFormatter, dollarParser } from "../utils/dollarParser";

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
  imageFile,
  categories,
  stock,
  setStock,
}) => {
  const handleImageChange = (info) => {
    // Check if the file has been selected and store it in state
    if (info.fileList.length > 0) {
      setImageFile(info.fileList[0].originFileObj);
    } else {
      setImageFile(null);
    }
  };

  const selectedOptions = categories?.map((category) => ({
    label: category?.categoryName,
    value: category?.categoryId,
  }));

  const selectedValue = categories?.find(
    (e) => e.categoryId === category
  )?.categoryName;

  console.log("file", imageFile);
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
        <RTInput.number
          label="Price"
          name="Price"
          onChange={(e) => setPrice(e)}
          value={price}
          prefix={"$"}
          min={0.1}
          required
          formatter={dollarFormatter}
          parser={dollarParser}
        />
        <RTInput.text
          label="Description"
          name="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <RTInput.number
          min={1}
          label="Stock"
          name="stock"
          onChange={(e) => setStock(e)}
          value={stock}
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

        <RTInput.image
          label={"Product Image"}
          name={"Image"}
          maxCount={1}
          handleImageChange={handleImageChange}
        />
      </Form>
    </>
  );
};

export default NewProductPanel;
