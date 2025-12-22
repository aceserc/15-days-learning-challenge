import { updateLeaderboard } from "@/queries/leaderboard/action"

export const GET = async () => {
  try {
    await updateLeaderboard()
    return Response.json({
      success: true
    })
  } catch {
    return Response.json({
      success: false
    })
  }
}
