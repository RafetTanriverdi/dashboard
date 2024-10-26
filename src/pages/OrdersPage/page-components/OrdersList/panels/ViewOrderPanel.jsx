import ReactJson from "react-json-view"

const ViewOrderPanel = ({data}) => {
  return (
   <ReactJson src={data} />
  )
}

export default ViewOrderPanel