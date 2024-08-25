import { useEffect } from 'react';
import { getToken } from './auth-utils';
import { useLocation } from 'react-router-dom';

export const useWebSocketConnection = () => {
    const location =useLocation ();
  useEffect(() => {
    const { IdToken } = getToken();
  
    const ws = new WebSocket(
      `wss://31zsiurny9.execute-api.us-east-1.amazonaws.com/production/?token=${IdToken}`
    );
  
    
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "clearLocalStorage") {
        localStorage.clear();
        alert("Your session has been terminated.");
        window.location.href = "/login";
      }
    };
  

  
    return () => {
      ws.close();
    };
  }, [location]);
};
