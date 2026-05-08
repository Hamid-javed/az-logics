import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useMailExtensions = () => {
  return useMutation({
    mutationFn: () =>
      apiClient
        .get("mailbox/extensions/", getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((er) => er.error),
  });
};

export default useMailExtensions;
