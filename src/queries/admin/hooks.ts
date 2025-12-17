import { useQuery } from "@tanstack/react-query"
import { serverAction } from "../lib"
import { fetchAdminChartData, fetchAdminStats, fetchPartcipants, fetchParticipantById, fetchTotalUsers, fetchUserById } from "./actions"

export const useGetAllParticipants = () => {
  return useQuery({
    queryKey: ["participants"],
    queryFn: () => serverAction(fetchPartcipants)()
  })
}

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => serverAction(fetchTotalUsers)()
  })
}

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => serverAction(fetchAdminStats)(),
  })
}

export const useAdminChartData = () => {
  return useQuery({
    queryKey: ["admin-chart-data"],
    queryFn: () => serverAction(fetchAdminChartData)(),
  })
}

export const useGetParticipantById = (id: string) => {
  return useQuery({
    queryKey: ["participant", id],
    queryFn: () => serverAction(fetchParticipantById)(id),
    enabled: !!id
  })
}

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => serverAction(fetchUserById)(id),
    enabled: !!id
  })
}
