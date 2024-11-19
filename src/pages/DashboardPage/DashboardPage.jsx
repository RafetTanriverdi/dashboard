import { Card, Col, Row, Statistic } from "antd";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./DashboardPage.scss";
import { RTCharts } from "@rt/components/RTCharts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import { Desktop } from "@rt/components/RTCharts/RTPie/data/Desktop";
import { Mobile } from "@rt/components/RTCharts/RTPie/data/Mobile";

const DashboardPageContainer = () => {
  const funnelChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const { data: refund } = useQuery({
    queryKey: ["refund"],
    queryFn: () => {
      return axiosInstance
        .get(ENDPOINTS.STRIPE.REFUNDS)
        .then((res) => res.data);
    },
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => {
      const reponse = axiosInstance.get(ENDPOINTS.STRIPE.BALANCE);
      return reponse;
    },
  });

  const { data:orders } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });
  const { data:products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });
console.log(orders, products)

let categoryList = [];

for (let i=0 ; i<orders?.length; i++) {
  const element =orders[i];

  for (let j=0; j<element?.products.length; j++) {
    const product = element.products[j];

    const filterCategories = products?.filter((item) => item.productId === product?.productId).map((item) => {
      return item.categoryName;
    })
    if (filterCategories[0]) {
      categoryList.push(filterCategories[0]);
    }

  }


}
console.log(categoryList)

const categoryCountList =categoryList?.reduce((acc, category) => {
  const existingCategory = acc.find((item) => item.name === category);
  if (existingCategory) {
    existingCategory.value += 1;
  } else {
    acc.push({ name: category, value: 1 });
  }
  return acc;
}, []);
  
const chartData = categoryCountList?.map((item) => {
  return {
    id: item.name,
    label: item.name,
    value: item.value,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
    
  }
})
  const income =
    (balance?.data?.available[0]?.amount + balance?.data?.pending[0]?.amount) /
    100;

  const tax = income * 0.09;

  let refundAmount = 0;
  for (let i = 0; i < 1; i++) {
    refundAmount += refund?.data[i]?.amount / 100;
  }



  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.scrollLeft =
        (pieChartRef.current.scrollWidth - pieChartRef.current.clientWidth) / 2;
    }

    if (funnelChartRef.current) {
      funnelChartRef.current.scrollLeft =
        (funnelChartRef.current.scrollWidth -
          funnelChartRef.current.clientWidth) /
        2;
    }
  }, []);


const configuredDesktop = {
  ...Desktop,
  legend: {
    ...Desktop.legend,
  
    onClick:(e) => console.log(e)
  },
}


  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Income"
              value={income}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Tax"
              value={tax}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Refund"
              value={refundAmount}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Available Balance"
              value={balance?.data?.available[0]?.amount / 100}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={16}>
          <Card className="line-container">
            <RTCharts.Line />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="pie-container" ref={pieChartRef}>
            <RTCharts.Pie data={chartData}  desktop={configuredDesktop} mobile={Mobile} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card className="funnel-container" ref={funnelChartRef}>
            <RTCharts.Funnel />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card className="heat-map-container">
            <RTCharts.HeatMap />
          </Card>
        </Col>
      </Row>
    </>
  );
};

const DashboardPage = (props) => {
  const { title } = props.routeData;

  return (
    <MainLayout
      title={title}
      content={<DashboardPageContainer />}
      sider={<RTSider />}
    />
  );
};

export default DashboardPage;
