import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { TableView } from "./OrdersAction";
import ViewOrderDrawer from "./drawers/ViewOrderDrawer";
import EditOrderDrawer from "./drawers/EditOrderDrawer";
import DeleteOrderDrawer from "./drawers/DeleteOrderDrawer";
import RefundOrderDrawer from "./drawers/RefundOrderDrawer";
import "./OrdersList.scss";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import dayjs from "dayjs";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";

const OrdersListContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data.map((item) => {
      return {
        key: item.orderId,
        id: item.orderId,
        customer: item.customerName,
        customerEmail: item.customerEmail,
        total: item.amountTotal / 100,
        createdAt: item.createdAt,
        status: item.currentStatus,
        products: item.products.length,
      };
    });
  }
  if (isLoading) {
    return (
      <div>
        <RTSkeleton />
      </div>
    );
  }
  if (error) {
    return <RTAlert type='error' message={error.response.data.message} />;
  }
  return <OrderListTable data={tableData} />;
};

const TableActions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(TableView.VIEW);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = (type) => {
    setType(type);
    setOpen(true);
  };

  return (
    <Space>
      <a onClick={() => showDrawer(TableView.VIEW)}>View</a>
      <a onClick={() => showDrawer(TableView.EDIT)}>Edit</a>
      <a onClick={() => showDrawer(TableView.DELETE)}>Delete</a>
      <a onClick={() => showDrawer(TableView.REFUND)}>Refund</a>

      {open && type === TableView.VIEW && (
        <ViewOrderDrawer onClose={onClose} open={open} data={data} />
      )}
      {open && type === TableView.EDIT && (
        <EditOrderDrawer onClose={onClose} open={open} data={data} />
      )}
      {open && type === TableView.DELETE && (
        <DeleteOrderDrawer onClose={onClose} open={open} data={data} />
      )}
      {open && type === TableView.REFUND && (
        <RefundOrderDrawer onClose={onClose} open={open} data={data} />
      )}
    </Space>
  );
};

const OrderListTable = ({ data }) => {
  const getOrderFilters = (data, find) => {
    const orders = new Set(data.map((item) => item[find]));

    return Array.from(orders)
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({
        text: category,
        value: category,
      }));
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      sorter: (a, b) => a.customerEmail.localeCompare(b.customerEmail),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$ ${total}`,
      sorter: (a, b) => a.total - b.total,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: getOrderFilters(data, "status"),
      onFilter: (value, record) => record.status.startsWith(value),
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      sorter: (a, b) => a.products - b.products,
    },

    {
      title: "Created ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => longDateFormat(createdAt),
      sorter: (a, b) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => <TableActions data={record} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: "max-content",
      }}
    />
  );
};

const OrdersList = () => {
  return <OrdersListContainer />;
};

export default OrdersList;
