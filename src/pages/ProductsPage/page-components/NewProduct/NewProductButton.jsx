import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewProductDrawer } from "./NewProductDrawer";

export const NewProductButton = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RTButton.add text="Add New Product" onClick={() => setOpen(true)} />
      <NewProductDrawer onClose={onClose} open={open} categories={categories} />
    </>
  );
};
