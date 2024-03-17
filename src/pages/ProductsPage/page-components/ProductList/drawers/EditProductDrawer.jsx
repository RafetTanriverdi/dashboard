import { Drawer } from "antd"

const EditProductDrawer = ({onClose,open}) => {
  return (
    <Drawer
    title="Edit Product"
    placement="right"
    size="large"
    onClose={onClose}
    open={open}
    >

    </Drawer>
  )
}

export default EditProductDrawer