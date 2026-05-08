import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useIsStarredSeen = () =>
  useMutation({
    mutationFn: async ({ message_id, data }) => {
      try {
        const response = await apiClient.patch(
          `/mailbox/${localStorage.getItem("email_id")}/emails/${message_id}/`,
          data,
          getTokenIncludedConfig()
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });

export default useIsStarredSeen;
