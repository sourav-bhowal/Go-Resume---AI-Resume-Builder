"use client";

import * as React from "react";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggler() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-[1.2rem] w-[1.2rem]" />
          Light
          {theme === "light" && (
            <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-pink-500 p-1.5 text-xs text-white">
              Active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-[1.2rem] w-[1.2rem]" />
          Dark
          {theme === "dark" && (
            <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-pink-500 p-1.5 text-xs text-white">
              Active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Computer className="mr-2 h-[1.2rem] w-[1.2rem]" />
          System
          {theme === "system" && (
            <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-pink-500 p-1.5 text-xs text-white">
              Active
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
