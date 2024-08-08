import { Drawer } from "antd";
import NewCategoryPanel from "./NewCategoryPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewCategoryDrawer = ({ onClose, open }) => {
  const [name, setName] = useState("");

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
    categoryName: name,
  };

  const mutation = useMutation({
    mutationFn: (newCategory) => {
      return axiosInstance.post(ENDPOINTS.CATEGORIES.ADD, newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      openNotification({
        type: "success",
        message: "Category Added Successfully",
        duration: 2,
        onClose: () => {
          onClose();
          form.resetFields();
        },
      });
    },
    onError: (error) => {
      console.error("Error: ", error);
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
        title="Add New Category"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Add New Category"
            onClick={handleForm}
            loading={mutation.isPending}
          />
        }
      >
        <NewCategoryPanel form={form} name={name} setName={setName} />
      </Drawer>
    </>
  );
};
