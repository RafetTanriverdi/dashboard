// eslint-disable-next-line no-unused-vars
import React from "react";

import { confirmSignIn } from "aws-amplify/auth";

import { signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "@/authentication/aws-exports";

Amplify.configure(awsmobile);

const HomePage = () => {
  const username = "by.rafet.tanriverdi@gmail.com";
  const password = "1AhfvuAz";
  const newPassword = "Rafet.26436";

  const handleSignIn = async ({}) => {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log('isSignedIn', isSignedIn);
    console.log('nextStep', nextStep);
  };

  const handleUpdatePassword = async ( ) => {
    const { isSignedIn, nextStep } = await confirmSignIn({
      challengeResponse: newPassword,
    });
    console.log('isSignedIn-2', isSignedIn);
    console.log('nextStep-2', nextStep);
  };

  return(
    <>
    <button onClick={handleSignIn}>Sign in </button>
     <button onClick={handleUpdatePassword}>Update Password</button>
    </>
  )
};

export default HomePage;
