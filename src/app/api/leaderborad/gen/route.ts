import { updateLeaderboard } from "@/queries/leaderboard/action"
import type { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await updateLeaderboard()
    return res.status(200).json({
      success: true
    })
  } catch {
    return res.status(500).json({
      error: "Error"
    })
  }
}
