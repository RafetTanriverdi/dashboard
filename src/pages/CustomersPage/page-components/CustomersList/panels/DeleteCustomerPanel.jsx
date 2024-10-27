import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "antd";
import { Descriptions } from "antd";
import dayjs from "dayjs";

const DeleteCustomerPanel = ({ inheritedData }) => {
  const { key } = inheritedData;

  const { data, isLoading } = useQuery({
    queryKey: ["customersEdit", key],
    queryFn: () => {
      return axiosInstance
        .get(ENDPOINTS.CUSTOMERS.GET.replace(":customerId", key))
        .then((res) => res.data);
    },
  });

  let totalCharges = 0;
  for (let i = 0; i < data?.charges.length; i++) {
    totalCharges += data?.charges[i].amount / 100;
  }

  const item = [
    {
      key: 1,
      label: "Name",
      children: data?.name,
    },
    {
      key: 2,
      label: "Email",
      children: data?.email,
  
    },
    {
      key: 3,
      label: "Phone Number",
      children: data?.phone,
    },
    {
      key: 4,
      label: "Created ",
      children: dayjs(data?.createdAt).format("MMM D, YYYY h:mm A"),
    },
    {
      key: 5,
      label: "Updated ",
      children: dayjs(data?.updatedAt).format("MMM D, YYYY h:mm A"),
    },
    {
      key: 6,
      label: "Status",
      children: (
        <Tag color={data?.status === "active" ? "green" : "red"}>
          {data?.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      key: 7,
      label: "Customer Id",
      children: data?.customerId,
    },
    {
      key: 8,
      label: "Stripe Id",
      children: data?.customerStripeId,
    },
    {
      key: 9,
      label: "Charges",
      children: <span>$ {totalCharges.toFixed(2)}</span>,
    },
  ];
  if (isLoading) return <RTSkeleton />;
  return (
    <Descriptions
      title="Customer Info"
      bordered
      layout="vertical"
      items={item}
    />
  );
};

export default DeleteCustomerPanel;
