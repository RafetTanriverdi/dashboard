import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewCategoryPanel from "../panels/ViewCategoryPanel";

const ViewCategoryDrawer = ({ onClose, open, inheritedData }) => {
  const { id, name } = inheritedData;

  const queryClient = useQueryClient();

  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Category", id] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View Category: " + name}
      placement="right"
      size="large"
    >
      <ViewCategoryPanel categoryId={id} />
    </Drawer>
  );
};

export default ViewCategoryDrawer;
