import DashboardLottery from "@/components/specifics/dashboard/lottery";
import DashboardOngoingUpcoming from "@/components/specifics/dashboard/ongoing-upcoming";
import DashboardStatistic from "@/components/specifics/dashboard/statistic";

export default function Home() {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-start justify-between space-x-5 w-full h-full md:justify-between">
        <p className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Welcome John!
        </p>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10 justify-between lg:justify-start">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-bgtext-600 font-inter">
              Tickets Remaining
            </p>
            <p className="text-2xl font-semibold text-bgtext-100 font-inter">
              5
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-sm text-bgtext-600 font-inter">Tier</p>
            <p className="text-base text-bgtext-100 font-inter py-1 px-4 bg-gradient-to-b from-lindeepgreen-start/40 to-black rounded-lg border-2 border-bgtext-800">
              Premium
            </p>
          </div>
        </div>
      </div>

      <DashboardLottery />
      <DashboardStatistic />
      <DashboardOngoingUpcoming />
    </section>
  );
}
