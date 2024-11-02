import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewProductPanel from "../panels/ViewProductPanel";

const ViewProductDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name } = inheritedData;

  const queryClient = useQueryClient();

  const handleCloseDrawer = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["product", key] });
  };

  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      title={"View Product: " + name}
      placement="right"
      size="large"
    >
      <ViewProductPanel id={key} />
    </Drawer>
  );
};

export default ViewProductDrawer;
