import { RTButton } from "@rt/components/RTButton";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewProductPanel from "../panels/ViewProductPanel";

const DeleteProductDrawer = ({ open, onClose, inheritedData }) => {
  const { context, openNotification } = Notification();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(
        ENDPOINTS.PRODUCT.DELETE.replace(":productId", inheritedData.id)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      openNotification({
        type: "success",
        message: "Product Deleted Successfully",
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
        message: `Error: ${Error}`,
        duration: 2.5,
      });
    },
  });

  return (
    <>
      {context}

      <Drawer
        title="Delete Product"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        footer={
          <RTButton.add
            text="Delete Product"
            onClick={() => mutation.mutate()}
            loading={mutation.isPending}
          />
        }
      >
        <ViewProductPanel id={inheritedData.id} />
      </Drawer>
    </>
  );
};

export default DeleteProductDrawer;
