import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useDeleteMessage = () => useMutation({
    mutationFn: (payload) => {
        const data=JSON.stringify(payload)
        return apiClient
            .put(`/mailbox/${localStorage.getItem("email_id")}/emails/move-to-trash/`, data, getTokenIncludedConfig())
            .then((res) => res)
    },
});


export default useDeleteMessage;