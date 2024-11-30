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
import { Tag } from "antd";
import { capitalizeFirstLetter } from "@rt/utils/capitalizeFirstLetter";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
        </>
      ),
    },
    {
      title: "Created ",
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
      key: "actions",
      render: (_, record) => <TableActions data={record} />,
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
        status: capitalizeFirstLetter(item.status),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

  if (isLoading) return <RTSkeleton />;
  if (error)
    return <RTAlert type="error" message={error.response.data.message} />;

  return <TableAntdContainer dataSource={dataSource} />;
};

const CustomersList = ({ className }) => {
  return <TableContainer className={className} />;
};

export default CustomersList;
