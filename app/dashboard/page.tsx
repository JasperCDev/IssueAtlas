import { redirect } from "next/navigation";
import { DEFAULT_PROJECT_ID } from "@/lib/mock-data";

export default function Page() {
  redirect(`/dashboard/${DEFAULT_PROJECT_ID}/overview`);
}
