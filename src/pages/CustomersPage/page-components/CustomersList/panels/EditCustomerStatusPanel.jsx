import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Radio } from "antd";
import { Descriptions } from "antd";
import dayjs from "dayjs";

const EditCustomerStatusPanel = ({ id, newStatus, setNewStatus }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["customersEdit", id],
    queryFn: () => {
      return axiosInstance
        .get(ENDPOINTS.CUSTOMERS.GET.replace(":customerId", id))
        .then((res) => res.data);
    },
  });

  const item = [
    { key: 1, label: "Name", children: data?.name, span: 2 },
    {
      key: 2,
      label: "Email",
      children: data?.email,
      span: 2,
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
      span: 2,
    },
    {
      key: 5,
      label: "Updated ",
      children: dayjs(data?.updatedAt).format("MMM D, YYYY h:mm A"),
      span: 2,
    },
    {
      key: 6,
      label: "Status",
      children: (
        <>
          <Radio.Group
            defaultValue={data?.status}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <Radio value="Active">Active</Radio>
            <Radio value="Inactive">Inactive</Radio>
          </Radio.Group>
        </>
      ),
      span: 2,
    },
  ];

  if (isLoading) return <RTSkeleton />;
  return (
    <>
      <Descriptions layout="vertical" bordered items={item} />
    </>
  );
};

export default EditCustomerStatusPanel;
