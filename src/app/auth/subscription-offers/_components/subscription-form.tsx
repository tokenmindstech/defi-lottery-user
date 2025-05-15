"use client";

import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  subscription: z.enum(["basic", "premium", "explore"], {
    required_error: "You need to select a subscription plan",
  }),
});

const subscriptionOptions = [
  { value: "basic", label: "Basic ($30/month)" },
  { value: "premium", label: "Premium ($300/month)" },
  { value: "explore", label: "I'm only exploring" },
];

const SubscriptionForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscription: "premium",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const subscriptionName = subscriptionOptions.find(
      (option) => option.value === data.subscription
    )?.label;

    // Show toast based on subscription type
    if (data.subscription === "explore") {
      toast.success(`Welcome! You're exploring our platform.`);
    } else {
      toast.success(`You've selected the ${subscriptionName} plan!`);
    }

    // Navigate to home page after a short delay
    setTimeout(() => {
      router.push("/");
    }, 1500);
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
                  className="flex flex-col space-y-1 w-full"
                >
                  {subscriptionOptions.map((option, idx) => (
                    <FormItem
                      key={idx}
                      className={cn(
                        "flex items-center space-x-3 space-y-0 bg-bgtext-900 p-5 rounded-xl cursor-pointer",
                        field.value === option.value &&
                          "bg-gradient-to-b from-linprimary-start to-linprimary-end"
                      )}
                    >
                      <FormControl className="">
                        <RadioGroupItem
                          value={option.value}
                          className={cn(
                            "border-bgtext-500 focus:ring-linprimary-start",
                            field.value === option.value &&
                              "bg-gradient-to-b from-bgtext-100 to-bgtext-100"
                          )}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-bgtext-100 font-inter text-base w-full cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
          >
            {form.formState.isSubmitting ? (
              <div className="flex flex-row items-center justify-center space-x-2">
                <Spinner className="size-5 fill-bgtext-100 animate-spin" />
                <p className="text-bgtext-100 font-inter font-medium text-base">
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
