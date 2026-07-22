import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "./theme-provider";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: IconDeviceDesktop,
  },
  {
    value: "light",
    label: "Light",
    icon: IconSun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: IconMoon,
  },
] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const currentOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const CurrentIcon = currentOption.icon;

  const handleThemeChange = (value: string) => {
    const nextOption = themeOptions.find((option) => option.value === value);

    if (!nextOption) {
      return;
    }

    const rect = triggerRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      : undefined;

    setTheme(nextOption.value, origin);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon"
            data-theme-control=""
            data-resolved-theme={resolvedTheme}
            className={cn(
              "group/theme relative isolate overflow-hidden border border-cyan-500/15 bg-background/75 shadow-[0_0_0_1px_rgba(34,211,238,0.04)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-cyan-500/35 hover:bg-cyan-500/8 hover:shadow-[0_0_18px_-8px_rgba(34,211,238,0.9)] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:hover:border-cyan-300/45 dark:hover:bg-cyan-300/10 dark:hover:shadow-[0_0_20px_-7px_rgba(103,232,249,0.95)]",
              className,
            )}
          />
        }
      >
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-md bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover/theme:opacity-100 dark:bg-[radial-gradient(circle,rgba(139,92,246,0.3),transparent_68%)]"
        />
        <CurrentIcon className="relative z-10 transition-[color,filter,transform] duration-500 group-hover/theme:rotate-12 group-hover/theme:text-cyan-600 group-hover/theme:drop-shadow-[0_0_5px_rgba(34,211,238,0.65)] dark:group-hover/theme:text-cyan-200" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
            {themeOptions.map((option) => {
              const Icon = option.icon;

              return (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer gap-2 px-2 py-1.5 [&_svg:not([class*='text-'])]:text-muted-foreground"
                >
                  <Icon data-icon="inline-start" />
                  {option.label}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
