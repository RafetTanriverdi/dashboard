import { fetchAuthSession } from "aws-amplify/auth";

export const getAccessToken = async () => {

  try {
    const sessions = await fetchAuthSession() || {};
    const accessToken = sessions.tokens?.accessToken?.toString();
    return accessToken||null;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// export const isUserLoggedIn = async () => {
//   const accessToken = await getAccessToken();
//   return accessToken !== null;
// };
