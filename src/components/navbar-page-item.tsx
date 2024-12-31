import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { LuChevronDown } from "react-icons/lu";
import { Link } from "react-router-dom";

export const NavBarPagesItem = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-0 gap-2 flex hover:underline"
        >
          Pages <LuChevronDown />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-52 mt-7 rounded-none shadow-none">
        <div className="flex flex-col justify-between space-y-2">
          {otherPages.map((nav) => (
            <Link
              className="text-gray-600 hover:text-main font-normal"
              key={nav.title}
              to={nav.route}
            >
              {nav.title}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const otherPages = [
  { title: "Privacy Policy", route: "privacy-policy" },
  { title: "Cookie Policy", route: "/cookie-policy" },
  { title: "Terms and Conditions", route: "terms-condition" },
  { title: "FAQ", route: "/faq" },
];
