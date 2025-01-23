/* eslint-disable no-unused-vars */
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer } from "antd";
import { Form } from "antd";
import { useState } from "react";
import EditCustomerStatusPanel from "../panels/EditCustomerStatusPanel";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { RTButton } from "@rt/components/RTButton";
import { Permissions } from "@rt/utils/permission-util";

const EditCustomerStatusDrawer = ({ open, onClose, inheritedData }) => {
  const { key, name, status, email } = inheritedData;

  const [newStatus, setNewStatus] = useState(status);
  const { context, openNotification } = Notification();

  const queryClient = useQueryClient();

  const postBody = {
    status: newStatus,
    cognitoUsername: email,
  };

  const mutation = useMutation({
    mutationKey: "updateCustomerStatus",
    mutationFn: (updateCustomerStatus) => {
      return axiosInstance.patch(
        ENDPOINTS.CUSTOMERS.UPDATE.replace(":customerId", key),
        updateCustomerStatus
      );
    },
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
        title={`Edit Customer Status: ${name}`}
        size="large"
        onClose={handleClose}
        open={open}
        footer={
          <div
            style={{
              textAlign: "left",
            }}
          >
            <RTButton.authAdd
              action={Permissions.customers.actions.update}
              subject={Permissions.customers.subject}
              onClick={() => mutation.mutate(postBody)}
              type="primary"
              style={{ marginRight: "10px" }}
              loading={mutation.isPending}
              text={"Submit"}
            />
            <Button onClick={onClose}>Cancel</Button>
          </div>
        }
      >
        <RTAuthContainer
          action={Permissions.customers.actions.update}
          subject={Permissions.customers.subject}
        >
          <EditCustomerStatusPanel
            id={key}
            newStatus={newStatus}
            setNewStatus={setNewStatus}
          />
        </RTAuthContainer>
      </Drawer>
    </>
  );
};

export default EditCustomerStatusDrawer;
