import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useGetMails = () =>
  useMutation({
    mutationFn: () =>
      apiClient
        .get("mailbox/", getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((er) => Promise.reject(er.error)), // Ensure errors propagate correctly
  });

export default useGetMails;
