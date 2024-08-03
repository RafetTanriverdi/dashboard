import awsmobile from "@rt/aws-exports";



const getToken = () => {
  const poolIdFromEnv=awsmobile.aws_user_pools_web_client_id
  const userId=localStorage.getItem(`CognitoIdentityServiceProvider.${poolIdFromEnv}.LastAuthUser`);
  const token = localStorage.getItem(`CognitoIdentityServiceProvider.${poolIdFromEnv}.${userId}.accessToken`);
  return token;
}
export function checkUserAuthentication() {
  const token = getToken();
  console.log(token);
  if (token) {
    return true;
  }
  return false;
  
}
