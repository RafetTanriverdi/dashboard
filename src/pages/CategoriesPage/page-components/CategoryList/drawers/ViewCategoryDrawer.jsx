import { ENDPOINTS } from "@rt/network/endpoints";
import { axiosInstance } from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewCategoryPanel from "../panels/ViewCategoryPanel";

const ViewCategoryDrawer = ({ onClose, open, inheritedData }) => {
  const { slug, name } = inheritedData;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Category", slug],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.GET.replace(":categoryTitle", slug)),
  });
  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Category", slug] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View Category: " + name}
      placement="right"
      size="large"
    >
      <ViewCategoryPanel
        data={data?.data.data}
        isLoading={isLoading}
        error={error}
      />
    </Drawer>
  );
};

export default ViewCategoryDrawer;
