import { RTInput } from "@rt/components/RTInput";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import RTSwitch from "@rt/components/RTSwitch/RTSwitch";
import { Form } from "antd";
import { useState } from "react";
import { dollarFormatter, dollarParser } from "../../utils/dollarParser";

const EditProductPanel = ({
  form,
  newName,
  setNewName,
  newPrice,
  setNewPrice,
  newDescription,
  setNewDescription,
  newCategory,
  setNewCategory,
  newStatus,
  setNewStatus,
  newStock,
  setNewStock,
  categoriesData,
  setImageFile,
  fileList,
}) => {
  const [imageList, setImageList] = useState(fileList);

  const handleImageChange = (info) => {
    setImageList(info.fileList);
    if (info.fileList.length > 0) {
      setImageFile(info.fileList[0].originFileObj);
    } else {
      setImageFile(null);
    }
  };

  const handleRemoveImage = () => {
    setImageList([]);
    setImageFile(null);
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          Name: newName,
          Price: newPrice,
          Description: newDescription,
          Category: newCategory,
          Status: newStatus,
          Stock: newStock,
        }}
      >
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <RTInput.number
          label="Price"
          name="Price"
          onChange={(value) => setNewPrice(value)}
          prefix={"$"}
          required
          formatter={dollarFormatter}
          parser={dollarParser}
        />
        <RTInput.text
          required
          label="Description"
          name="Description"
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <RTSelect
          options={categoriesData?.map((e) => ({
            label: e.categoryName,
            value: e.categoryId,
          }))}
          label="Category"
          name="Category"
          onChange={(value) => setNewCategory(value)}
          required
        />
        <RTSwitch
          label={"Status"}
          name={"Status"}
          defaultChecked={newStatus}
          onChange={(value) => setNewStatus(value)}
        />
        <RTInput.number
          label="Stock"
          name="Stock"
          onChange={(value) => setNewStock(value)}
          required
        />
        <RTInput.image
        required
          label="Image"
          name="Image"
          maxCount={1}
          onChange={handleImageChange}
          fileList={imageList}
          onRemove={handleRemoveImage}
        />
      </Form>
    </>
  );
};

export default EditProductPanel;
