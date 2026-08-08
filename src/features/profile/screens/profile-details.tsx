import { getCurrentUser } from "@/services";
import ProfileDetalsPage from "../components/profile-details-page";

export async function ProfileListScreen() {
  const profile = await getCurrentUser();

  return (
    <div className="space-y-8">
      <ProfileDetalsPage profile={profile} />
    </div>
  );
}
