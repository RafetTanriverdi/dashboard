import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewProductDrawer } from "./NewProductDrawer";
import { Permissions } from "@rt/utils/permission-util";
import { Space } from "antd";

export const NewProductButton = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <RTButton.authReload
          action={Permissions.products.actions.read}
          subject={Permissions.products.subject}
          onClick={()=>window.location.href = "/products"}
        />
        <RTButton.authAdd
          action={Permissions.products.actions.create}
          subject={Permissions.products.subject}
          text="Add New Product"
          onClick={() => setOpen(true)}
        />
      </Space>
      <NewProductDrawer onClose={onClose} open={open} categories={categories} />
    </>
  );
};
