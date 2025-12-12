import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serverAction } from "../lib";
import { getLeaderboard, updateLeaderboard } from "./action";

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["getLeaderboard"],
    queryFn: () => serverAction(getLeaderboard)()
  })
}


export const useUpdateLeaderboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serverAction(updateLeaderboard),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getLeaderboard"],
      });
    },
  });
}