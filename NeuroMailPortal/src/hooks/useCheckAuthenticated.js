import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useCheckAuthenticated = () => {
    return useMutation({
      mutationKey: ['verifyToken'],
      mutationFn: () => {
        return apiClient.post("/user/token/verify/", {
          token: localStorage.getItem("access_token")
        }).then((response) => {
          return response.status === 200;
        }).catch((error) => {
          console.error("Authentication failed:", error);
          return false;
        });
      }
    });
  };

export default useCheckAuthenticated;
