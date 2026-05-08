import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/apiClient";

const useGetDetails = () => useMutation({
    mutationFn: async ({ id, markAsRead = false }) => {
        const response = await apiClient.get(
            `/mailbox/${localStorage.getItem("email_id")}/emails/${id}`,
            getTokenIncludedConfig()
        );
        
        if (markAsRead) {
            // Extract and load tracking pixel if exists
            const pixelMatch = response.data.body?.match(/<img[^>]*track[^>]*>/i);
            if (pixelMatch) {
                const pixelUrl = pixelMatch[0].match(/src="([^"]*)"/i)[1];
                await fetch(pixelUrl); // Trigger tracking pixel
            }
            
            // Also mark as read via API
            await apiClient.patch(
                `/mailbox/${localStorage.getItem("email_id")}/emails/${id}/`,
                { is_seen: true },
                getTokenIncludedConfig()
            );
        }
        
        return response.data;
    }
});

export default useGetDetails;