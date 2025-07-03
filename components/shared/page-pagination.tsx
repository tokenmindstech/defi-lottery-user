"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "../../lib/utils";
import { cn } from "../../lib/utils";

interface PagePaginationProps {
  currentPage: number;
  totalPages: number;
}

const PagePagination = ({ currentPage, totalPages }: PagePaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Pagination className="mx-auto flex w-full justify-center md:mx-0 md:w-fit">
      <PaginationContent>
        <PaginationItem className="md:block md:mr-3">
          <PaginationPrevious
            className={cn(
              "size-10 bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end border border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {paginationRange.map((page, i) =>
          page === "..." ? (
            <PaginationItem className="text-bgtext-500 list-none" key={i}>
              <span>...</span>
            </PaginationItem>
          ) : (
            <PaginationItem className={"text-bgtext-500 list-none"} key={i}>
              <PaginationLink
                isActive={currentPage === page}
                className={cn(
                  "bg-transparent border-none hover:text-bgtext-100 hover:bg-gradient-to-b from-linprimary-start to-linprimary-end rounded-xl cursor-pointer",
                  currentPage === page
                    ? "text-bgtext-100 bg-gradient-to-b from-linprimary-start to-linprimary-end border-2 border-bgtext-800"
                    : "text-bgtext-500"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page as number);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem className="md:block md:ml-3">
          <PaginationNext
            className={
              "size-10 bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end border border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const maxPageNumbersToShow = 5;
  const totalPageNumbers = totalPages;

  // If total pages are less than or equal to the max number to show, return all pages
  if (totalPageNumbers <= maxPageNumbersToShow) {
    return Array.from({ length: totalPageNumbers }, (_, i) => i + 1);
  }

  const pages = [];

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPageNumbers);
  } else if (currentPage >= totalPageNumbers - 2) {
    pages.push(
      1,
      "...",
      totalPageNumbers - 3,
      totalPageNumbers - 2,
      totalPageNumbers - 1,
      totalPageNumbers
    );
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPageNumbers
    );
  }

  return pages;
};

export default PagePagination;
