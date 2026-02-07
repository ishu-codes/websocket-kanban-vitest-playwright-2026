import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;

      case "dark":
        setTheme("system");
        break;

      case "system":
        setTheme("light");
        break;
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleThemeChange}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      {theme === "dark" ? (
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      ) : (
        <MonitorIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
