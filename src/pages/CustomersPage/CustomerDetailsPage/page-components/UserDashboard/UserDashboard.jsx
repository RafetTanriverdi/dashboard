import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { RTCharts } from "@rt/components/RTCharts";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Row } from "antd";
import { Col, Statistic } from "antd";
import { Card } from "antd";
import CountUp from "react-countup";

const UserDashboard = ({ customerId }) => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });
  const customer = useQuery({
    queryKey: ["customers", customerId],
  });

  let categoryList = [];
  let incomeData = [];
  let refundData = [];

  const charges = customer.data?.charges;

  for (let i = 0; i < charges?.length; i++) {
    const element = charges[i];
    const orderItems = JSON.parse(element.metadata.orderItems);
    const income = element.amount_captured;
    const refund = element.amount_refunded;

    incomeData.push(income);
    refundData.push(refund);

    for (let j = 0; j < orderItems.length; j++) {
      const element = orderItems[j];

      const filterCategories = products.data
        ?.filter((item) => item.productId === element?.productId)
        .map((item) => {
          return item?.categoryName;
        });

      if (filterCategories?.[0]) {
        categoryList.push(filterCategories[0]);
      }
    }
  }

  const income = incomeData.reduce((acc, item) => acc + item, 0) / 100;
  const refund = refundData.reduce((acc, item) => acc + item, 0) / 100;

  const categoryCountList = categoryList?.reduce((acc, category) => {
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  const chartData = categoryCountList
    ?.sort((a, b) => b.value - a.value)
    .slice(0, 7)
    .map((item) => {
      return {
        id: item.name,
        label: item.name,
        value: item.value,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      };
    });

  if (products.isLoading || customer.isLoading) return <RTSkeleton />;

  return (
    <>
      <Col xs={24} lg={12}>
        <Row>
          <Col
            xs={12}
            style={{ width: "100%", height: "120px", display: "flex" }}
          >
            <Card style={{ width: "95%", height: "95%" }}>
              <Statistic
                title="Income"
                value={income}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
                formatter={(value) => <CountUp end={value} decimals={2} />}
              />
            </Card>
          </Col>
          <Col
            xs={12}
            style={{ width: "100%", height: "120px", display: "flex" }}
          >
            <Card style={{ width: "100%", height: "95%", marginBottom: "5px" }}>
              <Statistic
                title="Refund"
                value={refund}
                precision={2}
                valueStyle={{ color: "red" }}
                prefix={<ArrowDownOutlined />}
                suffix="$"
                formatter={(value) => <CountUp end={value} decimals={2} />}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            style={{ width: "100%", height: "330px", display: "flex" }}
          >
            <Card
              className="bar-container"
              style={{ width: "100%", height: "100%" }}
            >
              <RTCharts.Bar />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col
        xs={24}
        lg={12}
        style={{ width: "100%", height: "450px", display: "flex" }}
      >
        <Card
          className="pie-container"
          style={{ width: "100%", height: "100%" }}
        >
          {products.error || customer.error ? (
            <RTAlert
              message={products.error?.message || customer.error?.message}
              type="error"
            />
          ) : (
            <div style={{ width: "100%", display: "flex", height: "100%" }}>
              <RTCharts.Pie data={chartData} />
            </div>
          )}
        </Card>
      </Col>
    </>
  );
};

export default UserDashboard;
