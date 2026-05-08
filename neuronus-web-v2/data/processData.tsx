import gift from "@/public/images/neuronus-brain/gift.png";
import trophy from "@/public/images/neuronus-brain/trophy.png";
export const processData = [
  {
    title: "About the Process",
    description: (
      <span>
        Ideas with <span className="text-[#1D4ED8]">50+ votes </span>
        are automatically queued for our team's review. <br /> Our privacy
        engineers evaluate each idea for feasibility, security implications, and
        alignment with our mission.
      </span>
    ),
  },
  {
    icon: gift,
    title: "Rewards Program",
    description: (
      <span>
        Implemented ideas may earn <br /> contributors
        <span className="text-[#1D4ED8]"> NeuroCoin rewards </span>
        worth up <br /> to $20,000 USD. <br />
        <span className="text-black/40">
          Rewards are based on implementation complexity and community impact.
        </span>
      </span>
    ),
  },
  {
    title: "Top Contributors",
    icon: trophy,
  },
];
