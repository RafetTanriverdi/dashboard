import { Spin } from 'antd'
import './RTChildrenSpinner.scss'

const RTChildrenSpinner = () => {
  return (
    <div className='rt-spiner-container'>
        <Spin className='rt-spiner-layout'/>
    </div>
  )
}

export default RTChildrenSpinner