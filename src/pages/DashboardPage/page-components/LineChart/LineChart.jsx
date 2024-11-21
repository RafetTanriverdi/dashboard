import { RTCharts } from "@rt/components/RTCharts";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { Card } from "antd";
import dayjs from "dayjs";

const LineChartContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });

  const fillMissingDates = (data, startDate, endDate) => {
    const filledData = [];
    const dateMap = new Map();

    data.forEach((item) => dateMap.set(item.x, item.y));

    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const formattedDate = dayjs(currentDate).format("MMMM, DD");
      filledData.push({
        x: formattedDate,
        y: dateMap.get(formattedDate) || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  };

  const groupByDate = (orders) => {
    const groupedData = {};

    orders.forEach((order) => {
      const date = dayjs(order.createdAt).format("MMMM, DD");
      order.products.forEach((product) => {
        if (!groupedData[product.productName]) {
          groupedData[product.productName] = {};
        }
        groupedData[product.productName][date] =
          (groupedData[product.productName][date] || 0) + product.quantity;
      });
    });

    return groupedData;
  };

  const transformDataForChart = (groupedData) => {
    const allDates = Object.values(groupedData)
      .flatMap((dates) => Object.keys(dates))
      .sort((a, b) => new Date(a) - new Date(b));
    const startDate = allDates[0];
    const endDate = allDates[allDates.length - 1];

    const transformed = [];

    Object.keys(groupedData).forEach((productName) => {
      const productData = Object.entries(groupedData[productName]).map(
        ([date, quantity]) => ({ x: date, y: quantity })
      );

      const filledData = fillMissingDates(productData, startDate, endDate);

      transformed.push({
        id: productName,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        data: filledData,
      });
    });

    return transformed.sort(
      (a, b) =>
        b.data.reduce((sum, point) => sum + point.y, 0) -
        a.data.reduce((sum, point) => sum + point.y, 0)
    );
  };

  const groupedData = groupByDate(data || []);
  const chartData = transformDataForChart(groupedData);

  const top5Products = chartData.slice(0, 5);
  if (isLoading) return <RTSkeleton />;
  if (error) return <RTAlert type="error" message="Something went wrong" />;

  return (
    <>
      <Typography.Title level={5} className="title">
        Best Selling Product All Time
      </Typography.Title>
      <RTCharts.Line data={top5Products} />
    </>
  );
};

const LineChart = () => {
  return (
    <Card className="line-container">
      <LineChartContainer />
    </Card>
  );
};

export default LineChart;
