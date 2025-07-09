"use client";

import React, { Fragment } from "react";
import dayjs from "dayjs";
import { fetchProxy } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CURRENCY_FRACTION, SUBSCRIPTION_ITEMS } from "@/constant/common";
import PlanBadge from "@/components/shared/plan-badge";
import SkeletonSubscription from "./skeleton-subscription";
import ResultDisplay from "@/components/shared/result-display";

const PaymentDetailsForm = () => {
  const { data: userSession } = useSession();
  const {
    data: subscriptionData,
    isLoading,
    error,
  } = useQuery<APIGetMembershipResponseDTO>({
    queryKey: ["membership", userSession?.user.id],
    queryFn: async () =>
      fetchProxy({
        url: "subscription",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  return (
    <div className="flex flex-col p-2 space-y-5">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Payment Details
      </h2>

      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={subscriptionData}
        loadingComponent={<SkeletonSubscription />}
        dataErrorMessage="An error occurred while fetching subscription details."
        loadingErrorMessage="Failed to load subscription details. Please try again later."
      >
        {(subscriptionData) => {
          // Extract subscription plan data for cleaner access
          const subscription = subscriptionData?.data;
          const subscriptionType = subscription?.type || "EXPLORE";
          return (
            <Fragment>
              <div className="flex flex-col w-full space-y-3">
                <p className="text-sm font-medium text-bgtext-100 font-inter">
                  Payment Date
                </p>
                <div className="flex flex-row items-center justify-between p-3 rounded-lg bg-bgtext-900 border-1 border-bgtext-800">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-bgtext-500 font-inter">
                      Amount to pay next month
                    </p>
                    <p className="text-sm font-medium text-bgtext-100 font-inter">
                      {subscription
                        ? `${dayjs(subscription.validUntil).format(
                            "DD/MM/YYYY"
                          )}`
                        : "N/A"}
                    </p>
                  </div>

                  <p className="text-2xl font-medium font-inter text-bgtext-100">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                      maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                    }).format(
                      subscription
                        ? SUBSCRIPTION_ITEMS.find(
                            (item) => item.value === subscription.type
                          )?.price || 0
                        : 0
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full space-y-3">
                <p className="text-sm font-medium text-bgtext-100 font-inter">
                  Plan Tier
                </p>

                <div className="flex flex-row items-center justify-between p-3 rounded-lg bg-bgtext-900 border-1 border-bgtext-800">
                  <PlanBadge type={subscriptionType} />
                </div>
              </div>
            </Fragment>
          );
        }}
      </ResultDisplay>
    </div>
  );
};

export default PaymentDetailsForm;
