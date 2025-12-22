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
      try {
        await queryClient.invalidateQueries({
          queryKey: ["getMyParticipation"],
        });
      } catch (error) {
        // Log error but don't throw - cache invalidation is not critical to user experience
        console.error("Failed to invalidate participation query:", error);
      }
    },
  });
};
