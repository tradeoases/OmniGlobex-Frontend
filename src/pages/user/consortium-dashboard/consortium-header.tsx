import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ConsortiumMainNav } from "./consortium-main-nav";
import { Logo } from "@/components/logo";

export function ConsortiumHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <span className="font-bold">OmniGlobex</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <ConsortiumMainNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex w-full items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="hidden font-bold md:inline-block"><Logo/></span>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div>Performance Index: 25</div>
              <div>Members count: 10</div>
              <div>Joined: 02/2024</div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                width={32}
                height={32}
                className="rounded-full"
                alt="Profile"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
