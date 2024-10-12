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
import { Space } from "antd";
import { Typography } from "antd";
import "./CustomerDetailsPage.scss";
import { Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { RTCharts } from "@rt/components/RTCharts";

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
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "5px",
        }}
      >
        <Typography.Title level={4}>Customer Overview</Typography.Title>
      </Space>

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        align="top"
        style={{ marginBottom: "5px" }}
      >
        <Col xs={24} sm={6} md={4} lg={2}>
          <Avatar src={data?.profilePictureUrl} shape="square" size={100} />
        </Col>
        <Col xs={24} sm={18} md={20} lg={22}>
          <Descriptions bordered layout="horizontal" items={items} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} md={16}>
          <Table
            columns={columns}
            dataSource={tableData}
            onRow={(record) => {
              return {
                onClick: () => {
                  setSelectedCharge(record);
                },
              };
            }}
            rowSelection={{
              type: "radio",
              onSelect: (record) => setSelectedCharge(record),
              selectedRowKeys: [selectedCharge?.key],
            }}
            scroll={{
              x: 'max-content',
            }}
          />
        </Col>
        <Col xs={24} md={8}>
          {selectedCharge && (
            <Card title="Selected Charge Details">
              <p>
                <strong>Amount:</strong> {selectedCharge.amount}
              </p>
              <p>
                <strong>Status:</strong> {selectedCharge.status}
              </p>
              <p>
                <strong>Ordered Products:</strong>{" "}
                {selectedCharge.orderedProducts}
              </p>
              <p>
                <strong>Created At:</strong> {selectedCharge.createdAt}
              </p>
            </Card>
          )}
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
        <Col xs={24} lg={12}>
          <Card style={{ height: "50%" }}>
            <Statistic
              title="Cost"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="%" />
              )}
            />
          </Card>

          <Card style={{ height: "50%" }}>
            <Statistic
              title="Cost"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="%" />
              )}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          lg={12}
          style={{ width: "100%", height: "650px", display: "flex" }}
        >
          <Card
            className="pie-container"
            style={{ width: "100%", height: "100%" }}
          >
            <RTCharts.Pie />
          </Card>
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
