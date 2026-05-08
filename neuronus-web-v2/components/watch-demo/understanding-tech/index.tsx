import Container from "@/components/Container";

import Background from "@/components/home/basic-rules/Background";
import SectionMerger from "@/components/SectionMerger";
import Typography from "./Typography";
import LockCircle from "./LockCircle";
import Features from "./Features";

const UnderstandingTech = () => {
  return (
    <>
      <SectionMerger />
      <div className="relative overflow-hidden">
        <Background watchDemo />
        <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 pt-10">
          <Typography />
          <LockCircle />
        </Container>
        <Features />
      </div>
      <SectionMerger bottom />
    </>
  );
};

export default UnderstandingTech;
