"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Banner1 = ({
  title = "Version 2.0 is now available!",
  description = "Read full release notes",
  linkText = "here",
  linkUrl = "#",
  defaultVisible = true,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.section
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("hidden md:block w-full border-b bg-background px-5 py-1.5", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <span className="text-xs md:text-sm">
            <span className="font-regular tracking-tight">{title}</span>{" "}
            <span className="text-muted-foreground">
              {description}{" "}
              <a
                href={linkUrl}
                className="underline underline-offset-2 text-blue-color hover:text-foreground font-light transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </a>
              .
            </span>
          </span>
        </div>

        <button
          className="-mr-2 flex h-6 w-6 md:h-8 md:w-8 flex-none items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      </div>
    </motion.section>
  );
};

export default Banner1;
