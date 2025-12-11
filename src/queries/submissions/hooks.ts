import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DailySubmission,
  deleteSubmission,
  getMySubmissions,
  submitDailyChallenge,
} from "./actions";
import { serverAction } from "../lib";

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
    mutationFn: serverAction(submitDailyChallenge),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMySubmissions"],
      });
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serverAction(deleteSubmission),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMySubmissions"],
      });
    },
  });
};
