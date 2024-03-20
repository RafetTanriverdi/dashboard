import { Drawer } from "antd"

const DeleteProductDrawer = ({open,onClose}) => {
  return (
    
    <Drawer
    title="Delete Product"
    placement="right"
    size="large"
    onClose={onClose}
    open={open}
    >

    </Drawer>
  )
}

export default DeleteProductDrawer