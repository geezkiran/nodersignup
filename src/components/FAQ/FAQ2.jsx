import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const faqs = [
  {
    question: "What makes this component library different?",
    answer:
      "Our components are built with accessibility first, using Radix UI primitives under the hood. Every component ships with sensible defaults, full keyboard navigation, and WAI-ARIA compliance out of the box — no extra configuration needed.",
  },
  {
    question: "Can I use this in a commercial project?",
    answer:
      "Yes, absolutely. All components are MIT licensed. You can use them in personal projects, commercial products, and client work without any attribution requirement, though we always appreciate a mention.",
  },
  {
    question: "Do the components work with Next.js and Vite?",
    answer:
      "Yes. The components are framework-agnostic React and work seamlessly with Next.js (App Router and Pages), Vite, Remix, Astro, and any other React-based setup. Just install and import.",
  },
  {
    question: "How do I customize the styles?",
    answer:
      "All styling is done with Tailwind CSS utility classes. You can override defaults by passing className props, editing the component source, or using CSS variables for theme-level changes. There's no locked-in design system.",
  },
  {
    question: "Is TypeScript supported?",
    answer:
      "Every component ships with full TypeScript definitions. Props are strictly typed, and you'll get autocomplete and type checking in any TypeScript project without any extra setup steps.",
  },
  {
    question: "Where can I get support?",
    answer:
      "You can open a GitHub issue for bugs or feature requests, join our Discord community for questions and discussions, or check the detailed documentation site for guides, examples, and API references.",
  },
];

function ChevronDown({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "#111827",
          fontFamily: "inherit",
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontSize: "17px",
            fontWeight: "500",
            lineHeight: "1.5",
            color: "#111827",
          }}
        >
          {question}
        </span>
        <ChevronDown open={isOpen} />
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.28s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              paddingBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.5",
              letterSpacing: "-0.01em",
              color: "#6b7280",
              margin: 0,
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ2() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
      }}
    >
      <div
        className="faq-grid"
        style={{
          maxWidth: "1300px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 4fr) minmax(0, 7fr)",
          gap: "150px",
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <motion.div className="faq-sticky-col" style={{ position: "sticky", top: "80px" }} {...fadeUp(0)}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b7280",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            ASK US ANYTHING
          </p>
          <h2
            style={{
              fontSize: "clamp(35px, 3.5vw, 40px)",
              fontWeight: "600",
              lineHeight: "1.2",
              color: "#111827",
              margin: "0 0 20px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently asked questions
          </h2>


        </motion.div>

        {/* Right column — accordion */}
        <motion.div
          style={{ borderTop: "1px solid #e5e7eb" }}
          {...fadeUp(0.15)}
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .faq-sticky-col {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
