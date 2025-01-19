"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSidebar } from "./ui/sidebar";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { open, animate } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const getIcon = () => {
    if (theme === "light") {
      return <Sun size={ICON_SIZE} className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />;
    }
    return <Moon size={ICON_SIZE} className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />;
  };

  const nextTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={nextTheme}
      className="flex items-center justify-start gap-2 group/sidebar py-2"
    >
      {getIcon()}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {theme === "light" ? " Light Mode" : " Dark Mode"}
      </motion.span>
    </button>
  );
};

export { ThemeSwitcher };
