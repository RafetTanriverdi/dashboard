export const isUserLoggedIn = () => {
  return getAccessToken() !== null;
};

export const getAccessToken =()=>{
    return localStorage.getItem('accessToken');
}