"use client";

import { Trophy, Clock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import ClaimCommissionButton from "./_components/claim-commission-button";
import QuerySearch from "@/components/shared/query-search";
import { Fragment } from "react";
import { CommissionHistoryTable } from "./_components/commission-history-list";
import PagePagination from "@/components/shared/page-pagination";

const EarningsPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter">
        My Earnings
      </h2>

      <div className="flex w-full h-full flex-col md:flex-row space-y-5 md:space-y-0 items-start justify-between bg-bgtext-900 border border-bgtext-800 rounded-xl p-5">
        <div className="flex flex-row w-full space-x-5 items-center justify-start">
          <div className="flex flex-row space-x-3 items-center justify-start bg-gradient-to-b from-linprimary-start to-linprimary-end  p-5 rounded-xl">
            <div className="flex flex-col w-full h-full relative rounded-xl">
              <div className="flex flex-row space-x-10 items-center justify-between">
                <p className="text-bgtext-100 font-inter text-xs">
                  Total Earnings
                </p>
                <div className="flex bg-bgtext-900 rounded-full p-1.5">
                  <Trophy className="size-5 text-bgtext-100" />
                </div>
              </div>
              <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(500)}
              </p>
            </div>
          </div>

          <Separator
            className="data-[orientation=vertical]:h-[100px] bg-bgtext-700"
            orientation="vertical"
          />

          <div className="flex flex-row space-x-3 items-center justify-start bg-transparent p-5 rounded-xl">
            <div className="flex flex-col w-full h-full relative rounded-xl">
              <div className="flex flex-row space-x-10 items-center justify-between">
                <p className="text-bgtext-100 font-inter text-xs">
                  Pending Claimable
                </p>
                <div className="flex bg-bgtext-900 rounded-full p-1.5">
                  <Clock className="size-5 text-bgtext-100" />
                </div>
              </div>
              <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
                {500}
              </p>
            </div>
          </div>
        </div>

        <ClaimCommissionButton
          totalClaimable={500}
          page={1}
          limit={1}
          search={""}
        />
      </div>

      <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
        <QuerySearch page={1} />

        <Fragment>
          <CommissionHistoryTable histories={[]} />
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
            <p className="text-bgtext-500 text-sm">
              Showing {0} results of {0}
            </p>
            <PagePagination currentPage={1} totalPages={1} />
          </div>
        </Fragment>
      </div>
    </section>
  );
};

export default EarningsPage;
