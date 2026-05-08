import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useEmailRephrase = () =>
  useMutation({
    mutationFn: (data) => {
      return apiClient
        .post("emails/ai/rephrase/", data, getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  });

export default useEmailRephrase;
