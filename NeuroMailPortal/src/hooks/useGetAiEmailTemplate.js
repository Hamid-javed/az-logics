import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useGetAiEmailTemplate = () => {
  return useMutation({
    mutationFn: () =>
      apiClient
        .get("emails/ai/templates/", getTokenIncludedConfig())
        .then((res) => res.data.results)
        .catch((er) => er.error),
  });
};

export default useGetAiEmailTemplate;
