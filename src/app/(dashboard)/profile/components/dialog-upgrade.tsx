"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SubscriptionForm from "@/app/auth/subscription-offers/_components/subscription-form";

interface DialogUpgradeSubscriptionProps {
  currentPlan?: SubscriptionType;
}

const DialogUpgradeSubscription = ({
  currentPlan,
}: DialogUpgradeSubscriptionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-base font-medium font-inter text-linsea-start cursor-pointer"
        >
          Upgrade Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md bg-black border-1 border-bgtext-800 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
            Let&apos;s upgrade your plan, shall we?
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <SubscriptionForm currentPlan={currentPlan} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpgradeSubscription;
