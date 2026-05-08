import React from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header
        title={<span>Blogs </span>}
        description="A hub of insights, ideas, and practical tips to keep you informed and inspired."
        classes={{ container: "pb-20" }}
      />
      {children}
    </>
  );
};

export default layout;
