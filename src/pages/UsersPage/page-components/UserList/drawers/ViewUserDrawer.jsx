import { ENDPOINTS } from "@rt/network/endpoints";
import { axiosInstance } from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewUserPanel from "../panels/ViewUserPanel";

const ViewUserDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name } = inheritedData;

console.log("key", key, "name", name);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["User", key],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.USER.GET.replace(":userId", key)),
  });
  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["User", key] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View User: " + name}
      placement="right"
      size="large"
    >
      <ViewUserPanel
        data={data?.data.data}
        isLoading={isLoading}
        error={error}
      />
    </Drawer>
  );
};

export default ViewUserDrawer;
