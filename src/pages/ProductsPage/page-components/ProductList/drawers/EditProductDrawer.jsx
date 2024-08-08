import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditProductPanel from "../panels/EditProductPanel";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

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
    imageUrl,
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
  const [imageFile, setImageFile] = useState(null);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const postBody = {
    productName: newName,
    price: newPrice,
    description: newDescription,
    categoryId: newCategory.value,
    active: newStatus,
    stock: newStock,
  };
  const handleEditProduct = async () => {
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
          mutation.mutate(postBody);
        }
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  console.log(postBody, "postBody");
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
          imageFile={imageFile}
          setImageFile={setImageFile}
          fileList={
            imageUrl
              ? [{ uid: "-1", name: "current_image", url: imageUrl }]
              : []
          }
        />
      </Drawer>
    </>
  );
};

export default EditProductDrawer;
