import awsmobile from "@rt/aws-exports";

export const getToken = () => {
  const poolIdFromEnv = awsmobile.aws_user_pools_web_client_id;
  const userId = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.LastAuthUser`
  );
  const AccessToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.accessToken`
  );
  const IdToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.idToken`
  );
  return { AccessToken, IdToken };
};
export function checkUserAuthentication() {
  const { AccessToken } = getToken();
  if (AccessToken) {
    return true;
  }
  return false;
}
