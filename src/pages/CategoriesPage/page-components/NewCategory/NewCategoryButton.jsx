import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewCategoryDrawer } from "./NewCategoryDrawer";
import { Space } from "antd";
import { Permissions } from "@rt/utils/permission-util";

export const NewCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <RTButton.authReload
          action={Permissions.categories.actions.read}
          subject={Permissions.categories.subject}
          onClick={() => window.location.reload()}
        />
        <RTButton.authAdd
          action={Permissions.categories.actions.create}
          subject={Permissions.categories.subject}
          text="Add New Category"
          onClick={() => setOpen(true)}
        />
      </Space>
      <NewCategoryDrawer onClose={onClose} open={open} />
    </>
  );
};
