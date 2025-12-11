import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DailySubmission,
  getMySubmissions,
  submitDailyChallenge,
} from "./actions";

export const useGetMySubmissions = () => {
  return useQuery({
    queryKey: ["getMySubmissions"],
    queryFn: async () => {
      const response = await getMySubmissions();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useSubmitDailyChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DailySubmission) => {
      const response = await submitDailyChallenge(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMySubmissions"],
      });
    },
  });
};
