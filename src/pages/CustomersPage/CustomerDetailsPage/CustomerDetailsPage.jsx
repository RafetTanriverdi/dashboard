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
        amount:'$ '+ (item.amount/100).toFixed(2),
        status: item.status,
        createdAt: dayjs.unix(item.created).format("MMMM,DD YYYY"),
        orderedProducts: JSON.parse(item.metadata.orderItems).length,
      };
    });

  return (
    <div style={{padding:'10px'}}>
      <Descriptions title="Customer Overview" items={items} bordered />
      <Row gutter={16}>
        <Col span={16}>
          
          <Table
            columns={columns}
            dataSource={tableData}
            onRow={(record) => ({
              onClick: () => setSelectedCharge(record),
              style: {
                cursor: "pointer",
                backgroundColor:
                  selectedCharge?.key === record.key ? "#e6f7ff" : "",
                  hover: {backgroundColor:'#f0f0f0'}
              },
            })}
          />
        </Col>
        <Col span={8}>
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
