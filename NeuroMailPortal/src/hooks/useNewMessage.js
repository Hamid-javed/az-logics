import { useMutation } from "@tanstack/react-query";
import apiClient, { getMultiPartConfig } from "../services/apiClient";
import { useAuth } from "../AuthContext";


const useNewMessage = () => {
  const { setProgressValue } = useAuth();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post(
        `/mailbox/${localStorage.getItem("email_id")}/emails/`,
        data,
        {
          ...getMultiPartConfig(),
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressValue(progress); 
          },
        }
      );
    },
  });
};

export default useNewMessage;
