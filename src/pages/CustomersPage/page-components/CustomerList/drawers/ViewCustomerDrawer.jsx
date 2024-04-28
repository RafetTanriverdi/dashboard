import { ENDPOINTS } from "@rt/network/endpoints";
import { axiosInstance } from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewCustomerPanel from "../panels/ViewCustomerPanel";

const ViewCustomerDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name } = inheritedData;

console.log("key", key, "name", name);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Customer", key],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.USER.GET.replace(":userId", key)),
  });
  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Customer", key] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View Customer: " + name}
      placement="right"
      size="large"
    >
      <ViewCustomerPanel
        data={data?.data.data}
        isLoading={isLoading}
        error={error}
      />
    </Drawer>
  );
};

export default ViewCustomerDrawer;
