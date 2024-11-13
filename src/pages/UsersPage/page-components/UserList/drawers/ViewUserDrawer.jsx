import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewUserPanel from "../panels/ViewUserPanel";

const ViewUserDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name } = inheritedData;

  const queryClient = useQueryClient();

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
      <ViewUserPanel id={key} />
    </Drawer>
  );
};

export default ViewUserDrawer;
