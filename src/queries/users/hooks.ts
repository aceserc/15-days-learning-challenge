import { useQuery } from "@tanstack/react-query"
import { serverAction } from "../lib"
import { fetchPublicProfile } from "./actions"

export const useGetPublicProfile = (userId: string) => {
    return useQuery({
        queryKey: ["public-profile", userId],
        queryFn: () => serverAction(fetchPublicProfile)(userId),
        enabled: !!userId
    })
}
