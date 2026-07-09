import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { APP_NAME } from "../data/categories";
import logo from "../assets/SyllanceTransparentLogo.png";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

function NavTab({ to, active, children }) {
  return (
    <Button
      asChild
      variant="ghost"
      className={
        active
          ? "rounded-lg bg-white/10 font-bold text-foreground ring-2 ring-primary/25"
          : "rounded-lg font-bold text-foreground/70 hover:text-foreground"
      }
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const researchActive =
    location.pathname === "/about" || location.pathname === "/interactions";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 px-11 py-4">
        <Link to="/" className="flex items-center gap-5 justify-self-start">
          <img
            className="header-logo h-[100px] w-[100px] object-contain"
            src={logo}
            alt="SyllanceAI logo"
          />
          <div>
            <div className="header-brand-name text-[54px] leading-[0.95] font-black tracking-[-1.8px]">
              {APP_NAME}
            </div>
            <div className="mt-2 text-base text-foreground/60">
              AI policy perception analysis
            </div>
          </div>
        </Link>

        <nav className="desktop-nav flex items-center justify-self-center gap-3.5 rounded-xl border border-border bg-white/5 p-2">
          <NavTab to="/" active={location.pathname === "/"}>
            Home
          </NavTab>
          <NavTab to="/analyze" active={location.pathname === "/analyze"}>
            Analyze
          </NavTab>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={
                  researchActive
                    ? "rounded-lg bg-white/10 font-bold text-foreground ring-2 ring-primary/25"
                    : "rounded-lg font-bold text-foreground/70 hover:text-foreground"
                }
              >
                Research ▾
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[310px] p-2">
              <DropdownMenuItem asChild className="flex-col items-start gap-1 rounded-lg p-3">
                <Link to="/about">
                  <strong>Research overview</strong>
                  <span className="text-xs text-muted-foreground">
                    Project goal and motivation
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="flex-col items-start gap-1 rounded-lg p-3">
                <Link to="/interactions">
                  <strong>How categories interact</strong>
                  <span className="text-xs text-muted-foreground">
                    Trade-offs between policy dimensions
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-lg"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <Button
            asChild
            variant="brand"
            className="header-launch rounded-xl px-6 py-6 text-[17px]"
          >
            <Link to="/analyze">Launch tool</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="h-14 w-14 rounded-xl"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[340px]">
              <SheetHeader>
                <SheetTitle>{APP_NAME}</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2.5 px-4 pb-4">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="rounded-lg border border-border bg-white/5 px-3.5 py-3 text-sm font-extrabold"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/analyze"
                    className="rounded-lg border border-border bg-white/5 px-3.5 py-3 text-sm font-extrabold"
                  >
                    Analyze
                  </Link>
                </SheetClose>

                <div className="mt-1.5 ml-1 text-[11px] font-black tracking-widest text-foreground/45 uppercase">
                  Research
                </div>

                <SheetClose asChild>
                  <Link
                    to="/about"
                    className="rounded-lg border border-border bg-white/5 px-3.5 py-3 text-sm font-extrabold"
                  >
                    Research overview
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/interactions"
                    className="rounded-lg border border-border bg-white/5 px-3.5 py-3 text-sm font-extrabold"
                  >
                    How categories interact
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="brand"
                    className="mt-1 rounded-lg"
                    onClick={() => navigate("/analyze")}
                  >
                    Analyze now
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
