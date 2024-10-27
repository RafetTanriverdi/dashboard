/* eslint-disable no-unused-vars */
import {
  signInWithRedirect,
} from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useState } from "react";
import { RTButton } from "@rt/components/RTButton";
import { GoogleOutlined } from "@ant-design/icons";
import awsmobile from "@rt/aws-exports";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { defaultStorage } from "aws-amplify/utils";

Amplify.configure(awsmobile);

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

const GoogleSignIn = ({ text }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          break;
        case "signedOut":
          break;

        case "signInWithRedirect":
          break;
        case "signInWithRedirect_failure":
          setError("An error has occurred during the OAuth flow.");
          break;
        case "customOAuthState":
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({
        provider: "Google",
        customState: "shopping-cart",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RTButton.basic
        text={text}
        onClick={handleGoogleSignIn}
        icon={<GoogleOutlined />}
      />
    </>
  );
};

export default GoogleSignIn;
