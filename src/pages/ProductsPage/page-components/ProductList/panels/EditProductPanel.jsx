import { RTInput } from "@rt/components/RTInput";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import RTSwitch from "@rt/components/RTSwitch/RTSwitch";
import { Form } from "antd";
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
  setImageFiles,
  setImageList,
  imageList,
}) => {
  const handleImageChange = (info) => {
    setImageList(info.fileList);
    setImageFiles(info.fileList);
  };

  const handleRemoveImage = (file) => {
    setImageList(imageList.filter((item) => item.uid !== file.uid));
    setImageFiles(imageList.filter((item) => item.uid !== file.uid));
  };

  const selectedOptions = categoriesData?.map((category) => ({
    label: category?.categoryName,
    value: category?.categoryId,
  }));

  const selectedValue = categoriesData?.find(
    (e) => e.categoryId === newCategory.value
  )?.categoryName;

  return (
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
        options={selectedOptions}
        label="Category"
        name="Category"
        onChange={(value) =>
          setNewCategory({
            value,
            label: selectedOptions.find((option) => option.value === value)
              ?.label,
          })
        }
        value={selectedValue}
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
        label="Images"
        name="Images"
        maxCount={5}
        onChange={handleImageChange}
        fileList={imageList}
        onRemove={handleRemoveImage}
      />
    </Form>
  );
};

export default EditProductPanel;
