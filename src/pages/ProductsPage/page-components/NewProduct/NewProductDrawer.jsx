import { Drawer } from "antd";
import NewProductPanel from "./NewProductPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";
import Compressor from "compressorjs";

export const NewProductDrawer = ({ onClose, open, categories }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // Çoklu görseller için dizi
  const [stock, setStock] = useState(0);
  const [shared, setShared] = useState(true);

  const queryClient = useQueryClient();

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6, // Sıkıştırma kalitesi (0.0 - 1.0 arası)
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const handleForm = async () => {
    form
      .validateFields()
      .then(async () => {
        if (imageFiles.length > 0) {
          const compressedImages = await Promise.all(
            imageFiles.map((file) => compressImage(file.originFileObj))
          );

          const base64Images = await Promise.all(
            compressedImages.map((file) => convertToBase64(file))
          );

          mutation.mutate({
            ...postBody,
            images: base64Images.map((base64, index) => ({
              imageBase64: base64,
              imageMimeType: compressedImages[index].type,
            })),
          });
        } else {
          openNotification({
            type: "error",
            message: `Error: Please upload at least one image`,
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
    sharedStatus: shared,
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
      const Error = error.response?.data?.message;
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
          imageFiles={imageFiles}
          setImageFiles={setImageFiles} // Çoklu görseller için fonksiyon
          stock={stock}
          setStock={setStock}
          setStatus={setShared}
          status={shared}
        />
      </Drawer>
    </>
  );
};
