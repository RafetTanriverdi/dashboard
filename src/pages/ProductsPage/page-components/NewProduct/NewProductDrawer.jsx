import { Drawer } from "antd";
import NewProductPanel from "./NewProductPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewProductDrawer = ({ onClose, open }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const queryClient = useQueryClient();

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const handleForm = () => {
    form
      .validateFields()
      .then(() => {
        mutation.mutate(postBody);
      })
      .catch((error) => {
        console.error("Error: Please fill out all fields", error);
        openNotification({
          type: "error",
          message: `Error: Please fill out all fields`,
          duration: 2.5,
        });
      });
  };

  const postBody = {
    title: title,
    price: price,
    description: description,
    category: category,
  };

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axiosInstance.post(ENDPOINTS.PRODUCT.ADD, newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      onClose();
      openNotification({
        type: "success",
        message: "Product Added Successfully",
        duration: 2,
      });
    },
    onError: (error) => {
      const Error = error.response.data.message;
      openNotification({
        type: "error",
        message: `Error: ${Error}`,
        duration: 2,
      });
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Add New Product"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Add New Product"
            onClick={handleForm}
            loading={mutation.isPending}
          />
        }
      >
        <NewProductPanel
          form={form}
          title={title}
          setTitle={setTitle}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
        />
      </Drawer>
    </>
  );
};
