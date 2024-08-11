import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { TableView } from "./UserActions";
import ViewUserDrawer from "./drawers/ViewUserDrawer";
import { useState } from "react";
import EditUserDrawer from "./drawers/EditUserDrawer";
import DeleteUserDrawer from "./drawers/DeleteUserDrawer";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import dayjs from "dayjs";
import { Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";

const TableAntdContainer = ({ style, dataSource }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Account Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag
            color={status === "CONFIRMED" ? "success" : "processing"}
            icon={
              status === "CONFIRMED" ? (
                <CheckCircleOutlined />
              ) : (
                <SyncOutlined spin />
              )
            }
          >
            {status === "CONFIRMED" ? "Confirmed" : "Pending"}
          </Tag>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Updated",
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
      <a role="button" onClick={() => showDrawer(TableView.VIEW)}>
        View
      </a>
      <a role="button" onClick={() => showDrawer(TableView.EDIT)}>
        Edit
      </a>
      <a role="button" onClick={() => showDrawer(TableView.DELETE)}>
        Delete
      </a>
      {open && type === TableView.VIEW && (
        <ViewUserDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
      {open && type === TableView.EDIT && (
        <EditUserDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
      {open && type === TableView.DELETE && (
        <DeleteUserDrawer onClose={onClose} open={open} inheritedData={data} />
      )}
    </Space>
  );
};

const TableContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.USER.LIST).then((res) => res.data),
    staleTime: 0,
  });

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item) => {
        return {
          key: item.userId,
          name: item.name,
          email: item.email,
          number: item.phoneNumber,
          permissions: item.permissions,
          role: item.role,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: dayjs(item.updatedAt).format("MMMM D, YYYY"),
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

const UserList = () => {
  return <TableContainer />;
};
export default UserList;
