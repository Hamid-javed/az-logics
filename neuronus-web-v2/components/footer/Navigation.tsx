import Link from "next/link";

interface NavigationProps {
  title: string;
  links: { name: string; url: string }[];
  className?: string;
}

const Navigation = ({ links, title, className = "" }: NavigationProps) => {
  return (
    <div className={className}>
      <h3 className="text-base sm:text-lg xl:text-xl 2xl:text-[22px] mb-3.25 font-semibold">
        {title}
      </h3>
      <div className="flex flex-col gap-2.75">
        {links.map((link, index) => (
          <Link href={link.url} key={`footer-navigation-${link.name}-${index}`}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
