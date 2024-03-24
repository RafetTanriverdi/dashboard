import { Drawer } from "antd";
import ReactJson from "react-json-view";

const ViewProductDrawer = ({ onClose, open,data }) => {

  return (
    <Drawer
      onClose={onClose}
      open={open}
      title="View Product"
      placement="right"
      size='large'
    >
      <ReactJson src={data} />
    </Drawer>
  );
};

export default ViewProductDrawer;
