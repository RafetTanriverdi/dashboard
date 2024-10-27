import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { TableView } from "./OrdersAction";
import ViewOrderDrawer from "./drawers/ViewOrderDrawer";
import EditOrderDrawer from "./drawers/EditOrderDrawer";
import DeleteOrderDrawer from "./drawers/DeleteOrderDrawer";
import RefundOrderDrawer from "./drawers/RefundOrderDrawer";
import './OrdersList.scss';

const OrdersListContainer = () => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Created ",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => <TableActions data={record} />,
    },
  ];

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
        total: `$ ${item.amountTotal / 100}`,
        createdAt: dayjs(item.createdAt).format("MMMM DD, YYYY"),
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
    return <div>{error.message}</div>;
  }
  return <OrderListTable columns={columns} data={tableData} />;
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

const OrderListTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data}  scroll={{
    x: 'max-content',
  }}/>;
};

const OrdersList = () => {
  return <OrdersListContainer />;
};

export default OrdersList;
