import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useGenerateToken = () =>
  useMutation({
    mutationFn: (pass_phrase) => {
      return apiClient
        .post("/user/generate-token/", pass_phrase)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  });

export default useGenerateToken;
