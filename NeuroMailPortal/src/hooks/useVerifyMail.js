import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useVerifyMail = () => useMutation({

    mutationFn: (data) => {
        return apiClient
            .post('mailbox/existance/verify/', data , getTokenIncludedConfig())
            .then((res) => res)
            .catch(er => error)
    }
});


export default useVerifyMail;