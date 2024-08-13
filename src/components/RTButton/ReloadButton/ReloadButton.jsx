import { ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import PropTypes from 'prop-types'

const Reloadbutton = ({onClick}) => {
  return (
    <Button
    type="default"
    shape="default"
    icon={<ReloadOutlined  />}
    onClick={onClick}
    
  />
  )
}

Reloadbutton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Reloadbutton