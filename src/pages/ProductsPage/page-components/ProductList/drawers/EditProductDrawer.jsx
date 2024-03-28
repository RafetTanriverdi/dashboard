import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditProductPanel from "../panels/EditProductPanel";
import { Form } from "antd";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import openNotification from "@rt/components/RTFeedback/Notification/Notification";

const EditProductDrawer = ({ onClose, open, inheritedData }) => {
  const { title, price, description, category, slug } = inheritedData;

  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);

  const [form] = Form.useForm();

  const postBody = {
    title: newTitle,
    price: newPrice,
    description: newDescription,
    category: newCategory,
  };
console.log(postBody);
  const mutation = useMutation({
    onMutate: (updateProduct) => {
      return axiosInstance.put(
        ENDPOINTS.PRODUCT.UPDATE.replace(":productTitle", slug),
        updateProduct
      );
    },
    onSuccess: () => {
      onClose();
      openNotification({
        type: "success",
        message: "Product Updated Successfully",
        duration: 2,
      });
    },
    onError: (error) => {
      openNotification({
        type: "error",
        message: "Error: Product could not be updated",
        duration: 2.5,
      });
      console.error("Error: Product could not be updated", error);
    },
  });

  const handleEditProduct = () => {
    form
      .validateFields()
      .then(() => {
        mutation.mutate(postBody);
      })
      .catch((error) => {
        openNotification({
          type: "error",
          message: `Error: Please fill out all fields`,
          duration: 2.5,
        });
        console.error("Error: Please fill out all fields", error);
      });
  };

  return (
    <Drawer
      title="Edit Product"
      placement="right"
      size="large"
      onClose={onClose}
      open={open}
      extra={<RTButton.add text="Save Changes" onClick={handleEditProduct} />}
    >
      <EditProductPanel
        form={form}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />
    </Drawer>
  );
};

export default EditProductDrawer;
