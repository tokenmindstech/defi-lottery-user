"use client";

import { Button } from "@/components/ui/button";
import { cn, fetchProxy } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionCancelContinueProps {
  requestCancellation: boolean;
  currentPlan: SubscriptionType;
}

const SubscriptionCancelContinue = ({
  requestCancellation,
  currentPlan,
}: SubscriptionCancelContinueProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: userSession } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    APICancelSubscriptionResponseDTO | APIBaseErrorResponse,
    Error
  >({
    mutationKey: ["cancel-subscription", currentPlan],
    mutationFn: async () =>
      fetchProxy({
        method: "POST",
        url: "subscription/cancel",
        auth: true,
        body: {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userSession?.user.id],
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
      className={cn(
        "text-sm font-medium font-inter cursor-pointer",
        !requestCancellation ? "text-destructive" : "text-linsea-start"
      )}
    >
      {isLoading
        ? "Processing..."
        : !requestCancellation
        ? "Cancel Subscription"
        : "Continue Subscription"}
    </Button>
  );
};

export default SubscriptionCancelContinue;
