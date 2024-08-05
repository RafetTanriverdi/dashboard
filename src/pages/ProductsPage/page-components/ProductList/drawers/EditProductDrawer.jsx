import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditProductPanel from "../panels/EditProductPanel";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const EditProductDrawer = ({ onClose, open, inheritedData }) => {
  const { slug, title, price, description, category } = inheritedData;

  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

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

  const postBody = {
    title: newTitle,
    price: newPrice,
    description: newDescription,
    category: newCategory,
  };


  const mutation = useMutation({
    mutationKey: "updateProduct",
    mutationFn: (updateProduct) => {
      return axiosInstance.patch(
        ENDPOINTS.PRODUCT.UPDATE.replace(":productTitle", slug),
        updateProduct
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      openNotification({
        key: slug,
        type: "success",
        message: "Product Edit Successfully",
        duration: 2,
        onClose: () => {
          onClose();
        },
      });
    },
    onError: (error) => {
      const Error = error.response.data.message;
      openNotification({
        type: "error",
        message: `Error:${Error}`,
        duration: 2.5,
      });
      console.error("Error: Product could not be updated", error);
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Edit Product"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Save Changes"
            onClick={handleEditProduct}
            loading={mutation.isPending}
          />
        }
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
    </>
  );
};

export default EditProductDrawer;
