import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { TableView } from "./CategoryActions";
import ViewCategoryDrawer from "./drawers/ViewCategoryDrawer";
import { useState } from "react";
import EditCategoryDrawer from "./drawers/EditCategoryDrawer";
import DeleteCategoryDrawer from "./drawers/DeleteCategoryDrawer";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";

const TableAntdContainer = ({ style, dataSource }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      sorter: (a, b) => a.price - b.price,
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
        <ViewCategoryDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
        />
      )}
      {open && type === TableView.EDIT && (
        <EditCategoryDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
        />
      )}
      {open && type === TableView.DELETE && (
        <DeleteCategoryDrawer
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
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data.data),
  });

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
          name: item.name,
          slug: item.slug,
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

const CategoryList = () => {
  return <TableContainer />;
};
export default CategoryList;
