import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyParticipation, participateToChallenge } from "./actions";

export const useGetMyParticipation = () => {
  return useQuery({
    queryKey: ["getMyParticipation"],
    queryFn: async () => {
      const response = await getMyParticipation();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useParticipateToChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (domain: string) => {
      const response = await participateToChallenge(domain);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyParticipation"],
      });
    },
  });
};
