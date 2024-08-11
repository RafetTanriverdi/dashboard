import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useAutoLogoutOnInactivity = (timeout = 600000) => {
const queryClient = useQueryClient();
    useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Oturum kapatma işlemini burada gerçekleştir
        localStorage.clear();
        queryClient.clear();
        alert("10 dakika boyunca etkin olmadığınız için oturumunuz kapatıldı.");
        window.location.href = "/login";
      }, timeout);
    };

    const handleFocus = () => {
      resetTimer();
    };

    const handleBlur = () => {
      resetTimer();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout]);
};

export default useAutoLogoutOnInactivity;
