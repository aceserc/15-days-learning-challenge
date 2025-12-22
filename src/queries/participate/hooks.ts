import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serverAction } from "../lib";
import {
  getMyParticipation,
  participateToChallenge,
  startChallenge,
} from "./actions";

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
      queryClient.invalidateQueries({
        queryKey: ["participants"],
      });
    },
  });
};

export const useStartChallenge = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serverAction(startChallenge),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["getMyParticipation"],
      });
      options?.onSuccess?.(res);
    },
    onError: options?.onError,
  });
};
