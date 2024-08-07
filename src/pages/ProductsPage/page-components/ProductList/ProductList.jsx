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
import dayjs from "dayjs";
import { Badge } from "antd";

const TableAntdContainer = ({ style, dataSource }) => {
  // Create Category Filters
  const getCategoryFilters = (data, find) => {
    const categories = new Set(data.map((item) => item[find]));

    return Array.from(categories)
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({
        text: category,
        value: category,
      }));
  };

  const columns = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
      
          <Badge
            count={`${status ? "Active" : "Inactive"}`}
            color={`${status ? "green" : "red"}`}
            size="default"
            style={{ padding: "0 10px" }}
          />
      
      ),
    },
    {
      title: "Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: "Create",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
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

const TableContainer = ({ categoriesData }) => {
  console.log(categoriesData);
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });
  const longDate = "MMMM DD, YYYY";

  const categoryNamefilter = (item) => {
    return categoriesData?.filter((e) => e.categoryId === item.categoryId)[0]
      ?.categoryName;
  };

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item) => {
        return {
          key: item.productId,
          id: item.productId,
          title: item.name,
          price: item.price,
          owner: item.ownerName,
          status: item.active,
          category: categoryNamefilter(item),
          updatedAt: dayjs(item.updatedAt).format(longDate),
          createdAt: dayjs(item.createdAt).format(longDate),
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

const ProductList = ({ categoriesData }) => {
  return <TableContainer categoriesData={categoriesData} />;
};
export default ProductList;
