


const getToken = () => {
  const poolIdFromEnv=import.meta.env.VITE_COGNITO_USER_POOL_ID
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
