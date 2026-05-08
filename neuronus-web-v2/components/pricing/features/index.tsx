import Container from "@/components/Container";
import Lock from "@/public/icons/pricing/Lock";
import FeatureCard from "../FeatureCard";
import Shield from "@/public/icons/pricing/Shield";
import Key from "@/public/icons/pricing/Key";
import Reward from "@/public/icons/pricing/Reward";

const Size = "w-4.75 sm:w-8 lg:w-10.75 h-auto";
const Features = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-10 sm:pt-12 md:pt-16 lg:pt-20">
        <FeatureCard
          icon={<Lock className={`${Size}`} />}
          title="Zero-Knowledge Architecture"
        />
        <FeatureCard
          icon={<Shield className={`${Size}`} />}
          title="No Tracking, No Censorship"
        />
        <FeatureCard
          icon={<Key className={`${Size}`} />}
          title="Anonymous Registration (PGP or Seed)"
        />
        <FeatureCard
          icon={<Reward className={`${Size}`} />}
          title="NeuroCoin Rewards on Premium Plans"
        />
      </div>
    </Container>
  );
};

export default Features;
