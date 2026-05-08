import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";


const useGetFile = () => useMutation({
    mutationFn: ({ message_id, fileID }) => {

        return apiClient
            .get(`/emails/${message_id}/attachments/${fileID}`, getTokenIncludedConfig())
            .then((response) => {
                const fileUrl = response.data.url;
                if (fileUrl) {
                    const link = document.createElement("a");
                    link.href = fileUrl;
                    link.download = "";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })
            .catch((error) => {
                console.error("Error downloading the file:", error);
                throw error;
            });
    }
});

export default useGetFile;
