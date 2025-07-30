"use client";

import TwoFaSetup from "@/components/2fa-setup/2fa-setup";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function TwoFactorToggle({
  field,
}: {
  field: { value: boolean; onChange: (value: boolean) => void };
}) {
  const [open, setOpen] = useState(false);

  const handle2FaToggle = () => {
    setOpen(true);
  };

  return (
    <>
      <Switch
        id="twoFactorAuth"
        checked={field.value}
        onCheckedChange={handle2FaToggle}
        className={cn(
          "w-8 h-5 cursor-pointer data-[state=checked]:bg-linprimary-start data-[state=unchecked]:bg-linblack-start"
        )}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black border-bgtext-800">
          <DialogHeader>
            <DialogTitle className="text-bgtext-100 font-inter z-30">
              {field.value ? "Disable" : "Enable"} Two-Factor Authentication
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {field.value ? (
              <div className="text-white">Disable</div>
            ) : (
              <TwoFaSetup setOpen={setOpen} />
            )}

            <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-5%" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
