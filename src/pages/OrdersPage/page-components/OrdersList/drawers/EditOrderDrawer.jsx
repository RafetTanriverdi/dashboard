import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import EditOrderPanel from "../panels/EditOrderPanel";

const EditOrderDrawer = ({ onClose, open, data }) => {
  const queryClient = useQueryClient();
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

  const handleClose = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Order", data.id] });
  };

  return (
    <Drawer title="Edit Order" onClose={handleClose} open={open} size="large">
      {isLoading && <RTSkeleton />}
      {error && <div>error</div>}
      {order && (
        <>
          <EditOrderPanel data={order} />
        </>
      )}
    </Drawer>
  );
};

export default EditOrderDrawer;
