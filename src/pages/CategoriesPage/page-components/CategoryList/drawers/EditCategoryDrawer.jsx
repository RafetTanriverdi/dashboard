/* eslint-disable no-unused-vars */
import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditCategoryPanel from "../panels/EditCategoryPanel";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const EditCategoryDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name } = inheritedData;

  const [newName, setNewName] = useState(name);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const handleEditCategory = () => {
    form
      .validateFields()
      .then((values) => {
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
    categoryName: newName,
  };

  const mutation = useMutation({
    mutationKey: "updateCategory",
    mutationFn: (updateCategory) => {
      return axiosInstance.patch(
        ENDPOINTS.CATEGORIES.UPDATE.replace(":categoryId", key),
        updateCategory
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      openNotification({
        key: key,
        type: "success",
        message: "Category Edit Successfully",
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
      console.error("Error: Category could not be updated", error);
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Edit Category"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Save Changes"
            onClick={handleEditCategory}
            loading={mutation.isPending}
          />
        }
      >
        <EditCategoryPanel form={form} newName={newName} setNewName={setNewName} />
      </Drawer>
    </>
  );
};

export default EditCategoryDrawer;
