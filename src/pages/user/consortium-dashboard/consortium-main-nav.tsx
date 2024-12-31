import { NavLink } from "react-router-dom";
import {
  Box,
  Building2,
  LayoutDashboard,
  MessageSquare,
  Network,
  Newspaper,
  Settings,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Main Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Consortiums",
    to: "/consortiums",
    icon: Network,
  },
  {
    title: "Consortium Storefront",
    to: "/storefront",
    icon: Box,
  },
  {
    title: "Messages",
    to: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Service & Products",
    to: "/services",
    icon: Settings,
  },
  {
    title: "Collaboration Hub",
    to: "/collaboration",
    icon: Users2,
  },
  {
    title: "Partners",
    to: "/partners",
    icon: Building2,
  },
  {
    title: "Blogs & Updates",
    to: "/consortium-blogs",
    icon: Newspaper,
  },
];

export function ConsortiumMainNav() {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.to}
          variant="ghost"
          className="w-full justify-start gap-2"
          asChild
        >
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? "bg-muted text-primary" : "text-muted-foreground"
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        </Button>
      ))}
    </nav>
  );
}
