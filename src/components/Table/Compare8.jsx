"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Palette,
  Layers,
  Code2,
  Accessibility,
  Repeat2,
  PenTool,
  Zap,
  Component,
  Shield,
} from "lucide-react";

const features = [
  {
    name: "Theming System",
    icon: <Palette className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Full CSS variable-based theming with Tailwind integration",
    bootstrapNote: "Sass variables only, limited runtime theming",
  },
  {
    name: "Component Ownership",
    icon: <Layers className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "You own the code — no black box dependencies",
    bootstrapNote: "Components live in node_modules, not your codebase",
  },
  {
    name: "TypeScript Support",
    icon: <Code2 className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Built with TypeScript from the ground up",
    bootstrapNote: "Community-maintained @types/bootstrap package",
  },
  {
    name: "Accessibility (a11y)",
    icon: <Accessibility className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Built on Radix UI primitives with full ARIA support",
    bootstrapNote: "Basic accessibility, but not WAI-ARIA compliant throughout",
  },
  {
    name: "Animation Support",
    icon: <Repeat2 className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Tailwind animate + Radix state-based animations",
    bootstrapNote: "Basic CSS transitions only",
  },
  {
    name: "Design Customization",
    icon: <PenTool className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Utility-first with full Tailwind class control",
    bootstrapNote: "Override classes can lead to specificity conflicts",
  },

  {
    name: "Performance",
    icon: <Zap className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Tree-shakeable; only ship what you use",
    bootstrapNote: "Global CSS by default; requires manual purging",
  },
  {
    name: "Composability",
    icon: <Component className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Headless primitives allow full composition patterns",
    bootstrapNote: "Fixed component structure; limited composition",
  },
  {
    name: "Dark Mode",
    icon: <Shield className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "First-class dark mode via CSS variables",
    bootstrapNote: "Added in v5.3 via data-bs-theme attribute",
  },


];

function SupportIcon({
  level,
  tooltip,
  delay = 0,
}) {
  const iconContent =
    level === "full" ? (
      <span className="text-emerald-600 dark:text-emerald-500 font-bold text-lg">
        ✓
      </span>
    ) : level === "partial" ? (
      <span className="text-amber-500 dark:text-amber-400 font-bold text-xl leading-none">
        -
      </span>
    ) : (
      <span className="text-red-500 dark:text-red-400 font-bold text-lg">
        ✕
      </span>
    );

  const icon = (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      className="inline-block"
    >
      {iconContent}
    </motion.span>
  );

  if (!tooltip) return icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="cursor-default">{icon}</button>
        </TooltipTrigger>
        <TooltipContent className="max-w-100 text-center text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Compare8() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  });
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Header */}
        <motion.div className="mb-10 text-center" {...fadeUp(0)}>
          <h2
            className="mb-5 flex items-center justify-center gap-3 text-5xl font-medium tracking-tighter md:text-5xl"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            What we do better
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            A detailed feature comparison to help you choose the right UI
            framework for your next project.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div className="rounded-xl" {...fadeUp(0.15)}>
          <div className="grid grid-cols-[1fr_45px_45px] items-center gap-4 border-b  px-6 py-4 md:grid-cols-[1fr_120px_120px]">
            <div />
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[13px] text-foreground font-medium md:text-m">US</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[13px] text-muted-foreground font-medium md:text-m">OTHERS</span>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid grid-cols-[1fr_45px_45px] items-center gap-4 px-6 py-4 md:grid-cols-[1fr_120px_120px] ${i !== features.length - 1 ? "border-b" : ""
                } transition-colors hover:bg-muted`}
            >
              {/* Feature info */}
              <div className="flex items-center gap-3">
                <span className="hidden md:flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-foreground">
                  {feature.icon}
                </span>
                <span className="text-base font-regular leading-none">{feature.name}</span>
              </div>

              {/* Shadcn support */}
              <div className="flex justify-center">
                <SupportIcon
                  level={feature.shadcn}
                  tooltip={feature.shadcnNote}
                  delay={0.2 + i * 0.05}
                />
              </div>

              {/* Bootstrap support */}
              <div className="flex justify-center">
                <SupportIcon
                  level={feature.bootstrap}
                  tooltip={feature.bootstrapNote}
                  delay={0.25 + i * 0.05}
                />
              </div>
            </div>
          ))}

          {/* Legend */}

        </motion.div>
      </div>
    </section>
  );
}
