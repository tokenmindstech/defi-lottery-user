import CircleShadowIcon from "@/components/icons/circle-shadow";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PerformanceCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  variant?: "default" | "checkerboard";
}

const PerformanceCard = ({
  icon,
  title,
  value,
  trend,
  trendUp,
  variant,
}: PerformanceCardProps) => {
  return (
    <div
      className={`w-full relative overflow-hidden border border-bgtext-800 pt-5 px-5 rounded-xl space-y-3 ${
        variant === "checkerboard"
          ? "bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-center bg-cover"
          : "bg-bgtext-900"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex p-2 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end text-bgtext-100">
          {icon}
        </div>
        <div
          className={`flex items-center space-x-1 text-xs ${
            trendUp
              ? "text-success-500 bg-success-500/10 py-1 px-2 rounded-full"
              : "text-error-500 bg-red-500/10 py-1 px-2 rounded-full"
          }`}
        >
          <span>
            {trendUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          </span>
          <span>{trend}</span>
        </div>
      </div>

      <p className="text-sm text-bgtext-500">{title}</p>
      <p className="z-10 text-3xl font-bold text-bgtext-100">{value}</p>

      {variant === "checkerboard" && (
        <CircleShadowIcon className="absolute z-5 left-0 top-0" />
      )}
    </div>
  );
};

export default PerformanceCard;
