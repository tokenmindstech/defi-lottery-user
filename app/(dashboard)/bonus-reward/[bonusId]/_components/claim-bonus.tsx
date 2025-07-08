"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GiftIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { fetchProxy, truncateString } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface ClaimBonusProps {
  bonus: BonusDetail;
}

const ClaimBonus = ({ bonus }: ClaimBonusProps) => {
  const { data: userSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const isUserWinner = bonus.bonusWinners.some(
    (winner) => winner.user.id === userSession?.user.id
  );
  const userWinner = isUserWinner
    ? bonus.bonusWinners.find(
        (winner) => winner.user.id === userSession?.user.id
      )
    : null;
  const isOngoingRaffle = dayjs()
    .tz("Asia/Singapore")
    .isBefore(dayjs(bonus.validAt).tz("Asia/Singapore"));

  const mutation = useMutation<APIBaseResponse | APIBaseErrorResponse, Error>({
    mutationKey: ["claim-bonus", bonus.id, userSession?.user.id],
    mutationFn: async () =>
      fetchProxy({
        url: `bonus/claim/${bonus.id}`,
        method: "POST",
        body: {},
        auth: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bonus", bonus.id],
      });
    },
  });

  const isErrorResponse = (
    response: APIBaseResponse | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const handleClaimBonus = async () => {
    try {
      const result = await mutation.mutateAsync();
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }

      toast.success("Successfully claimed bonus!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error claiming bonus:", error);
      toast.error("Error claiming bonus");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300"
          disabled={!isUserWinner || userWinner?.claimed || isOngoingRaffle}
        >
          <div className="flex flex-row space-x-3 items-center justify-start">
            <GiftIcon className="size-5 text-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
              {isUserWinner && userWinner
                ? userWinner.claimed === false
                  ? "Claim Bonus 🎉"
                  : "Bonus Claimed ✅"
                : isOngoingRaffle
                ? "Ongoing Raffle 👀"
                : "Unfortunately, you are not a winner this time 😢"}
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md h-fit max-h-[80vh] overflow-y-auto bg-black border-1 border-bgtext-800 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
            Claim {truncateString(bonus.name, 30)}
          </DialogTitle>
          <DialogDescription className="text-bgtext-500 font-inter font-medium text-sm text-left">
            Congratulations on your bonus reward✨
            <br />
            Submit your claim and our team will contact you to help you receive
            your {truncateString(bonus.name, 30)} reward.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row space-x-2 items-center justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer text-bgtext-100 hover:text-bgtext-100"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              mutation.isPending || !isUserWinner || userWinner?.claimed
            }
            onClick={isUserWinner ? handleClaimBonus : undefined}
            className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300"
          >
            {mutation.isPending ? (
              <div className="flex flex-row items-center justify-center space-x-2">
                <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                <p className="text-bgtext-100 font-inter font-medium text-sm">
                  Submitting Claim...
                </p>
              </div>
            ) : (
              <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
                Claim Now
              </p>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimBonus;
