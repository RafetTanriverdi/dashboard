import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditProductPanel from "../panels/EditProductPanel";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import Compressor from "compressorjs";

const EditProductDrawer = ({
  onClose,
  open,
  inheritedData,
  categoriesData,
}) => {
  const {
    id,
    name,
    price,
    description,
    categoryName,
    categoryId,
    status,
    stock,
    imageUrls,
  } = inheritedData;

  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState({
    value: categoryId,
    label: categoryName,
  });
  const [newStatus, setNewStatus] = useState(status);
  const [newStock, setNewStock] = useState(stock);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(
    imageUrls.map((url, index) => ({
      uid: index.toString(),
      name: `image_${index}`,
      url,
    }))
  );
  const [imageList, setImageList] = useState(existingImages);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Invalid file type"));
      }
      new Compressor(file, {
        quality: 0.6, // Sıkıştırma kalitesi
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const handleEditProduct = async () => {
    form
      .validateFields()
      .then(async () => {
        const newImages = [];

        if (imageFiles.length > 0) {
          const compressedImages = await Promise.all(
            imageFiles.map((file) => {
              if (file.originFileObj instanceof File) {
                return compressImage(file.originFileObj);
              }
              return Promise.resolve(file.originFileObj); // Eğer File değilse, sıkıştırma yapma
            })
          );

          const validCompressedImages = compressedImages.filter(
            (file) => file instanceof Blob
          );

          const base64Images = await Promise.all(
            validCompressedImages.map((file) => convertToBase64(file))
          );

          newImages.push(
            ...base64Images.map((base64, index) => ({
              imageBase64: base64,
              imageMimeType: validCompressedImages[index]?.type || "image/jpeg",
            }))
          );
        }

        const validImageUrls = imageList
          .map((e) => e.url)
          .filter((url) => url && url.trim() !== ""); // Filter out empty or invalid URLs

        mutation.mutate({
          productName: newName,
          price: newPrice,
          description: newDescription,
          categoryId: newCategory.value,
          active: newStatus,
          stock: newStock,
          imageUrls: validImageUrls, // Only send valid URLs
          images: newImages, // Yeni eklenecek görsellerin verisi
        });
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Invalid file type"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const mutation = useMutation({
    mutationKey: "updateProduct",
    mutationFn: (updateProduct) => {
      return axiosInstance.patch(
        ENDPOINTS.PRODUCT.UPDATE.replace(":productId", id),
        updateProduct
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      openNotification({
        key: id,
        type: "success",
        message: "Product Updated Successfully",
        duration: 2,
        onClose: () => {
          onClose();
        },
      });
    },
    onError: (error) => {
      const Error = error.response?.data?.message;
      openNotification({
        type: "error",
        message: `Error: ${Error}`,
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
          newName={newName}
          setNewName={setNewName}
          newPrice={newPrice}
          setNewPrice={setNewPrice}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          newStock={newStock}
          setNewStock={setNewStock}
          categoriesData={categoriesData}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          imageList={imageList}
          setImageList={setImageList}
        />
      </Drawer>
    </>
  );
};

export default EditProductDrawer;
