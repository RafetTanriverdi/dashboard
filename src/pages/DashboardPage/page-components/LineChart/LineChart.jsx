import { RTCharts } from "@rt/components/RTCharts";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import dayjs from "dayjs";

const LineChartContainer = () => {
    const { data, loading, error } = useQuery({
      queryKey: ["Orders List"],
      queryFn: () =>
        axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
    });
  

    // Fill missing dates and format them
    const fillMissingDates = (data, startDate, endDate) => {
      const filledData = [];
      const dateMap = new Map();
  
      // Store existing dates in a map
      data.forEach((item) => dateMap.set(item.x, item.y));
  
      let currentDate = new Date(startDate);
      const lastDate = new Date(endDate);
  
      while (currentDate <= lastDate) {
        const formattedDate = dayjs(currentDate).format("MMMM, DD");
        filledData.push({
          x: formattedDate,
          y: dateMap.get(formattedDate) || 0, // Use 0 if no data
        });
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
  
      return filledData;
    };
  
    // Group data by date
    const groupByDate = (orders) => {
      const groupedData = {};
  
      orders.forEach((order) => {
        const date = dayjs(order.createdAt).format("MMMM, DD"); // Format date
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
  
    // Transform data for the chart
    const transformDataForChart = (groupedData) => {
      const allDates = Object.values(groupedData)
        .flatMap((dates) => Object.keys(dates))
        .sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order
      const startDate = allDates[0];
      const endDate = allDates[allDates.length - 1];
  
      const transformed = [];
  
      Object.keys(groupedData).forEach((productName) => {
        const productData = Object.entries(groupedData[productName]).map(
          ([date, quantity]) => ({ x: date, y: quantity })
        );
  
        // Fill missing dates and format them
        const filledData = fillMissingDates(productData, startDate, endDate);
  
        transformed.push({
          id: productName,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color
          data: filledData,
        });
      });
  
      return transformed.sort(
        (a, b) =>
          b.data.reduce((sum, point) => sum + point.y, 0) -
          a.data.reduce((sum, point) => sum + point.y, 0)
      ); // Sort by total quantity
    };
  
    const groupedData = groupByDate(data || []);
    const chartData = transformDataForChart(groupedData);
  
    // Get top 5 products
    const top5Products = chartData.slice(0, 5);
  console.log(top5Products, "Top 5 Products with Filled and Formatted Dates");
    console.log(top5Products, "Top 5 Products with Filled and Formatted Dates");
    if (loading) return <RTSkeleton />;
    if (error) return <RTAlert type="error" message="Something went wrong" />;
  
    return (
      <>
        <h2>Top 5 Products (Line Chart with Formatted Dates)</h2>
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
  