import { RTButton } from "@rt/components/RTButton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm } from "antd";
import { Drawer } from "antd";
import DeleteCustomerPanel from "../panels/DeleteCustomerPanel";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const DeleteCustomerDrawer = ({ open, onClose, inheritedData }) => {
  const { key } = inheritedData;
  const queryClient = useQueryClient();
  const { context, openNotification } = Notification();

  const mutation = useMutation({
    mutationKey: ["deleteCustomer"],
    mutationFn: () =>
      axiosInstance.delete(
        ENDPOINTS.CUSTOMERS.DELETE.replace(":customerId", inheritedData.key)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Customers"] });
      openNotification({
        key: key,
        type: "success",
        message: "Customer Status Updated Successfully",
        duration: 2,
        onClose: () => {
          handleClose();
        },
      });
    },
    onError: (error) => {
      openNotification({
        type: "error",
        message: "Error: Customer Status Update Failed",
        duration: 2.5,
      });
      console.error("Error: Customer Status Update Failed", error);
    },
  });

  const handleClose = () => {
    queryClient.removeQueries({ queryKey: ["customersEdit", key] });
    onClose();
  };
  return (
    <>
      {context}
      <Drawer
        open={open}
        title={`Delete Customer: ${inheritedData.name}`}
        size="large"
        onClose={handleClose}
        footer={
          <>
            <Popconfirm
              title="Are you sure you want to delete this customer?"
              description={
                <>
                  This action will delete the user from the database and Stripe,{" "}
                  <br />
                  and all actions related to this user will also be deleted.
                </>
              }
              onCancel={onClose}
            >
              <RTButton.add text={"Delete"} loading={mutation.isPending} />
            </Popconfirm>
          </>
        }
      >
        <DeleteCustomerPanel inheritedData={inheritedData} />
      </Drawer>{" "}
    </>
  );
};

export default DeleteCustomerDrawer;
