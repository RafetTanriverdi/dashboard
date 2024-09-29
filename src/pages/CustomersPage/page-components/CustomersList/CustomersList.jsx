import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { TableView } from "./CustomersAction";
import EditCustomerStatusDrawer from "./drawers/EditCustomerStatusDrawer";
import DeleteCustomerDrawer from "./drawers/DeleteCustomerDrawer";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { generatePath } from "react-router-dom";

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
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Created ",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => <TableActions data={record} />,
    },
  ];
  return (
    <Table
      style={style}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

const TableActions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(TableView.VIEW);
  const navigate = useNavigate();

  const showDrawer = (type) => {
    setType(type);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space>
      <a
        role="button"
        onClick={() =>
          navigate(
            generatePath(getRoutePath(ROUTES_ID.customerDetails), {
              customerId: `${data.customerId}`,
            })
          )
        }
      >
        View
      </a>
      <a role="button" onClick={() => showDrawer(TableView.EDIT)}>
        Edit
      </a>
      <a role="button" onClick={() => showDrawer(TableView.DELETE)}>
        Delete
      </a>
      {open && type === TableView.EDIT && (
        <EditCustomerStatusDrawer
          open={open}
          onClose={onClose}
          inheritedData={data}
        />
      )}
      {open && type === TableView.DELETE && (
        <DeleteCustomerDrawer
          open={open}
          onClose={onClose}
          inheritedData={data}
        />
      )}
    </Space>
  );
};

const TableContainer = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Customers"],
    queryFn: () => axiosInstance.get(ENDPOINTS.CUSTOMERS.LIST),
  });

  let dataSource = [];

  dataSource = data?.data
    ?.sort((a, b) => {
      new Date(a.createdAt) - new Date(b.createdAt);
    })
    .map((item) => {
      return {
        key: item.customerId,
        customerId: item.customerId,
        name: item.name,
        email: item.email,
        number: item.phone,
        addresses: item.addresses,
        status: item.status,
        createdAt: dayjs(item.createdAt).format("MMMM D, YYYY"),
        updatedAt: dayjs(item.updatedAt).format("MMMM D, YYYY"),
      };
    });

  if (isLoading) return <RTSkeleton />;
  if (error) return <div>Error</div>;

  return (
    <TableAntdContainer
      style={{ width: "90%", margin: "20px auto" }}
      dataSource={dataSource}
    />
  );
};

const CustomersList = () => {
  return <TableContainer />;
};

export default CustomersList;
