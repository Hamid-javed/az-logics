import { useQuery } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";
import { useAuth } from "../AuthContext";

const useGetMessages = (type = "", seen = "", starred = "", search, currentPage) => {
  const { setLoading } = useAuth();

  return useQuery({
    queryKey: ["messages", { type, seen, starred, search, currentPage }],
    queryFn: async () => {
      const response = await apiClient.get(
        `mailbox/${localStorage.getItem("email_id")}/emails/?email_type=${type}&is_seen=${seen}&is_starred=${starred}&search=${search}&page=${currentPage}`,
        getTokenIncludedConfig()
      );

      // Only remove tracking pixels from LIST API
      const cleanData = {
        ...response.data,
        results: response.data.results.map((email) => ({
          ...email,
          body: email.body.replace(
            /<img[^>]+src=["']([^"']*\/track\/[^"']*)["'][^>]*>/gi,
            "" // ← remove entire img tag
          ),
        })),
      };

      setLoading(false);
      return cleanData;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useGetMessages;
