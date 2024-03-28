import { ENDPOINTS } from "@rt/network/endpoints";
import { axiosInstance } from "@rt/network/httpRequester";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewProductPanel from "../panels/ViewProductPanel";

const ViewProductDrawer = ({ onClose, open, inheritedData }) => {
  const { slug, title } = inheritedData;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINTS.PRODUCT.GET.replace(":productTitle", slug )
      ),
  });
  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["product", slug] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View Product: " + title}
      placement="right"
      size="large"
    >
      <ViewProductPanel
        data={data?.data.data}
        isLoading={isLoading}
        error={error}
      />
    </Drawer>
  );
};

export default ViewProductDrawer;
