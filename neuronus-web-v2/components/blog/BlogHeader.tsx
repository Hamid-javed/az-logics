"use client";

import Link from "next/link";
import React from "react";
import Heading from "../Heading";

interface Breadcrumb {
  name: string | undefined;
  url?: string;
}

interface BlogHeaderProps {
  heading: string;
  breadcrumbs: Breadcrumb[];
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ heading, breadcrumbs }) => {
  return (
    <div className="relative z-10">
      <Heading>{heading}</Heading>

      <div className="mt-2">
        <nav aria-label="breadcrumb">
          <ul className="flex w-full items-center text-[14px] overflow-hidden">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <React.Fragment key={`breadcrumb-${index}`}>
                  <li className={isLast ? "min-w-0 flex-1" : "shrink-0"}>
                    {crumb.url ? (
                      <Link
                        href={crumb.url}
                        className={
                          isLast
                            ? "block truncate hover:underline"
                            : "hover:underline"
                        }
                        title={crumb.name}
                      >
                        {crumb.name}
                      </Link>
                    ) : (
                      <span
                        className={isLast ? "block truncate" : ""}
                        title={crumb.name}
                      >
                        {crumb.name}
                      </span>
                    )}
                  </li>

                  {index < breadcrumbs.length - 1 && (
                    <li className="mx-2 shrink-0 flex items-center">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogHeader;
