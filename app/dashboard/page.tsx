import { redirect } from "next/navigation";
import { DEFAULT_TEAM_ID } from "@/lib/mock-data";

export default function Page() {
  redirect(`/dashboard/${DEFAULT_TEAM_ID}/overview`);
}
