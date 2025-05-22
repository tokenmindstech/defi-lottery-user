"use client";

import { Button } from "@/components/ui/button";
import { fetchProxy } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionCancelProps {
  currentPlan: SubscriptionType;
}

const SubscriptionCancel = ({ currentPlan }: SubscriptionCancelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation<
    APICancelSubscriptionResponseDTO | APIBaseErrorResponse,
    Error
  >({
    mutationKey: ["cancel-subscription", currentPlan],
    mutationFn: async () => {
      return await fetchProxy({
        method: "POST",
        url: "subscription/cancel",
        auth: true,
        body: {},
      });
    },
  });

  const isErrorResponse = (
    response: APICancelSubscriptionResponseDTO | APIBaseErrorResponse
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

      const result = await mutation.mutateAsync();
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }

      if (result.data.requestCancellation) {
        toast.success("Your subscription has been cancelled.");
      } else {
        toast.success("Your subscription has activated.");
      }
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
      className="text-sm font-medium font-inter text-destructive cursor-pointer"
    >
      {isLoading ? "Cancelling..." : "Cancel"}
    </Button>
  );
};

export default SubscriptionCancel;
