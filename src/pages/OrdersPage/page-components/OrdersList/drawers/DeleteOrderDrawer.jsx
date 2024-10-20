import { Drawer } from "antd";
import ReactJson from "react-json-view";

const DeleteOrderDrawer = ({ onClose, open, data }) => {
  return (
    <Drawer onClose={onClose} open={open} size="large">
      <ReactJson src={data} />
    </Drawer>
  );
};

export default DeleteOrderDrawer;
