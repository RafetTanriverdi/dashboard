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
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import dayjs from "dayjs";
import { Badge } from "antd";
import { Permissions } from "@rt/utils/permission-util";
import { RTButton } from "@rt/components/RTButton";
import { useSearchParams } from "react-router-dom";
import { longDateFormat } from "@rt/utils/long-dateFotmat";

const TableAntdContainer = ({ style, dataSource, categoriesData }) => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      filters: getCategoryFilters(dataSource, "categoryName"),
      onFilter: (value, record) => record.categoryName.startsWith(value),
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
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => longDateFormat(createdAt),
      sorter: (a, b) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => longDateFormat(updatedAt),
      sorter: (a, b) =>
        dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return <TableActions data={record} categoriesData={categoriesData} />;
      },
    },
  ];

  return (
    <Table
      scroll={{
        x: "max-content",
      }}
      style={style}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

const TableActions = ({ data, categoriesData }) => {
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
      <a role="button" onClick={() => showDrawer(TableView.VIEW)}>
        View
      </a>
      <RTButton.action
        action={Permissions.products.actions.update}
        subject={Permissions.products.subject}
        onClick={() => showDrawer(TableView.EDIT)}
        name="Edit"
      />
      <RTButton.action
        action={Permissions.products.actions.delete}
        subject={Permissions.products.subject}
        onClick={() => showDrawer(TableView.DELETE)}
        name="Delete"
      />

      {open && type === TableView.VIEW && (
        <ViewProductDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
      {open && type === TableView.EDIT && (
        <EditProductDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
          categoriesData={categoriesData}
        />
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });

  let tableData = [];

  const [searchParams] = useSearchParams();

  const lookingForProduct = searchParams.get("productId");
  if (hasArrayElement(data)) {
    tableData = data
      .filter(
        (item) => !lookingForProduct || item.productId === lookingForProduct
      )
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item) => {
        return {
          key: item.productId,
          id: item.productId,
          name: item.productName,
          price: item.price,
          owner: item.ownerName,
          status: item.active,
          description: item.description,
          stock: item.stock,
          imageUrl: item.imageUrl,
          imageUrls: item.imageUrls,
          categoryName: item.categoryName,
          categoryId: item.categoryId,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
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
      <TableAntdContainer
        style={{ width: "100%" }}
        dataSource={tableData}
        categoriesData={categoriesData}
      />
    );
  }
};

const ProductList = ({ categoriesData, className }) => {
  return (
    <div className={className}>
      <TableContainer categoriesData={categoriesData} />
    </div>
  );
};
export default ProductList;
