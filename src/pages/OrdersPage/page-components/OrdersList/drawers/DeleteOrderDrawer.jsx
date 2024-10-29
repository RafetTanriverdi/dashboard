import { Drawer } from "antd";
import ViewOrderPanel from "../panels/ViewOrderPanel";
import { RTButton } from "@rt/components/RTButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const DeleteOrderDrawer = ({ onClose, open, data }) => {
  const queryClient = useQueryClient();
  const { context, openNotification } = Notification();
  const mutation = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: () =>
      axiosInstance.delete(
        ENDPOINTS.ORDERS.DELETE.replace(":orderId", data.id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders List"] });
      openNotification({
        message: "Order Deleted Successfully",
        type: "success",
        duration: 2,
        onClose: () => {
          onClose();
        },
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        type: "error",
        duration: 2,
      });
    },
  });

  return (
    <>
      {context}
      <Drawer
        onClose={onClose}
        open={open}
        size="large"
        title="Delete Order"
        footer={
          <>
            <RTButton.add
              onClick={mutation.mutate}
              text={"Delete"}
              loading={mutation.isPending}
            />
          </>
        }
      >
        <ViewOrderPanel order={data} />
      </Drawer>
    </>
  );
};

export default DeleteOrderDrawer;
