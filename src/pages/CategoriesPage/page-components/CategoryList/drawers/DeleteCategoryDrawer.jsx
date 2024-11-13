import { RTButton } from "@rt/components/RTButton";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewCategoryPanel from "../panels/ViewCategoryPanel";

const DeleteCategoryDrawer = ({ open, onClose, inheritedData }) => {
  const { context, openNotification } = Notification();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(
        ENDPOINTS.CATEGORIES.DELETE.replace(":categoryId", inheritedData.key)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      openNotification({
        type: "success",
        message: "Category Deleted Successfully",
        duration: 2,
        onClose: () => {
          onClose();
        },
      });
    },

    onError: (error) => {
      console.error("Error: Please fill out all fields", error);
      const Error = error.response.data.message;
      openNotification({
        type: "error",
        message: `${Error}`,
        duration: 2.5,
      });
    },
  });

  return (
    <>
      {context}

      <Drawer
        title="Delete Category"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        footer={
          <RTButton.add
            text="Delete Category"
            onClick={() => mutation.mutate()}
            loading={mutation.isPending}
          />
        }
      >
        <ViewCategoryPanel categoryId={inheritedData.key} />
      </Drawer>
    </>
  );
};

export default DeleteCategoryDrawer;
