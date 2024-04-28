import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import ReactJson from "react-json-view";

const ViewCustomerPanel = ({ data, isLoading, error }) => {
  const errorMessage= error?.response?.data?.message;
  if (isLoading) {
    return<RTSkeleton/>;
  } else if (error) {
    console.log(error);
    return <RTAlert message={errorMessage} type={"error"} /> ;
  } else {
    return <ReactJson src={data} />;
  }
};

export default ViewCustomerPanel;
