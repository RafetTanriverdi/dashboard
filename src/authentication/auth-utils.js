import awsmobile from "@rt/aws-exports";

export const getToken = () => {
  const poolIdFromEnv = awsmobile.aws_user_pools_web_client_id;
  const userId = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.LastAuthUser`
  );
  const AccessToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.refreshToken`
  );
  const IdToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.idToken`
  );
  const RefreshToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.refreshToken`
  );
  return { AccessToken, IdToken,RefreshToken };
};
export function checkUserAuthentication() {
  const { RefreshToken } = getToken();
  if (RefreshToken) {
    return true;
  }
  return false;
}
