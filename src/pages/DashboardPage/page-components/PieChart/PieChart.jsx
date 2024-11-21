import { RTCharts } from "@rt/components/RTCharts";
import { Desktop } from "@rt/components/RTCharts/RTPie/data/Desktop";
import { Mobile } from "@rt/components/RTCharts/RTPie/data/Mobile";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { Card } from "antd";
import { useRef } from "react";
import { useEffect } from "react";

const PieChartContainer = () => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.scrollLeft =
        (pieChartRef.current.scrollWidth - pieChartRef.current.clientWidth) / 2;
    }
  }, []);

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });

  let categoryList = [];

  for (let i = 0; i < orders?.length; i++) {
    const element = orders[i];

    for (let j = 0; j < element?.products.length; j++) {
      const product = element?.products[j];

      const filterCategories = products
        ?.filter((item) => item.productId === product?.productId)
        .map((item) => {
          return item.categoryName;
        });
      if (filterCategories?.[0]) {
        categoryList.push(filterCategories[0]);
      } else {
        categoryList.push([]);
      }
    }
  }

  const categoryCountList = categoryList?.reduce((acc, category) => {
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  const chartData = categoryCountList?.sort((a,b)=>b.value-a.value).slice(0,5).map((item) => {
    return {
      id: item.name,
      label: item.name,
      value: item.value,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
    };
  });

  const configuredPieDesktop = {
    ...Desktop,
    legend: {
      ...Desktop.legend,
      symbolSize: 14,
      itemsSpacing: 22,
      symbolShape: "square",
    },
  };
  const configuredPieMobile = {
    ...Mobile,
    legend: {
      ...Mobile.legend,
      symbolSize: 14,
      itemsSpacing: 16,
    },
    margin: {
      ...Mobile.margin,
      bottom: 60,
    },
  };

  if (loadingOrders || loadingProducts) return <RTSkeleton />;
  if (errorOrders || errorProducts)
    return (
      <RTAlert
        message={errorOrders.message || errorProducts.message}
        type="error"
      />
    );
  return (
    <>
      <Typography.Title level={5} className="title">
        Best Category
      </Typography.Title>
      <RTCharts.Pie
        data={chartData}
        desktop={configuredPieDesktop}
        mobile={configuredPieMobile}
      />
    </>
  );
};

const PieChart = () => {
  return (
    <Card className="pie-container">
      <PieChartContainer />
    </Card>
  );
};

export default PieChart;
