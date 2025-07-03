"use client";

import React, { Fragment } from "react";
import dayjs from "dayjs";
import { fetchProxy } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import SubscriptionSkeleton from "./subscription-skeleton";
import { SUBSCRIPTION_ITEMS } from "@/constant/common";
import PlanBadge from "@/components/shared/plan-badge";

const PaymentDetailsForm = () => {
  const { data: userSession } = useSession();
  const { data: subscriptionData, isLoading } =
    useQuery<APIGetMembershipResponseDTO>({
      queryKey: ["membership", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          url: "subscription",
          method: "GET",
          auth: true,
        }),
      enabled: !!userSession,
    });

  // Extract subscription plan data for cleaner access
  const subscription = subscriptionData?.data;
  const subscriptionType = subscription?.type || "EXPLORE";

  return (
    <div className="flex flex-col space-y-5 p-2">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Payment Details
      </h2>

      {isLoading ? (
        <SubscriptionSkeleton />
      ) : (
        <Fragment>
          <div className="w-full flex flex-col space-y-3">
            <p className="text-sm text-bgtext-100 font-inter font-medium">
              Payment Date
            </p>
            <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-bgtext-500 font-inter font-medium">
                  Amount to pay next month
                </p>
                <p className="text-sm text-bgtext-100 font-inter font-medium">
                  {subscription
                    ? `${dayjs(subscription.validUntil).format("DD/MM/YYYY")}`
                    : "N/A"}
                </p>
              </div>

              <p className="text-2xl font-inter font-medium text-bgtext-100">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
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

          <div className="w-full flex flex-col space-y-3">
            <p className="text-sm text-bgtext-100 font-inter font-medium">
              Plan Tier
            </p>

            <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
              <PlanBadge type={subscriptionType} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PaymentDetailsForm;
