"use client";

import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  Minus,
  X,
  Info,
  Palette,
  Layers,
  Code2,
  Accessibility,
  Repeat2,
  PenTool,
  Boxes,
  Zap,
  Component,
  Shield,
  Globe,
  TestTube,
} from "lucide-react";

const features = [
  {
    name: "Theming System",
    description: "Customizable design tokens and theme configuration",
    icon: <Palette className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Full CSS variable-based theming with Tailwind integration",
    bootstrapNote: "Sass variables only, limited runtime theming",
  },
  {
    name: "Component Ownership",
    description: "Copy components directly into your codebase",
    icon: <Layers className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "You own the code — no black box dependencies",
    bootstrapNote: "Components live in node_modules, not your codebase",
  },
  {
    name: "TypeScript Support",
    description: "First-class TypeScript types and intellisense",
    icon: <Code2 className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Built with TypeScript from the ground up",
    bootstrapNote: "Community-maintained @types/bootstrap package",
  },
  {
    name: "Accessibility (a11y)",
    description: "ARIA compliance and keyboard navigation",
    icon: <Accessibility className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Built on Radix UI primitives with full ARIA support",
    bootstrapNote: "Basic accessibility, but not WAI-ARIA compliant throughout",
  },
  {
    name: "Animation Support",
    description: "Transitions, keyframes and motion primitives",
    icon: <Repeat2 className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Tailwind animate + Radix state-based animations",
    bootstrapNote: "Basic CSS transitions only",
  },
  {
    name: "Design Customization",
    description: "Pixel-level control over component appearance",
    icon: <PenTool className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Utility-first with full Tailwind class control",
    bootstrapNote: "Override classes can lead to specificity conflicts",
  },

  {
    name: "Performance",
    description: "Bundle size efficiency and render optimization",
    icon: <Zap className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Tree-shakeable; only ship what you use",
    bootstrapNote: "Global CSS by default; requires manual purging",
  },
  {
    name: "Composability",
    description: "Ability to compose and extend components",
    icon: <Component className="size-4" />,
    shadcn: "full",
    bootstrap: "partial",
    shadcnNote: "Headless primitives allow full composition patterns",
    bootstrapNote: "Fixed component structure; limited composition",
  },
  {
    name: "Dark Mode",
    description: "Built-in dark mode support",
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
          <h2 className="mb-5 flex items-center justify-center gap-3 text-4xl font-semibold tracking-tighter md:text-4xl">
            What we do better
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base">
            A detailed feature comparison to help you choose the right UI
            framework for your next project.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div className="rounded-xl" {...fadeUp(0.15)}>
          <div className="grid grid-cols-[1fr_45px_45px] items-center gap-4 border-b bg-muted/40 px-6 py-4 md:grid-cols-[1fr_120px_120px]">
            <div />
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[18px] text-gray-500 font-medium md:text-sm">us</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[18px] text-gray-500 font-medium md:text-sm">others</span>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid grid-cols-[1fr_45px_45px] items-center gap-4 px-6 py-4 md:grid-cols-[1fr_120px_120px] ${i !== features.length - 1 ? "border-b" : ""
                } transition-colors hover:bg-muted/20`}
            >
              {/* Feature info */}
              <div className="flex items-start gap-3">
                <span className="hidden md:flex mt-0.5 size-8 shrink-0 items-center justify-center rounded-md border bg-background text-foreground">
                  {feature.icon}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="size-3.5 text-muted-foreground hover:text-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-56 text-xs">
                          {feature.description}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                    {feature.description}
                  </p>
                </div>
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
