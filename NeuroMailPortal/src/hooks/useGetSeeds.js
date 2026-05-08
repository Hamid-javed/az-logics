import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useGetSeeds = () =>
  useQuery({
    queryKey: ["password"],
    queryFn: () =>
      apiClient
        .post("/user/generate-pass-phrase/")
        .then((res) => res.data)
        .catch((er) => er.error),
  });

export default useGetSeeds;
