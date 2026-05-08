"use client";

import {
  BlogType,
  fetchBlogBySlug,
  fetchBlogs,
  getBlogFeedbacks,
} from "@/app/api/blog";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CardSkeleton from "@/components/CardSkeleton";
import { formatter } from "@/public/helper/date-formatter";
import Container from "@/components/Container";
import RecentPostCard from "@/components/blog/RecentPostCard";
import RecentPostSkeleton from "@/components/blog/RecentPostSkeleton";
import BlogHeader from "@/components/blog/BlogHeader";
import FeedbackForm from "@/components/blog/FeedbackForm";
import FeedbackMessage from "@/components/blog/FeedbackMessage";
import Button from "@/components/Button";
import ShareBlog from "@/components/blog/ShareBlog";
import { usePathname } from "next/navigation";
import Carousal from "@/components/blog/carousal";

const BlogDetail = ({ params }: { params: { slug: string } }) => {
  const pathname = usePathname();

  const { data, isLoading } = useQuery<BlogType>({
    queryKey: ["blog", params.slug],
    queryFn: async () => await fetchBlogBySlug("en", params.slug),
  });

  const {
    data: feedbacksData,
    hasNextPage: hasFeedbacksNextPage,
    fetchNextPage: fetchFeedbacksNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [`blogFeedbacks`],
    enabled: !!data?.id,
    queryFn: async ({ pageParam }) => {
      if (!data?.id) return;
      return await getBlogFeedbacks(data?.id, "en", pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return;
      const currentPage = lastPage.pagination.page;
      const totalPages = lastPage.pagination.pageCount;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const { data: recentBlogsData, isLoading: blogsLoading } = useQuery<{
    blogs: BlogType[];
    totalPages: number;
  }>({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs("en", "desc", "3"),
    staleTime: 5 * 1000,
    enabled: !!data,
  });

  const { data: realtedBlogsData, isLoading: relatedBlogsLoading } = useQuery<{
    blogs: BlogType[];
    totalPages: number;
  }>({
    queryKey: ["blogs", (data?.categories || []).join(",")],
    queryFn: async () =>
      await fetchBlogs(
        "en",
        "desc",
        "10",
        "1",
        data?.categories,
        data ? [`${data?.id}`] : [],
      ),
    staleTime: 5 * 1000,
    enabled: !!data,
  });

  const recentBlogs = recentBlogsData?.blogs || [];
  const headingdata = {
    heading: "Blogs",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Blogs", url: "/blog" },
      {
        name: `${data?.title}`,
      },
    ],
  };

  if (isLoading) {
    return (
      <Container>
        <CardSkeleton />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <p className="text-xl h-[50vh] flex justify-center items-center">
          No Blog Found
        </p>
      </Container>
    );
  }
  const date = data && new Date(data?.publishedAt);
  const publishedDate = formatter.format(date);

  return (
    <>
      <Container className="md:pt-4 pt-10 relative">
        <BlogHeader
          heading={headingdata.heading}
          breadcrumbs={headingdata.breadcrumbs}
        />
      </Container>
      <Container className="xl:max-[1200px] m-auto flex md:flex-row flex-col-reverse lg:gap-10 gap-5 py-7 pb-10">
        <div className="flex flex-col gap-3 flex-1 neuro-blog-area-cls overflow-hidden">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <>
              <Image
                src={data?.cover?.url || ""}
                alt={data?.cover?.alt || "cover image"}
                height={1500}
                width={1500}
                className="w-full h-full object-cover rounded-xl"
                priority
                unoptimized
              />
              <div className="text-sm flex gap-5">
                <h6>By: {data?.authors}</h6>
                <h6>{publishedDate}</h6>
              </div>
              <h1 className="md:text-xl text-lg font-NeueBold">
                {data?.title}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.text || "",
                }}
              ></div>
              {!data?.tags?.length ? null : (
                <>
                  <hr className="border-t border-dashed md:my-3 my-2" />
                  <h6
                    className="md:text-lg"
                    style={{ marginBottom: "0px !important" }}
                  >
                    Tags
                  </h6>
                  <div className="rounded-lg bg-white md:p-2 p-1">
                    {data?.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="md:text-sm text-xs px-1 py-1 inline-block"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {relatedBlogsLoading ? (
                <CardSkeleton />
              ) : !realtedBlogsData?.blogs?.length ? null : (
                <>
                  <p className="font-semibold">Top related blogs</p>
                  <Carousal data={realtedBlogsData?.blogs || []} />
                </>
              )}
              {!feedbacksData?.pages[0]?.feedbacks?.length ? null : (
                <>
                  <h2 className="md:text-xl text-lg mt-5">
                    {feedbacksData?.pages?.[0]?.pagination?.total} Comment
                    {feedbacksData?.pages?.[0]?.pagination?.total > 1 && "s"}
                  </h2>
                  <div className="flex flex-col gap-3 md:max-h-200 max-h-125 min-h-50 overflow-y-auto custom-scrollbar">
                    {feedbacksData?.pages
                      ?.flatMap((page) => page?.feedbacks || [])
                      ?.map((feedback, index) => (
                        <FeedbackMessage {...feedback} key={index} />
                      ))}
                    {hasFeedbacksNextPage && (
                      <Button
                        onClick={() => fetchFeedbacksNextPage()}
                        text="Load more"
                        className="w-fit! m-auto! my-5!"
                      />
                    )}
                  </div>
                </>
              )}
              <h2 className="md:text-xl text-lg mt-5">Leave a comment</h2>
              <FeedbackForm blogId={data?.id || 0} />
            </>
          )}
        </div>
        <div className="md:mb-0 mb-3">
          <div className="rounded-xl shadow-xl dark:bg-dark-surface-primary bg-dark-neutrals-default md:max-w-145 mb-5 box-border overflow-hidden">
            <h4 className="font-neue-bold my-5 border-l-4 border-dark-surface-tertiary px-3">
              Recent Blogs
            </h4>
            <div className="flex flex-col gap-5 px-3 pb-5">
              {blogsLoading
                ? [...Array(4)].map((_, index) => (
                    <RecentPostSkeleton key={`recent-post-skeleton-${index}`} />
                  ))
                : recentBlogs.map((blog: BlogType, index: number) => (
                    <RecentPostCard
                      data={blog}
                      key={`blog-${index}`}
                      classes={{
                        root:
                          index < recentBlogs.length - 1
                            ? "border-b border-dashed  border-x-0 border-t-0 pb-3"
                            : "",
                      }}
                    />
                  ))}
            </div>
          </div>
          <ShareBlog blogLink={pathname} name={data?.title} />
        </div>
      </Container>
    </>
  );
};

export default BlogDetail;
