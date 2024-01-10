// eslint-disable-next-line no-unused-vars
import React from "react";

import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";

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
