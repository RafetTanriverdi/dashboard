import { hasArrayElement } from "@rt/utils/array-utils";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import { TableView } from "./CustomerActions";
import ViewCustomerDrawer from "./drawers/ViewCustomerDrawer";
import { useState } from "react";
import EditCustomerDrawer from "./drawers/EditCustomerDrawer";
import DeleteCustomerDrawer from "./drawers/DeleteCustomerDrawer";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";

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
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
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
        <ViewCustomerDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
        />
      )}
      {open && type === TableView.EDIT && (
        <EditCustomerDrawer
          onClose={onClose}
          open={open}
          inheritedData={data}
        />
      )}
      {open && type === TableView.DELETE && (
        <DeleteCustomerDrawer
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
    queryKey: ["customers"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.USER.LIST).then((res) => res.data.data),
  });

  let tableData = [];

  if (hasArrayElement(data)) {
    tableData = data
      .sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .map((item) => {
        return {
          key: item._id,
          name: item.name,
          email: item.email,
          number: item.number,
          createdAt: item.createdAt,
          password: item.password,
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

const CustomerList = () => {
  return <TableContainer />;
};
export default CustomerList;
