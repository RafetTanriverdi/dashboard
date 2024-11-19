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
import dayjs from "dayjs";
import CountUp from "react-countup";
import { Desktop } from "@rt/components/RTCharts/RTPie/data/Desktop";
import { Mobile } from "@rt/components/RTCharts/RTPie/data/Mobile";

const UserDashboard = ({ customerId }) => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });
  const customer = useQuery({
    queryKey: ["customers", customerId],
  });

  const desktopData = {
    legend: {
      ...Desktop.legend,
      translateX: -54,
      translateY: 20,
    },
    margin: {
      ...Desktop.margin,
      left: -40,
    },
  };
  const mobileData = {
    ...Mobile,
    legend: {
      ...Mobile.legend,
      translateX: -35,
      translateY: 30,
      direction: "column",
      anchor: "bottom-left",
      symbolShape: "circle",
      symbolSize: 10,
      itemHeight: 10,
      itemWidth: 10,
    },
    margin: {
      ...Mobile.margin,
      left: 35,
      right:0,
    },
  };

  let categoryList = [];
  let incomeData = [];
  let refundData = [];
  let categoryTimeLine = [];

  const charges = customer.data?.charges;

  for (let i = 0; i < charges?.length; i++) {
    const element = charges[i];
    const orderItems = JSON.parse(element.metadata.orderItems);
    const income = element.amount_captured;
    const refund = element.amount_refunded;

    incomeData.push(income);
    refundData.push(refund);

    const date = dayjs.unix(element.created).format("YYYY-MM-DD");

    for (let j = 0; j < orderItems.length; j++) {
      const element = orderItems[j];

      const filterCategories = products.data
        ?.filter((item) => item.productId === element?.productId)
        .map((item) => {
          return item?.categoryName;
        });

      if (filterCategories?.[0]) {
        categoryList.push(filterCategories[0]);
        categoryTimeLine.push({
          categoryName: filterCategories[0],
          date: date,
        });
      }
    }
  }
  console.log(categoryTimeLine);

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

  if (!customer.data || !products.data) return <RTSkeleton />;
  if (products.isLoading || customer.isLoading) return <RTSkeleton />;

  return (
    <>
      <Col xs={24} lg={12}>
        <Row
          style={{
            marginBottom: "10px",
          }}
        >
          <Col
            xs={12}
            style={{ width: "100%", height: "120px", display: "flex" }}
          >
            <Card style={{ width: "95%", height: "95%" }}>
              <Statistic
              className="income-statistic"
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
              className='refund-statistic'
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
          >
            <Card
              className="bump-container"
            >
              <RTCharts.Bump categoryTimeLine={categoryTimeLine} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={12}>
        <Card className="pie-container">
          {products.error || customer.error ? (
            <RTAlert
              message={products.error?.message || customer.error?.message}
              type="error"
            />
          ) : (
            <div style={{ width: "100%", display: "flex", height: "100%" }}>
              <RTCharts.Pie
                data={chartData}
                mobile={mobileData}
                desktop={desktopData}
              />
            </div>
          )}
        </Card>
      </Col>
    </>
  );
};

export default UserDashboard;
