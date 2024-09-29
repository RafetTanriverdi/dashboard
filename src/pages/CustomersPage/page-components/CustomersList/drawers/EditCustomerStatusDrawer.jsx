/* eslint-disable no-unused-vars */
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer } from "antd";
import { Form } from "antd";
import { useState } from "react";
import EditCustomerStatusPanel from "../panels/EditCustomerStatusPanel";

const EditCustomerStatusDrawer = ({ open, onClose, inheritedData }) => {
  const { key, name, status, email } = inheritedData;

  console.log("inheritedData", inheritedData);

  const [newStatus, setNewStatus] = useState(status);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const postBody = {
    status: "active",
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
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      openNotification({
        key: key,
        type: "success",
        message: "Customer Status Updated Successfully",
        duration: 2,
        onClose: () => {
          onClose();
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

  return (
    <Drawer
      title={`Edit Customer Status: ${name}`}
      size="large"
      onClose={onClose}
      open={open}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => mutation.mutate(postBody)} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <EditCustomerStatusPanel id={key} />
    </Drawer>
  );
};

export default EditCustomerStatusDrawer;
