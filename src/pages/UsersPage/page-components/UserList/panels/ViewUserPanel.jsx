import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import ReactJson from "react-json-view";

const ViewUserPanel = ({ data, isLoading, error }) => {
  const errorMessage= error?.response?.data?.message;
  if (isLoading) {
    return<RTSkeleton/>;
  } else if (error) {
    console.error(error);
    return <RTAlert message={errorMessage} type={"error"} /> ;
  } else {
    return <ReactJson src={data} />;
  }
};

export default ViewUserPanel;
