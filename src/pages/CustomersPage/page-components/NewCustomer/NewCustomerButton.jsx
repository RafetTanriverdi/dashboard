import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewCustomerDrawer } from "./NewCustomerDrawer";

export const NewCustomerButton = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RTButton.add text="Add New Customer" onClick={() => setOpen(true)} />
      <NewCustomerDrawer onClose={onClose} open={open} />
    </>
  );
};
