import { axoisInstance } from "@ca/network/httpRequester";
import { hasArrayElement } from "@ca/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { TableView } from "./ProductActions";
import { useNavigate } from "react-router-dom";
import ViewProductDrawer from "./drawers/ViewProductDrawer";
import { useState } from "react";

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
    render: () => {
      return <TableActions />;
    },
  },
];
const TableActions = () => {
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
      {
        open && type === TableView.VIEW && (<ViewProductDrawer onClose={onClose} open={open} />)
      }
    </Space>
  );
};
const TableContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => axoisInstance.get("/products").then((res) => res.data.data),
  });
  console.log(data, "result from products");
  console.log(isLoading, "isLoading");
  console.log(error, "error");

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
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  } else {
    return <Table columns={columns} dataSource={tableData} />;
  }
};

const ProductList = () => {
  return <TableContainer />;
};
export default ProductList;
