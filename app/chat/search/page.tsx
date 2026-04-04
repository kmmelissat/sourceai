import { redirect } from "next/navigation";

export default function ChatSearchPage() {
  redirect("/chat?modal=search");
}
