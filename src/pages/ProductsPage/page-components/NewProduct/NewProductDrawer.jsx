import { Drawer } from "antd";
import NewProductPanel from "./NewProductPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewProductDrawer = ({ onClose, open }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // Yeni state

  const queryClient = useQueryClient();

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();



  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data),
  });

  const handleForm = async () => {
    form
      .validateFields()
      .then(async () => {
        if (imageFile) {
          const base64Image = await convertToBase64(imageFile); // Görseli base64'e çevir
          mutation.mutate({ ...postBody, imageBase64: base64Image, imageMimeType: imageFile.type });
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
      reader.onload = () => resolve(reader.result.split(",")[1]); // Base64 kısmını almak için ayrılır
      reader.onerror = (error) => reject(error);
    });
  };

  const postBody = {
    name: title,
    price: price,
    description: description,
    categoryId: category,
  };

  const mutation = useMutation({
    mutationKey: "addProduct",
    mutationFn: (newProduct) => {
      return axiosInstance.post(ENDPOINTS.PRODUCT.ADD, newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      openNotification({
        type: "success",
        message: "Product Added Successfully",
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
          categories={data}
          setImageFile={setImageFile} // Görseli state'e kaydet
        />
      </Drawer>
    </>
  );
};
