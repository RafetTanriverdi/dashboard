import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider } from "antd";
import { Form } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import { Timeline } from "antd";
import dayjs from "dayjs";
import {
  Truck,
  Undo,
  PackageSearch,
  PackageOpen,
  PackageX,
  Ban,
  PackageCheck,
  PackageMinus,
} from "lucide-react";

const dropdownItems = [
  {
    label: "Order Received",
    value: "Order Received",
  },
  {
    label: "Order Processing",
    value: "Order Processing",
  },
  {
    label: "Order Shipped",
    value: "Order Shipped",
  },
  {
    label: "Order Delivered",
    value: "Order Delivered",
  },
  {
    label: "Order Cancelled",
    value: "Order Cancelled",
  },
  {
    label: "Item Returned",
    value: "Item Returned",
  },
  {
    label: "Refund Processed",
    value: "Refund Processed",
  },
  {
    label: "Refund Requested",
    value: "Refund Requested",
  },
];

const EditOrderPanel = ({ orderId }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Order", orderId],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.ORDERS.GET.replace(":orderId", orderId))
        .then((res) => res.data),
  });

  let timeLine = [];

  if (data && data.statusHistory) {
    data.statusHistory.forEach((history) => {
      let timelineItem = {
        children: history.status,
        label: dayjs(history.timestamp).format("MMMM,DD YYYY hh:mm A"),
      };

      switch (history.status) {
        case "Order Received":
          timelineItem.dot = <PackageSearch size={24} color="#28A745" />;
          break;

        case "Order Processing":
          timelineItem.dot = <PackageOpen size={24} color="#FFC107" />;
          break;

        case "Order Shipped":
          timelineItem.dot = <Truck size={24} color="#FFC107" />;
          break;

        case "Order Delivered":
          timelineItem.dot = <PackageCheck size={24} color="#28A745" />;
          break;

        case "Order Cancelled":
          timelineItem.dot = <Ban size={24} color="#DC3545" />;
          break;

        case "Item Returned":
          timelineItem.dot = <PackageX color="#DC3545" />;
          break;

        case "Refund Processed":
          timelineItem.dot = <Undo size={24} color="#FFC107" />;
          break;

        case "Refund Requested":
          timelineItem.dot = <PackageMinus size={24} color="#DC3545" />;
          break;

        default:
          timelineItem.dot = <Undo size={24} />;
          break;
      }

      timeLine.push(timelineItem);
    });
  }

  const mutation = useMutation({
    mutationKey: ["UpdateOrderStatus", orderId],
    mutationFn: (status) =>
      axiosInstance.patch(
        ENDPOINTS.ORDERS.UPDATE.replace(":orderId", orderId),
        { status: status }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders List"] });
      queryClient.invalidateQueries({ queryKey: ["Order", orderId] });
    },
  });

  if (isLoading) return <RTSkeleton />;
  if (error)
    return <RTAlert message={error.response.data.message} type="error" />;

  return (
    <>
      <Form>
        <Form.Item name="Change Order Status" label="Change Order Status">
          {" "}
          <Select
            defaultValue={
              data.statusHistory[data.statusHistory.length - 1].status
            }
            onChange={(value) => mutation.mutate(value)}
            options={dropdownItems}
          />
        </Form.Item>
      </Form>

      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Order Timeline
      </Typography.Title>
      <Divider />
      <Timeline mode="alternate" items={timeLine} />
    </>
  );
};

export default EditOrderPanel;
