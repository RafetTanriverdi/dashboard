import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { NewCategoryDrawer } from "./NewCategoryDrawer";

export const NewCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RTButton.add text="Add New Category" onClick={() => setOpen(true)} />
      <NewCategoryDrawer onClose={onClose} open={open} />
    </>
  );
};
