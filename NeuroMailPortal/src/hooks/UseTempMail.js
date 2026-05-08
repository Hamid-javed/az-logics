import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const getTempMail = () => {

    return useMutation({
        mutationFn: async (param) => {
            try {
                const res = await apiClient.get(
                    `/temp-mail/?is_change=${param}`,
                    getTokenIncludedConfig()
                );
                return res.data;
            } catch (error) {
                throw error;
            }
        },
    });
};

export default getTempMail;
