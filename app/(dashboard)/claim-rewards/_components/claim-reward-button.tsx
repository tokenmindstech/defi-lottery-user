"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { fetchProxy } from "@/lib/utils";
import { GiftIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CURRENCY_FRACTION } from "@/constant/common";

interface ClaimRewardButtonProps {
  totalClaimable: number;
}

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be at least 6 characters long",
    })
    .max(6, {
      message: "OTP must be at most 6 characters long",
    }),
});
type FormType = z.infer<typeof formSchema>;

const ClaimRewardButton = ({ totalClaimable }: ClaimRewardButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Refs
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation<
    APIClaimRewardResponseDTO | APIBaseErrorResponse,
    Error,
    FormType
  >({
    mutationKey: ["claim-reward"],
    mutationFn: async (data) => {
      return await fetchProxy({
        method: "POST",
        url: "draw-ticket/claim",
        auth: true,
        body: {
          otp: data.otp,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const isErrorResponse = (
    response: APIClaimRewardResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: FormType) => {
    try {
      const response = await mutation.mutateAsync(data);
      if (isErrorResponse(response)) {
        toast.error(
          Array.isArray(response.message)
            ? response.message[0]
            : response.message
        );
        return;
      }

      toast.success("Reward claimed successfully!");
      setIsOpen(false);
      // Optionally, you can trigger a refetch of the tickets or update the UI accordingly
      form.reset();
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      } else if (formContainerRef.current) {
        const input =
          formContainerRef.current.querySelector('input[type="text"]');

        if (input) {
          (input as HTMLInputElement).focus();
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={totalClaimable === 0}
          className="p-5 transition-all duration-300 ease-out border-2 cursor-pointer bg-gradient-to-b from-linprimary-start to-linprimary-end border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl"
        >
          <div className="flex flex-row items-center justify-start space-x-3">
            <GiftIcon className="size-5 text-bgtext-100" />
            <p className="py-4 text-sm font-medium text-bgtext-100 font-inter whitespace-nowrap">
              Claim Reward
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm overflow-y-auto bg-black rounded-lg md:max-w-md h-fit border-1 border-bgtext-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-left text-bgtext-100 font-inter">
            Input OTP to Claim Reward
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-start space-y-5"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      autoFocus={true}
                      {...field}
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <InputOTPGroup key={index}>
                          <InputOTPSlot
                            index={index}
                            ref={index === 0 ? firstInputRef : null}
                            className="size-10 md:size-12 lg:size-14 bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end border-0 first:border-l-0 data-[active=true]:border-2 border-bgtext-800 text-3xl md:text-4xl text-bgtext-100"
                          />
                        </InputOTPGroup>
                      ))}
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="space-y-2 text-xs text-bgtext-500 font-inter">
                    <div className="mt-2">
                      <p className="font-medium text-bgtext-600">
                        <strong className="text-bgtext-100">Note:</strong>
                        <br />A 5% administration fee will be applied to your
                        winning amount.
                      </p>
                      <div className="mt-2">
                        <p>
                          Total Claimable:{" "}
                          <span className="font-medium text-bgtext-100">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                              maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                            }).format(totalClaimable)}
                          </span>
                        </p>
                        <p>
                          Administration Fee (5%):{" "}
                          <span className="font-medium text-bgtext-100">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                              maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                            }).format(totalClaimable * 0.05)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full transition-all duration-300 ease-out border-2 rounded-lg cursor-pointer bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50"
            >
              {form.formState.isSubmitting ? (
                <div className="flex flex-row items-center justify-center space-x-2">
                  <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                  <p className="text-base font-medium text-bgtext-100 font-inter">
                    Claiming...
                  </p>
                </div>
              ) : (
                `Claim ${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                  maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                }).format(totalClaimable * 0.95)}` // Displaying the amount after 5% fee
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardButton;
