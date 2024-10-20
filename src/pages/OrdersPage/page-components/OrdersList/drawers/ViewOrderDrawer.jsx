import { Drawer } from "antd";
import ReactJson from "react-json-view";

const ViewOrderDrawer = ({ onClose, data, open }) => {
  return (
    <Drawer title="Order Details" onClose={onClose} open={open} size="large">
      <ReactJson src={data} />
    </Drawer>
  );
};

export default ViewOrderDrawer;
