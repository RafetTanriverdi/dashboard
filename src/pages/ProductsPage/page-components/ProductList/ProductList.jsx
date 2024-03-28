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

import dateFormat from "dateformat";

const TableAntdContainer = ({ style, dataSource }) => {
  // Create Category Filters
  const getCategoryFilters = (data, find) => {
    const categories = new Set(data.map((item) => item[find])); // Catch the Categories

    // Convert from Set to Array and create filter objects for each category
    return Array.from(categories)
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({
        text: category,
        value: category,
      }));
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      filters: getCategoryFilters(dataSource, "category"),
      onFilter: (value, record) => record.category.startsWith(value),
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      filters: getCategoryFilters(dataSource, "owner"),
      onFilter: (value, record) => record.owner.startsWith(value),
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return <TableActions data={record} />;
      },
    },
  ];

  return <Table style={style} columns={columns} dataSource={dataSource} />;
};

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
        <ViewProductDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
      {open && type === TableView.EDIT && (
        <EditProductDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
      {open && type === TableView.DELETE && (
        <DeleteProductDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
        />
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
  const longDate = "mmmm d, yyyy";

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item, index) => {
        return {
          key: item._id,
          _id: index + 1,
          title: item.title,
          price: item.price,
          category: item.category.name,
          owner: item.createdBy.name,
          description: item.description,
          slug: item.slug,
          updatedAt: dateFormat(item.updatedAt, longDate),
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
      <TableAntdContainer style={{ width: "100%" }} dataSource={tableData} />
    );
  }
};

const ProductList = () => {
  return <TableContainer />;
};
export default ProductList;
