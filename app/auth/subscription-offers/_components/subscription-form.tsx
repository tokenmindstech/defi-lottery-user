"use client";

import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { SpinnerIcon, QuestionIcon } from "@phosphor-icons/react/dist/ssr";
import { cn, delay, fetchProxy } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SUBSCRIPTION_ITEMS } from "@/constant/common";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  subscription: z.enum(["BASIC", "PREMIUM", "EXPLORE"], {
    required_error: "You need to select a subscription plan",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  currentPlan?: SubscriptionType;
  setIsOpen?: (isOpen: boolean) => void;
}

const SubscriptionForm = ({
  currentPlan,
  setIsOpen,
}: SubscriptionFormProps) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscription: currentPlan || "PREMIUM",
    },
  });

  const mutation = useMutation<
    APICreatePaymentResponseDTO | APIBaseErrorResponse,
    Error,
    FormValues
  >({
    mutationKey: [
      "create-payment-subscription",
      form.getValues("subscription"),
    ],
    mutationFn: async (data) =>
      fetchProxy({
        method: "POST",
        url: "payment",
        auth: true,
        body: {
          type: data.subscription,
        },
      }),
  });

  const isErrorResponse = (
    response: APICreatePaymentResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (data.subscription === "EXPLORE") {
        toast.success("Enjoy your exploration!");

        if (currentPlan) {
          setIsOpen?.(false);
          return;
        }
        router.push("/");
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
      await delay(1000);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="subscription"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col w-full space-y-1"
                >
                  {SUBSCRIPTION_ITEMS.map((option, idx) => (
                    <FormItem
                      key={idx}
                      className={cn(
                        "flex items-center space-x-3 space-y-0 bg-bgtext-900 p-5 rounded-xl cursor-pointer"
                      )}
                    >
                      <FormControl className="">
                        <RadioGroupItem
                          value={option.value}
                          className={cn(
                            "border-bgtext-800",
                            field.value === option.value &&
                              "bg-linprimary-start"
                          )}
                        />
                      </FormControl>
                      <FormLabel className="flex flex-row items-center justify-between w-full space-x-2">
                        <p className="w-full text-base font-normal cursor-pointer text-bgtext-100 font-inter">
                          {option.label}
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <QuestionIcon className="size-5 text-bgtext-100 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm text-bgtext-100 font-inter">
                                {option.information}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center w-full">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="transition-all duration-300 ease-out border-2 rounded-lg cursor-pointer bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50"
          >
            {form.formState.isSubmitting ? (
              <div className="flex flex-row items-center justify-center space-x-2">
                <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                <p className="text-base font-medium text-bgtext-100 font-inter">
                  Processing...
                </p>
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
