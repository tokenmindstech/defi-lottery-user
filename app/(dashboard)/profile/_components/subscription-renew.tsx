"use client";

import { Button } from "@/components/ui/button";
import { delay, fetchProxy } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionRenewProps {
  currentPlan: SubscriptionType;
}

const SubscriptionRenew = ({ currentPlan }: SubscriptionRenewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation<
    APICreatePaymentResponseDTO | APIBaseErrorResponse,
    Error,
    SubscriptionType
  >({
    mutationKey: ["create-payment-subscription", currentPlan],
    mutationFn: async (data) =>
      fetchProxy({
        method: "POST",
        url: "payment",
        auth: true,
        body: {
          type: data,
        },
      }),
  });

  const isErrorResponse = (
    response: APICreatePaymentResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: SubscriptionType) => {
    try {
      setIsLoading(true);
      if (data === "EXPLORE") {
        toast.success("Enjoy your exploration!");
        return;
      }

      const result = await mutation.mutateAsync(data);
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }
      toast.success(
        "Payment created. We will redirect you to the payment page."
      );
      await delay(2000);
      window.location.href = result.data.invoiceUrl;
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="link"
      onClick={() => {
        onSubmit(currentPlan);
      }}
      disabled={isLoading}
      className="text-base font-medium font-inter text-linsea-start cursor-pointer"
    >
      {isLoading ? "Renewing..." : "Renew Now"}
    </Button>
  );
};

export default SubscriptionRenew;
