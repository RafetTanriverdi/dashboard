import { RTCharts } from "@rt/components/RTCharts";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { truncateStr } from "@rt/utils/truncate";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { Card } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore)

const LineChartContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });

  // Fills missing months with default value (0)
  const fillMissingMonths = (data, startDate, endDate) => {
    const filledData = [];
    const dateMap = new Map(data.map((item) => [item.x, item.y]));

    let currentMonth = dayjs(startDate).startOf("month"); // Ensure this is a dayjs object
    const lastMonth = dayjs(endDate).endOf("month"); // Ensure this is a dayjs object

    while (currentMonth.isSameOrBefore(dayjs(lastMonth))) {
      const formattedDate = currentMonth.format("MMM, YYYY");
      filledData.push({
        x: formattedDate,
        y: dateMap.get(formattedDate) || 0, // Use 0 if the month is missing
      });
      currentMonth = currentMonth.add(1, "month"); // Increment by one month
    }

    return filledData;
  };

  // Groups orders by product and month
  const groupByMonth = (orders) => {
    const groupedData = {};

    orders.forEach((order) => {
      const month = dayjs(order.createdAt).format("MMM, YYYY");
      order.products.forEach((product) => {
        if (!groupedData[product.productName]) {
          groupedData[product.productName] = {};
        }
        groupedData[product.productName][month] =
          (groupedData[product.productName][month] || 0) + product.quantity;
      });
    });

    return groupedData;
  };

  // Transforms grouped data for chart display
  const transformDataForChart = (groupedData) => {
    const currentMonth = dayjs();
    const startMonth = currentMonth.subtract(6, "month").startOf("month");
    const endMonth = currentMonth.endOf("month");

    const transformed = [];

    Object.keys(groupedData).forEach((productName) => {
      const productData = Object.entries(groupedData[productName])
        .filter(([month]) =>
          dayjs(month, "MMM, YYYY").isBetween(startMonth, endMonth, null, "[]")
        )
        .map(([month, quantity]) => ({
          x: month,
          y: quantity,
        }));

      // Fill missing months with 0
      const filledData = fillMissingMonths(productData, startMonth, endMonth);

      transformed.push({
        id: truncateStr(productName, 20),
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

  if (isLoading) return <RTSkeleton />;
  if (error)
    return <RTAlert type="error" message={error.response?.data?.message} />;

  // Process the data
  const groupedData = groupByMonth(data || []);
  const chartData = transformDataForChart(groupedData);
  const top5Products = chartData.slice(0, 5);

  return (
    <>
      <Typography.Title level={5} className="title">
        Best Selling Products (Last 6 Months)
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
