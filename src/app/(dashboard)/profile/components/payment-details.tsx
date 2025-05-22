"use client";

import React, { Fragment, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capitalizeFirstLetter, cn, fetchProxy } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import SubscriptionSkeleton from "./subscription-skeleton";
import { SUBSCRIPTION_ITEMS } from "@/constant/common";

const PaymentDetailsForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<"visa" | "mastercard">(
    "visa"
  );

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
              <p className="text-base text-bgtext-100 font-inter py-1 px-4 bg-gradient-to-b from-lindeepgreen-start/40 to-black rounded-lg border-2 border-bgtext-800">
                {capitalizeFirstLetter(subscriptionType)}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm text-bgtext-100 font-inter font-medium">
                Payment Method
              </p>
              <Button
                variant="link"
                className="text-sm font-inter font-medium text-linsea-start"
              >
                Add Method
              </Button>
            </div>

            <RadioGroup
              className="flex flex-col items-start justify-start space-y-3"
              value={paymentMethod}
            >
              <div
                onClick={() => setPaymentMethod("visa")}
                className="w-full flex flex-row items-center  space-x-3 p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800 cursor-pointer"
              >
                <RadioGroupItem
                  value="visa"
                  id="visa"
                  className={cn(
                    "border-bgtext-800",
                    paymentMethod === "visa" && "bg-linprimary-start"
                  )}
                />
                <div className="relative w-[40px] h-[27px]">
                  <Image
                    src="/assets/images/VISA.png"
                    alt="Visa"
                    fill
                    className="object-contain"
                    sizes="100%"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-bgtext-100 font-inter font-medium">
                    Card Number
                  </p>
                  <p className="text-sm text-bgtext-500 font-inter font-medium">
                    **** **** **** 1234
                  </p>
                </div>
              </div>
              <div
                onClick={() => setPaymentMethod("mastercard")}
                className="w-full flex flex-row items-center  space-x-3 p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800 cursor-pointer"
              >
                <RadioGroupItem
                  value="mastercard"
                  id="mastercard"
                  className={cn(
                    "border-bgtext-800",
                    paymentMethod === "mastercard" && "bg-linprimary-start"
                  )}
                />
                <div className="relative w-[40px] h-[27px]">
                  <Image
                    src="/assets/images/Mastercard.png"
                    alt="Mastercard"
                    fill
                    className="object-contain"
                    sizes="100%"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-bgtext-100 font-inter font-medium">
                    Card Number
                  </p>
                  <p className="text-sm text-bgtext-500 font-inter font-medium">
                    **** **** **** 1234
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PaymentDetailsForm;
