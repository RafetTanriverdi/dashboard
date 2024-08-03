import awsmobile from "@rt/aws-exports";


const getToken = () => {
  const poolId=awsmobile.aws_user_pools_web_client_id
  const userId=localStorage.getItem(`CognitoIdentityServiceProvider.${poolId}.LastAuthUser`);
  const token = localStorage.getItem(`CognitoIdentityServiceProvider.${poolId}.${userId}.accessToken`);
  console.log(token);
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
