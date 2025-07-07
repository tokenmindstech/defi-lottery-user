import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Pages {
  pageName: string;
  pageUrl: string;
}

interface BreadcrumbPagesProps {
  currentPageName: string;
  currentPageUrl: string;
  previousPages?: Pages[];
}

const BreadcrumbPages = ({
  currentPageName,
  currentPageUrl,
  previousPages,
}: BreadcrumbPagesProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {previousPages?.map((page, idx) => (
          <Fragment key={idx}>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="font-medium text-bgtext-500 font-inter whitespace-nowrap hover:text-bgtext-100"
              >
                <Link href={page.pageUrl}>{page.pageName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="font-medium text-bgtext-100 font-inter whitespace-nowrap hover:text-bgtext-100"
          >
            <Link href={currentPageUrl}>{currentPageName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbPages;
