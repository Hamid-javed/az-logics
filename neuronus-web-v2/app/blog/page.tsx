"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/app/api/blog";
import Container from "@/components/Container";
import CardSkeleton from "@/components/CardSkeleton";
import BlogHeader from "@/components/blog/BlogHeader";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import BlogCard from "@/components/blog/BlogCard";

const Blog = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = parseInt(pageParam || "1", 10);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogs("en", "desc", "6", currentPage.toString()),
    staleTime: 5 * 1000,
  });

  const totalPages = data?.totalPages || 0;

  if (isLoading) {
    return (
      <section className="md:py-4 py-10">
        <Container>
          <BlogHeader
            heading="Blogs"
            breadcrumbs={[{ name: "Home", url: "/" }, { name: "Blogs" }]}
          />
        </Container>
        <Container className="grid lg:grid-cols-2 md:grid-cols-1 md:gap-8 gap-5">
          {[...Array(3)].map((_, index) => (
            <CardSkeleton key={`blog-skeleton-${index}`} />
          ))}
        </Container>
      </section>
    );
  }

  const headingdata = {
    heading: "Blogs",
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Blogs" }],
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <section className="py-4 md:py-10">
      <Container className="pb-2 sm:pb-4">
        <BlogHeader
          heading={headingdata.heading}
          breadcrumbs={headingdata.breadcrumbs}
        />
      </Container>
      <Suspense>
        {data?.blogs?.length ? (
          <>
            <Container className="grid lg:grid-cols-2 md:grid-cols-1 md:gap-8 gap-5">
              {data?.blogs?.map((data) => {
                return <BlogCard data={data} key={data.id} />;
              })}
            </Container>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <Container>
            <p className="text-xl h-[50vh] flex justify-center items-center">
              No Record Found
            </p>
          </Container>
        )}
      </Suspense>
    </section>
  );
};

export default Blog;
