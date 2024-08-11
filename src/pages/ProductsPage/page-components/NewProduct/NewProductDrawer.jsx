import { Drawer } from "antd";
import NewProductPanel from "./NewProductPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewProductDrawer = ({ onClose, open ,categories}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [stock, setStock] = useState(0);

  const queryClient = useQueryClient();

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();



  const handleForm = async () => {
    form
      .validateFields()
      .then(async () => {
        if (imageFile) {
          const base64Image = await convertToBase64(imageFile);
          mutation.mutate({
            ...postBody,
            imageBase64: base64Image,
            imageMimeType: imageFile.type,
          });
        } else {
          openNotification({
            type: "error",
            message: `Error: Please upload an image`,
            duration: 2.5,
          });
        }
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const postBody = {
    productName: name,
    price: price,
    description: description,
    categoryId: category,
    stock: stock,
  };

  const mutation = useMutation({
    mutationKey: "addProduct",
    mutationFn: (newProduct) => {
      return axiosInstance.post(ENDPOINTS.PRODUCT.ADD, newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      openNotification({
        type: "success",
        message: "Product Added Successfully",
        duration: 2,
        onClose: () => {
          onClose();
          form.resetFields();
        },
      });
    },
    onError: (error) => {
      const Error = error.response?.data?.message ;
      openNotification({
        type: "error",
        message: `Error: ${Error}`,
        duration: 2,
      });
    },
  });
  console.log(postBody)

  return (
    <>
      {context}
      <Drawer
        name="Add New Product"
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
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
          categories={categories}
          imageFile={imageFile}
          setImageFile={setImageFile}
          stock={stock}
          setStock={setStock}
        />
      </Drawer>
    </>
  );
};
