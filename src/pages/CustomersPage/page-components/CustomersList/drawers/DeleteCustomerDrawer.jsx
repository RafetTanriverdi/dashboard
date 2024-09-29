import { RTButton } from "@rt/components/RTButton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation } from "@tanstack/react-query";
import { Drawer } from "antd";
import ReactJson from "react-json-view";

const DeleteCustomerDrawer = ({ open, onClose, inheritedData }) => {
  const mutation = useMutation({
    mutationKey: ["deleteCustomer"],
    mutationFn: () =>
      axiosInstance.delete(
        ENDPOINTS.CUSTOMERS.DELETE.replace(":customerId", inheritedData.key)
      ),
  });

  return (
    <Drawer
      open={open}
      title={`Delete Customer: ${inheritedData.name}`}
      size="large"
      onClose={onClose}
      extra={
        <>
          <RTButton.add text={"Delete"} onClick={() => mutation.mutate()} loading={mutation.isPending} />
        </>
      }
    >
      <ReactJson src={inheritedData} />
    </Drawer>
  );
};

export default DeleteCustomerDrawer;
