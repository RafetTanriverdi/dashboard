import {
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
} from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import awsExports from "../../../authentication/aws-exports";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { useUserDataStore } from "@rt/data/User/UserData";
import { RTButton } from "@rt/components/RTButton";
import { GoogleOutlined } from "@ant-design/icons";

Amplify.configure(awsExports);

const GoogleSignIn = ({text}) => {
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);
  const navigate = useNavigate();

  const { userData, setUserData } = useUserDataStore();
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          getAccessToken();
          break;
        case "signedOut":
          localStorage.removeItem("accessToken");
          navigate(getRoutePath(ROUTES_ID.login));
          break;

        case "signInWithRedirect":
          navigate(getRoutePath(ROUTES_ID.dashboard));
          // getAccessToken();
          // getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has occurred during the OAuth flow.");
          break;
        case "customOAuthState":
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });

    getUser();
    getAccessToken();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("error", error);
  console.log("userData", userData);
  console.log("customState", customState);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUserData(currentUser);
      navigate(getRoutePath(ROUTES_ID.dashboard));
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  const getAccessToken = async () => {
    try {
      const { accessToken } = (await fetchAuthSession()).tokens;
      console.log("accessToken", accessToken);
      localStorage.setItem("accessToken", accessToken);
      navigate(getRoutePath(ROUTES_ID.dashboard));
    } catch (error) {
      console.error(error);
    }
  };

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
