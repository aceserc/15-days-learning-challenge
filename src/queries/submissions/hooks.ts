import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { serverAction } from "../lib";
import {
  deleteSubmission,
  getFeedSubmissions,
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
