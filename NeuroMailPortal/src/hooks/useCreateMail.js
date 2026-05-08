import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useCreateMail = () => useMutation({

    mutationFn: (data) => {
        return apiClient
            .post('mailbox/', data, getTokenIncludedConfig())
            .then((res) => res.data)
            .catch((error) => {
                // console.error("API error:", error.response ? error.response.data : error.message);
                throw error;
            });
    }
});


export default useCreateMail;