import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import EditOrderPanel from "../panels/EditOrderPanel";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { Permissions } from "@rt/utils/permission-util";

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

  if (isLoading) return <RTSkeleton />;
  if (error)
    return <RTAlert message={error.response.data.message} type="error" />;

  return (
    <Drawer title="Edit Order" onClose={handleClose} open={open} size="large">
      <RTAuthContainer
        action={Permissions.orders.actions.update}
        subject={Permissions.orders.subject}
      >
        <EditOrderPanel data={order} />
      </RTAuthContainer>
    </Drawer>
  );
};

export default EditOrderDrawer;
