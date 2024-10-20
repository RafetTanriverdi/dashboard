import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Drawer, Timeline } from "antd";
import ReactJson from "react-json-view";

const EditOrderDrawer = ({ onClose, open, data }) => {
  console.log(data.id);
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Order", data.id],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.ORDERS.GET.replace(":orderId", data.id))
        .then((res) => res.data),
  });

  return (
    <Drawer onClose={onClose} open={open} size="large">
      {isLoading && <RTSkeleton />}
      {error && <div>error</div>}
      {order && (
        <>
          <ReactJson src={order} />
          <Timeline
            mode="alternate"
            items={[
              {
                children: "Order created by user",
                label: "2021-09-01 ",
              },
              {
                children: "Order updated by user",
                label: "2021-09-01",
              },
              {
                children: "Order deleted by user",
                label: "2021-09-01 ",
              },
            ]}
          />
        </>
      )}
    </Drawer>
  );
};

export default EditOrderDrawer;
