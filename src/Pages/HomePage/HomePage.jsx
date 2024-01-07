// eslint-disable-next-line no-unused-vars
import React from "react";

import { signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "@/authentication/aws-exports";
import { signOut } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure(awsmobile);

const HomePage = () => {
  const username = "by.rafet.tanriverdi@gmail.com";
  const password = "Rafet.26436";

  const handleSignIn = async () => {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log("isSignedIn", isSignedIn);
    console.log("nextStep", nextStep);
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
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

export default HomePage;
