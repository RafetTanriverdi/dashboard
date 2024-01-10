// eslint-disable-next-line no-unused-vars
import React from "react";
import awsExports from "../../Authentication/aws-exports";

import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";
import { Amplify } from "aws-amplify";

Amplify.configure(awsExports);
const HomePageContainer = () => {
  return (
    <>
      <p>home page</p>
    </>
  );
};

const HomePage = () => {
  return <PublicLayout header={<RTHeader />} content={<HomePageContainer />} />;
};
export default HomePage;
