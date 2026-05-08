import { useMutation } from "@tanstack/react-query";
import apiClient, { getMultiPartConfig } from "../services/apiClient";

const useUpdateProfile = () =>
  useMutation({
    mutationFn: (data) => {
      return apiClient
        .patch("/user/profile/", data, getMultiPartConfig())
        .then((res) => res);
    },
  });

export default useUpdateProfile;