import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serverAction } from "../lib";
import { getMyParticipation, participateToChallenge } from "./actions";

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMyParticipation"],
      });
    },
  });
};
