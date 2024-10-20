import { Drawer } from "antd";
import ReactJson from "react-json-view";

const RefundOrderDrawer = ({ onClose, open, data }) => {
  return (
    <Drawer title="Refund Order" onClose={onClose} open={open} size="large">
      <ReactJson src={data} />
    </Drawer>
  );
};

export default RefundOrderDrawer;
