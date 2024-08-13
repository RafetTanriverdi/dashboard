import { Can } from "@rt/authorization/can";
import RTAlert from "../RTFeedback/Alert/Alert";

const RTAuthContainer = ({ children, action, subject }) => {
  return (
    <>
      <Can do={action} on={subject}>
        {children}
      </Can>
      <Can not do={action} on={subject}>
        <RTAlert
          type={"error"}
          message={"You are not authorized to see this data."}
        />
      </Can>
    </>
  );
};

export default RTAuthContainer;
