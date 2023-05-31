"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  icon: any;
  href: string;
  onclick?: () => void;
  active?: boolean;
}
const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  onclick,
  active,
}) => {
  const handleClick = () => {
    if (onclick) {
      return onclick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `first-letter:
        group
        flex
        gap-x-3
        text-smleading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
    `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
