import { useQuery, } from "@tanstack/react-query";
import { serverAction } from "../lib";
import { getLeaderboard, } from "./action";

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["getLeaderboard"],
    queryFn: () => serverAction(getLeaderboard)()
  })
}


