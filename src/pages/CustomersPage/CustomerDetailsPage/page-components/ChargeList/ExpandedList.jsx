import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { hasArrayElement } from "@rt/utils/array-utils";
import { shortDateFormat } from "@rt/utils/short-dateFormat";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

export const ExpandedRowRender = ({ charges, index }) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });

  const chargeList = charges[index].metadata.orderItems;
  const jsonChargeList = JSON.parse(chargeList);

  let tableData = [];
  if (hasArrayElement(data)) {
    tableData = data
      ?.filter((product) => chargeList.includes(product.productId))
      .map((item, index) => {
        return {
          key: item.productId,
          id: item.productId,
          name: item.productName,
          price: item.price,
          quantity: jsonChargeList[index].quantity,
          amount: jsonChargeList[index].quantity * item.price,
          createdAt: shortDateFormat(item.createdAt),
        };
      });
  }

  const expandColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "operation",
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(
                getRoutePath(ROUTES_ID.products) + `?productId=${record.key}`
              )
            }
          >
            View
          </a>
        </Space>
      ),
    },
  ];

  if (isLoading) return <RTSkeleton />;
  if (error) return <RTAlert message={error.message} type="error" />;
  return (
    <Table
      columns={expandColumns}
      dataSource={tableData}
      pagination={false}
      scroll={{
        y: jsonChargeList.length > 4 ? 250 : null,
        x: 768,
      }}
      size="middle"
    />
  );
};
