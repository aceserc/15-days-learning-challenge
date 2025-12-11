import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyParticipation, participateToChallenge } from "./actions";
import { serverAction } from "../lib";

export const useGetMyParticipation = () => {
  return useQuery({
    queryKey: ["getMyParticipation"],
    queryFn: serverAction(getMyParticipation),
  });
};

export const useParticipateToChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serverAction(participateToChallenge),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyParticipation"],
      });
    },
  });
};
