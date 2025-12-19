import * as leaderboard from "./leaderboard/hooks";
import * as participate from "./participate/hooks";
import * as submissions from "./submissions/hooks";
import * as onboarding from "./onboarding/hooks";
import * as admin from "./admin/hooks";
import * as users from "./users/hooks";

export const api = {
  participate,
  submissions,
  leaderboard,
  onboarding,
  admin,
  users
};
