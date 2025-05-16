import React from "react";

const AgentDashboardTraining = () => {
  return (
    <div className="p-2">
      <h3 className="text-xl font-medium text-bgtext-100 mb-4">
        Recommended Training
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TrainingCard title="Crypto Basics 101" price="Free Access" tag="New" />
        <TrainingCard title="Crypto Basics" price="$29" tag="New" />
        <TrainingCard
          title="Advanced Referral Strategies"
          price="$29"
          tag="Popular"
        />
      </div>
    </div>
  );
};

interface TrainingCardProps {
  title: string;
  price: string;
  tag?: string;
}

const TrainingCard = ({ title, price, tag }: TrainingCardProps) => {
  return (
    <div
      className={`bg-gradient-to-br from-bgtext-900 to-bgtext-800 p-4 rounded-xl relative overflow-hidden`}
    >
      <div className="bg-bgtext-800 rounded-lg w-full h-[300px] relative overflow-hidden">
        {tag && (
          <div className="absolute top-0 left-0 bg-violet-600 text-xs text-bgtext-100 px-5 py-1 rounded-br-full   ">
            {tag}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-bgtext-100">{title}</h4>
        <p className="text-sm text-bgtext-400">{price}</p>
      </div>
    </div>
  );
};

export default AgentDashboardTraining;
