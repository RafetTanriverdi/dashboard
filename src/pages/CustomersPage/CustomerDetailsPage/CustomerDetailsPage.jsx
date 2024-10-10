import { useState, useEffect } from "react";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import CustomerLayout from "@rt/layout/MainLayout/CustomerLayout/CustomerLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Badge, Table, Card, Row, Col } from "antd";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import ReactJson from "react-json-view";
import { useParams } from "react-router-dom";
import { Avatar } from "antd";
import { Typography } from "antd";
import "./CustomerDetailsPage.scss";

const CustomerDetailsPageContainer = ({ data, error, isLoading }) => {
  const [selectedCharge, setSelectedCharge] = useState(null);

  useEffect(() => {
    if (data?.charges?.length > 0) {
      setSelectedCharge({
        key: data.charges[0].id,
        amount: data.charges[0].amount,
        status: data.charges[0].status,
        createdAt: dayjs.unix(data.charges[0].created).format("MMMM,DD YYYY"),
        orderedProducts: JSON.parse(data.charges[0].metadata.orderItems).length,
      });
    }
  }, [data]);

  if (isLoading) return <RTSkeleton />;
  if (error) return <div>{error.message}</div>;

  const items = [
    { label: "Name", children: data?.name },
    { label: "Email", children: data?.email },
    { label: "Phone", children: data?.phone },
    {
      label: "Status",
      children: (
        <Badge
          status={data?.status === "active" ? "success" : "error"}
          text={data?.status}
        />
      ),
    },
    {
      label: "Created",
      children: dayjs(data?.createdAt).format("MMMM,DD YYYY"),
    },
    {
      label: "Updated",
      children: dayjs(data?.updatedAt).format("MMMM,DD YYYY"),
    },
  ];

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ordered Products",
      dataIndex: "orderedProducts",
      key: "orderedProducts",
    },
  ];

  let tableData = [];
  tableData = data?.charges
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .map((item) => {
      return {
        key: item.id,
        amount: "$ " + (item.amount / 100).toFixed(2),
        status: item.status,
        createdAt: dayjs.unix(item.created).format("MMMM,DD YYYY"),
        orderedProducts: JSON.parse(item.metadata.orderItems).length,
      };
    });
  console.log(data?.profilePictureUrl);

  return (
    <div style={{ padding: "10px" }}>
      <Typography.Title level={4}>Customer Overview</Typography.Title>

      <Row gutter={16} align="middle">
        {/* Avatar */}
        <Col xs={24} sm={6} md={4} lg={2}>
          <Avatar src={data?.profilePictureUrl} shape="square" size={100} />
        </Col>

        {/* Descriptions */}
        <Col xs={24} sm={18} md={20} lg={22}>
          <Descriptions
            items={items}
            bordered
            layout="horizontal"
            column={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24} md={16}>
          <Table columns={columns} dataSource={tableData} />
        </Col>
        <Col xs={24} md={8}>
          <Card title="Selected Charge Details">...</Card>
        </Col>
      </Row>

      <ReactJson src={data} />
    </div>
  );
};

const CustomerDetailsPage = () => {
  const params = useParams();
  const { customerId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINTS.CUSTOMERS.GET.replace(":customerId", customerId)
      ),
  });

  return (
    <CustomerLayout
      title={data ? data?.data?.name : "Customer Name"}
      content={
        <CustomerDetailsPageContainer
          data={data?.data}
          error={error}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default CustomerDetailsPage;
