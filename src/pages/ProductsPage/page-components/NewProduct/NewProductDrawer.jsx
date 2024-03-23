import { Drawer } from "antd"
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";

export const NewProductDrawer = ({onClose, open}) => {
  return (
    <Drawer 
        title="Add New Product"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
    >
    </Drawer>
  )
}

export const NewProductButton = () => {
    const [open, setOpen] = useState(false);
  

    console.log("open", open);
    
    const onClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <RTButton.add text="Add New Product" onClick={()=>setOpen(true)} />
        <NewProductDrawer onClose={onClose} open={open} />
      </>
    );
};
