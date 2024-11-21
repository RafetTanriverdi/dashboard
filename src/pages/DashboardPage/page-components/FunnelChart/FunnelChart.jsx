import { RTCharts } from "@rt/components/RTCharts";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { Card } from "antd";
import { useRef } from "react";
import { useEffect } from "react";

const FunnelChartContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Orders List"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });

  const OrderedProductAmout = [];

  for (let i = 0; i < data?.length; i++) {
    const element = data[i];
    for (let j = 0; j < element?.products.length; j++) {
      const product = element?.products[j];
      OrderedProductAmout.push(product.quantity);
    }
  }

  const orderedProduct = OrderedProductAmout?.reduce(
    (acc, product) => acc + product,
    0
  );

  const datas = [
    {
      id: "step_viewed",
      value: orderedProduct * 20,
      label: "Viewed",
    },
    {
      id: "step_clicked",
      value: orderedProduct * 8,
      label: "Clicked",
    },
    {
      id: "step_add_to_card",
      value: orderedProduct * 3,
      label: "Add To Card",
    },
    {
      id: "step_purchased",
      value: orderedProduct,
      label: "Purchased",
    },
  ];

  if (isLoading) return <RTSkeleton />;
  if (error) return <RTAlert message="Error" description={error.message} />;
  return <>
  <Typography.Title level={5} className="title">Conversion Funnel </Typography.Title>
  <RTCharts.Funnel data={datas} />
  </>
};

const FunnelChart = () => {
  const funnelChartRef = useRef(null);

  useEffect(() => {
    if (funnelChartRef.current) {
      funnelChartRef.current.scrollLeft =
        (funnelChartRef.current.scrollWidth -
          funnelChartRef.current.clientWidth) /
        2;
    }
  }, []);

  return (
    <Card className="funnel-container" ref={funnelChartRef}>
      <FunnelChartContainer />
    </Card>
  );
};

export default FunnelChart;
