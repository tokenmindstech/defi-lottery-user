import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
import AgentDashboard from "./_components/agent-dashboard";
import UserDashboard from "./_components/user-dashboard";

const DashboardPage = async () => {
  const session = await getServerSession(authConfig);
  const isAgent = session?.user?.roles?.includes("AGENT");

  if (!isAgent) {
    return <AgentDashboard />;
  }

  return <UserDashboard />;
};

export default DashboardPage;
