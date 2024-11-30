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
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import { Permissions } from "@rt/utils/permission-util";
import { RTButton } from "@rt/components/RTButton";
import dayjs from "dayjs";
import { longDateFormat } from "@rt/utils/long-dateFotmat";

const TableAntdContainer = ({ style, dataSource }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Product Amount",
      dataIndex: "productAmount",
      key: "productAmount",
      sorter: (a, b) => a.productAmount - b.productAmount,
    },
    {
      title: "Owner",
      dataIndex: "ownerName",
      key: "ownerName",
      sorter: (a, b) => a.ownerName.localeCompare(b.ownerName),
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
        return <TableActions data={record} />;
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
      <a role="button" onClick={() => showDrawer(TableView.VIEW)}>
        View
      </a>
      <RTButton.action
        action={Permissions.categories.actions.update}
        subject={Permissions.categories.subject}
        onClick={() => showDrawer(TableView.EDIT)}
        name="Edit"
      />
      <RTButton.action
        action={Permissions.categories.actions.delete}
        subject={Permissions.categories.subject}
        onClick={() => showDrawer(TableView.DELETE)}
        name="Delete"
      />
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
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data),
  });

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item) => {
        return {
          key: item.categoryId,
          id: item.categoryId,
          name: item.categoryName,
          productAmount: item.productCount,
          ownerName: item.ownerName,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
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

const CategoryList = ({ className }) => {
  return (
    <div className={className}>
      <TableContainer />
    </div>
  );
};
export default CategoryList;
