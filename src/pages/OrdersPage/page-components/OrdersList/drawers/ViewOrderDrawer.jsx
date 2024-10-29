import {  useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import ViewOrderPanel from "../panels/ViewOrderPanel";

const ViewOrderDrawer = ({ onClose, data, open }) => {
  const queryClient = useQueryClient();

  const handleClose = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Order", data.id] });
  };

  return (
    <Drawer
      title="Order Details"
      onClose={handleClose}
      open={open}
      size="large"
    >
      <ViewOrderPanel order={data} />
    </Drawer>
  );
};

export default ViewOrderDrawer;
