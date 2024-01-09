// eslint-disable-next-line no-unused-vars
import React from "react";

import { signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "../../Authentication/aws-exports";
import { signOut } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES_ID } from "../../Routes/routes-id";
import { getRoutePath } from "../../Routes/routes";
import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";

Amplify.configure(awsmobile);

const HomePageContainer = () => {
  const username = "by.rafet.tanriverdi@gmail.com";
  const password = "Rafet.26436";
  const navigate = useNavigate();
  const handleSignIn = async () => {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log("isSignedIn", isSignedIn);
    console.log("nextStep", nextStep);

    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    navigate(getRoutePath(ROUTES_ID.dashboard));
  };
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <button onClick={handleSignIn}>Sign in </button>
      <button onClick={handleSignOut}> Sign out</button>
    </>
  );
};

const HomePage = () => {
  return <PublicLayout header={<RTHeader />} content={<HomePageContainer />} />;
};
export default HomePage;
