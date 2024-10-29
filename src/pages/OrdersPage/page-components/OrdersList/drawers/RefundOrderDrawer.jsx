import { Drawer } from "antd";
import ViewOrderPanel from "../panels/ViewOrderPanel";
import { Popconfirm } from "antd";
import { RTButton } from "@rt/components/RTButton";
import { Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const RefundOrderDrawer = ({ onClose, open, data }) => {
  const queryClient = useQueryClient();
  const { context, openNotification } = Notification();

  const mutation = useMutation({
    mutationKey: ["refundOrder"],
    mutationFn: () =>
      axiosInstance.post(ENDPOINTS.ORDERS.REFUND, { orderId: data.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders List"] });
      openNotification({
        message: "Order Refunded Successfully",
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
        title="Refund Order"
        onClose={onClose}
        open={open}
        size="large"
        footer={
          <Space>
            <Popconfirm
              title="Are you sure to refund this order?"
              onConfirm={mutation.mutate}
              onCancel={onClose}
              cancelText="Cancel"
            >
              <RTButton.add text="Refund" loading={mutation.isPending} />
            </Popconfirm>
            <RTButton.basic text="Close" onClick={onClose} />
          </Space>
        }
      >
        <ViewOrderPanel order={data} />
      </Drawer>
    </>
  );
};

export default RefundOrderDrawer;
