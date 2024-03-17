import { Drawer } from "antd";

const ViewProductDrawer = ({ onClose, open }) => {
  return (
    <Drawer
      onClose={onClose}
      open={open}
      title="View Product"
      placement="right"
      size='large'
    ></Drawer>
  );
};

export default ViewProductDrawer;
