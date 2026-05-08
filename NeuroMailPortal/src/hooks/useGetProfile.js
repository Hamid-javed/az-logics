import { useAuth } from "../AuthContext";
import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useGetProfile = () => {
  const { setUserProfile } = useAuth();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await apiClient.get(
          "/user/profile/",
          getTokenIncludedConfig()
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setUserProfile(data);
    },
  });
};

export default useGetProfile;
