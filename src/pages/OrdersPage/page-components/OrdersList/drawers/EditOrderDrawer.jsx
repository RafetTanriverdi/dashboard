import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import EditOrderPanel from "../panels/EditOrderPanel";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { Permissions } from "@rt/utils/permission-util";

const EditOrderDrawer = ({ onClose, open, data }) => {
  const queryClient = useQueryClient();

  const handleClose = () => {
    onClose();
    queryClient.removeQueries({ queryKey: ["Order", data.id] });
  };

  return (
    <Drawer title="Edit Order" onClose={handleClose} open={open} size="large">
      <RTAuthContainer
        action={Permissions.orders.actions.update}
        subject={Permissions.orders.subject}
      >
        <EditOrderPanel orderId={data.id} />
      </RTAuthContainer>
    </Drawer>
  );
};

export default EditOrderDrawer;
