import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewUserDrawer } from "./NewUserDrawer";
import { Permissions } from "@rt/utils/permission-util";
import { Space } from "antd";

export const NewUserButton = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <RTButton.authReload
          action={Permissions.users.actions.read}
          subject={Permissions.users.subject}
          onClick={() => window.location.reload()}
        />
        <RTButton.authAdd
          action={Permissions.users.actions.create}
          subject={Permissions.users.subject}
          text="Add New User"
          onClick={() => setOpen(true)}
        />
      </Space>
      <NewUserDrawer onClose={onClose} open={open} />
    </>
  );
};
