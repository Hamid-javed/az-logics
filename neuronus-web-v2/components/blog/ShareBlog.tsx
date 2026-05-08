"use client";

import Image from "next/image";
import { useState } from "react";
import TwitterIcon from "@/public/home/blog/twitter.svg";
import PinterestIcon from "@/public/home/blog/pinterest.svg";
import LinkedinIcon from "@/public/home/blog/linkedin.svg";
import RedditIcon from "@/public/home/blog/reddit.svg";
import CopyIcon from "@/public/home/blog/copy.svg";
import CheckIcon from "@/public/home/blog/check.svg";

interface ShareBlogProps {
  name?: string;
  blogLink: string;
}

export default function ShareBlog({ name, blogLink }: ShareBlogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const socialIcons = [
    { name: "twitter", image: TwitterIcon },
    { name: "pinterest", image: PinterestIcon },
    { name: "linkedin", image: LinkedinIcon },
    { name: "reddit", image: RedditIcon },
  ];

  const fullBlogLink =
    typeof window !== "undefined"
      ? `${window.location.origin}${blogLink}`
      : blogLink;

  const handleCopyLink = async () => {
    if (!fullBlogLink) return;

    try {
      await navigator.clipboard.writeText(fullBlogLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const shareToSocialMedia = (platform: string) => {
    if (!fullBlogLink) return;

    const encodedUrl = encodeURIComponent(fullBlogLink);
    const encodedTitle = encodeURIComponent(
      `Checkout this "${name || ""}" blog on Neuronus Computing`,
    );

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center space-y-4 xl:min-w-87.5 md:min-w-75 w-full">
      <div className="flex items-center space-x-2 w-full">
        <div className="grid flex-1 gap-2">
          <label htmlFor="link" className="sr-only">
            Link
          </label>
          <input
            id="link"
            value={fullBlogLink}
            readOnly
            className="w-full bg-dark-neutrals-default px-3 py-2 border border-black text-black rounded-md"
          />
        </div>

        <button
          type="button"
          className="p-3 rounded-md outline-none bg-primary cursor-pointer disabled:cursor-not-allowed"
          onClick={handleCopyLink}
          disabled={isCopied}
        >
          <span className="sr-only ">Copy</span>
          <Image
            src={isCopied ? CheckIcon : CopyIcon}
            alt={isCopied ? "check" : "copy"}
            width={20}
            height={20}
            className="h-4 w-4 invert"
          />
        </button>
      </div>

      <div className="flex space-x-8 w-full flex-wrap">
        {socialIcons.map((icon) => (
          <button
            key={icon.name}
            type="button"
            className={`${
              icon.name === "twitter"
                ? "bg-[#1DA1F2] hover:bg-[#1DA1F2]/75"
                : icon.name === "pinterest"
                  ? "bg-[#BD081C] hover:bg-[#BD081C]/75"
                  : icon.name === "linkedin"
                    ? "bg-[#0A66C2] hover:bg-[#0A66C2]/75"
                    : "bg-[#FF4500] hover:bg-[#FF4500]/75"
            } text-white p-3 rounded-md`}
            onClick={() => shareToSocialMedia(icon.name)}
          >
            <Image
              src={icon.image}
              alt={icon.name}
              width={20}
              height={20}
              className="md:size-5 size-4 invert"
            />
            <span className="sr-only">Share on {icon.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
