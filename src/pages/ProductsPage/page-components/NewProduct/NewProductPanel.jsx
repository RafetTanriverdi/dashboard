import { useState } from "react";
import { RTInput } from "@rt/components/RTInput";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import { Form } from "antd";
import { dollarFormatter, dollarParser } from "../utils/dollarParser";

const NewProductPanel = ({
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  category,
  setCategory,
  form,
  setImageFile,
  categories,
  stock,
  setStock,
}) => {
  const [imageList, setImageList] = useState([]);

  const handleImageChange = (info) => {
    setImageList(info.fileList);
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

  return (
    <Form layout="vertical" form={form}>
      <RTInput.text
        label="Name"
        name="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
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
        onChange={handleImageChange}
        fileList={imageList} // bind fileList state
        required
      />
    </Form>
  );
};

export default NewProductPanel;
