"use client";

import React, { Fragment } from "react";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SUBSCRIPTION_ITEMS } from "@/constant/common";
import DialogUpgradeSubscription from "./dialog-upgrade";
import SubscriptionRenew from "./subscription-renew";
import SubscriptionCancelContinue from "./subscription-cancel-continue";

interface SubscriptionFormProps {
  userInfoResponse: UserInfoResponse;
}

const SubscriptionForm = ({ userInfoResponse }: SubscriptionFormProps) => {
  // Extract subscription plan data for cleaner access
  const subscription = userInfoResponse.subscription;
  const isPremium = subscription?.type === "PREMIUM";
  const subscriptionType = subscription?.type || "EXPLORE";
  const tickets = subscription
    ? SUBSCRIPTION_ITEMS.find((item) => item.value === subscription.type)
        ?.tickets || 0
    : 0;

  const sectionTitle = "text-sm font-medium text-bgtext-100 font-inter";
  const containerStyle =
    "flex flex-row items-center justify-between p-3 rounded-lg bg-bgtext-900 border-1 border-bgtext-800";

  return (
    <div className="flex flex-col p-2 space-y-5">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Subscription Overview
      </h2>

      <Fragment>
        <div className="flex flex-col w-full space-y-3">
          <p className={sectionTitle}>Current Plan</p>
          <div className={containerStyle}>
            <p className="px-4 py-1 text-base border-2 rounded-lg text-bgtext-100 font-inter bg-gradient-to-b from-lindeepgreen-start/40 to-black border-bgtext-800">
              {capitalizeFirstLetter(subscriptionType)}
            </p>

            {(!subscription || !isPremium) && (
              <DialogUpgradeSubscription currentPlan={subscriptionType} />
            )}
          </div>
        </div>

        <div className="flex flex-col w-full space-y-3">
          <p className={sectionTitle}>Ticket Allocation</p>
          <div className={containerStyle}>
            <p className="text-sm font-medium text-bgtext-100 font-inter">
              <span className="text-linsea-start">{tickets}</span> tickets per
              month
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-3">
          <p className={sectionTitle}>Status</p>
          <div className={containerStyle}>
            <p className="text-sm font-medium text-linsea-start font-inter">
              {subscription ? "ACTIVE" : "INACTIVE"}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-3">
          <p className={sectionTitle}>Renewal Date</p>
          <div className={containerStyle}>
            <div className="flex flex-row items-center space-x-2">
              <p className="text-sm font-medium text-linsea-start font-inter">
                {subscription
                  ? subscription.nextSubscription !== null
                    ? dayjs(subscription.nextSubscription.validUntil).format(
                        "DD/MM/YYYY"
                      )
                    : dayjs(subscription.validUntil).format("DD/MM/YYYY")
                  : "N/A"}
              </p>
              {subscription && (
                <SubscriptionCancelContinue
                  requestCancellation={subscription.requestCancellation}
                  currentPlan={subscriptionType}
                />
              )}
            </div>

            {subscription &&
              subscription.nextSubscription === null &&
              subscription.requestCancellation && (
                <SubscriptionRenew currentPlan={subscriptionType} />
              )}
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default SubscriptionForm;
