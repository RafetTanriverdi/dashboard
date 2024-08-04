import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewUserDrawer } from "./NewUserDrawer";

export const NewUserButton = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RTButton.add text="Add New User" onClick={() => setOpen(true)} />
      <NewUserDrawer onClose={onClose} open={open} />
    </>
  );
};
