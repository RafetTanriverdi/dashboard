import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { TableView } from "./ProductActions";
import ViewProductDrawer from "./drawers/ViewProductDrawer";
import { useState } from "react";
import EditProductDrawer from "./drawers/EditProductDrawer";
import DeleteProductDrawer from "./drawers/DeleteProductDrawer";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";

const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => {
      return <TableActions data={record} />;
    },
  },
];
const TableActions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(TableView.VIEW);

  const showDrawer = (type) => {
    setType(type);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space size="middle">
      <a href="#" role="button" onClick={() => showDrawer(TableView.VIEW)}>
        View
      </a>
      <a href="#" role="button" onClick={() => showDrawer(TableView.EDIT)}>
        Edit
      </a>
      <a href="#" role="button" onClick={() => showDrawer(TableView.DELETE)}>
        Delete
      </a>
      {open && type === TableView.VIEW && (
        <ViewProductDrawer onClose={onClose} open={open} data={data} />
      )}
      {open && type === TableView.EDIT && (
        <EditProductDrawer onClose={onClose} open={open} data={data} />
      )}
      {open && type === TableView.DELETE && (
        <DeleteProductDrawer onClose={onClose} open={open} data={data} />
      )}
    </Space>
  );
};
const TableContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data.data),
  });

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        title: item.title,
        price: item.price,
        category: item.category.name,
        owner: item.createdBy.name,
      };
    });
  }

  if (isLoading) {
    return (
      <div>
        <RTSkeleton />
      </div>
    );
  } else if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={tableData}
      />
    );
  }
};

const ProductList = () => {
  return <TableContainer />;
};
export default ProductList;
