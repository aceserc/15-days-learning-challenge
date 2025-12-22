import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  DailySubmission,
  deleteSubmission,
  getFeedSubmissions,
  getMySubmissions,
  submitDailyChallenge,
  voteSubmission,
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
      // Also invalidate feed since new submission should appear there
      queryClient.invalidateQueries({
        queryKey: ["getFeedSubmissions"],
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
      // Also invalidate feed
      queryClient.invalidateQueries({
        queryKey: ["getFeedSubmissions"],
      });
    },
  });
};

export const useGetFeedSubmissions = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["getFeedSubmissions", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getFeedSubmissions(pageParam, limit);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useVoteSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      submissionId,
      type,
    }: {
      submissionId: string;
      type: "up" | "down";
    }) => serverAction(voteSubmission)(submissionId, type),
    onSuccess: () => {
      // Invalidate all queries that might show votes
      queryClient.invalidateQueries({
        queryKey: ["getFeedSubmissions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getMySubmissions"],
      });
    },
  });
};
