import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Import images for Avatar Stack
import img1 from "../../app/assets/1.jpg";
import img2 from "../../app/assets/2.jpg";
import img3 from "../../app/assets/3.jpg";
import img4 from "../../app/assets/4.jpg";
import img5 from "../../app/assets/5.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

/* ─────────────────────────────────────────
   BackgroundLines  (Aceternity-style SVG)
───────────────────────────────────────── */
function BackgroundLines({ children }) {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Animated SVG line grid */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes dash-flow {
              0%   { stroke-dashoffset: 1000; opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }
            .bg-line {
              stroke: #e4e4e7;
              stroke-width: 1;
              fill: none;
              stroke-dasharray: 6 14;
              stroke-dashoffset: 1000;
              animation: dash-flow linear infinite;
            }
          `}</style>
        </defs>

        {/* Vertical lines */}
        {[...Array(18)].map((_, i) => (
          <line
            key={`v${i}`}
            className="bg-line"
            x1={`${(i + 1) * 5.5}%`} y1="0%"
            x2={`${(i + 1) * 5.5}%`} y2="100%"
            style={{
              animationDuration: `${6 + (i % 5) * 1.4}s`,
              animationDelay: `${(i * 0.38) % 4}s`,
            }}
          />
        ))}

        {/* Diagonal lines */}
        {[...Array(10)].map((_, i) => (
          <line
            key={`d${i}`}
            className="bg-line"
            x1={`${i * 12 - 20}%`} y1="0%"
            x2={`${i * 12 + 30}%`} y2="100%"
            style={{
              stroke: "#e4e4e7",
              strokeWidth: 0.8,
              animationDuration: `${9 + (i % 4) * 2}s`,
              animationDelay: `${(i * 0.7) % 5}s`,
            }}
          />
        ))}
      </svg>

      {/* Radial fade so centre feels clear */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(250,250,249,0.96) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content sits above */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   AvatarStack
───────────────────────────────────────── */
const AVATARS = [
  { src: img1, alt: "AK" },
  { src: img2, alt: "RJ" },
  { src: img3, alt: "SM" },
  { src: img4, alt: "LP" },
  { src: img5, alt: "TW" },
];

function AvatarStack({ count = "2,400+" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        {AVATARS.map((av, i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#e4e4e7",
              border: "2px solid #fafaf9",
              marginLeft: i === 0 ? 0 : -10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: AVATARS.length - i,
              position: "relative",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <img
              src={av.src.src || av.src}
              alt={av.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <p style={{ fontSize: 14, color: "#71717a", margin: 0 }}>
        <strong style={{ color: "#18181b", fontWeight: 600 }}>{count}</strong> people already joined
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Waitlist1  (main component)
───────────────────────────────────────── */
export default function Waitlist1() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    // Simulate async submit
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  }

  // Reset error on type
  useEffect(() => {
    if (status === "error") setStatus("idle");
  }, [email]);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafaf9; font-family: 'Inter', system-ui, sans-serif; }

        .wl-input {
          flex: 1;
          height: 44px;
          padding: 0 14px;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          color: #18181b;
          background: #fff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .wl-input::placeholder { color: #a1a1aa; }
        .wl-input:focus {
          border-color: #a1a1aa;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
        }
        .wl-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .wl-btn {
          height: 44px;
          padding: 0 20px;
          border-radius: 8px;
          background: #18181b;
          color: #fafaf9;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wl-btn:hover:not(:disabled) { background: #27272a; }
        .wl-btn:active:not(:disabled) { transform: scale(0.98); }
        .wl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.92); }
          60%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .success-msg {
          animation: pop-in 0.4s cubic-bezier(.4,0,.2,1) forwards;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #16a34a;
          font-weight: 500;
        }
      `}</style>

      <BackgroundLines>
        <motion.div
          style={{
            minHeight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
            textAlign: "center",
          }}
          {...fadeUp(0)}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff",
              border: "1px solid #e4e4e7",
              borderRadius: 99,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "#71717a",
              marginBottom: 28,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 0 2px #dcfce7",
            }} />
            Now accepting early access
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#181818ff",
              maxWidth: 700,
              marginBottom: 18,
            }}
          >
            Join the Waitlist
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              color: "#71717a",
              maxWidth: 600,
              marginBottom: 36,
              letterSpacing: "-0.01em",
              fontWeight: 400,
              lineHeight: "1.4"
            }}
          >
            Be the first to know when we launch. We're building something
            extraordinary.
          </p>

          {/* Form */}
          <div
            style={{ width: "100%", maxWidth: 440, marginBottom: 28 }}
          >
            {status === "success" ? (
              <div
                style={{
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="success-msg">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="9" fill="#dcfce7" />
                    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're on the list! We'll be in touch soon.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: 8 }}
                noValidate
              >
                <input
                  ref={inputRef}
                  className={`wl-input${status === "error" ? " error" : ""}`}
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  aria-label="Email address"
                  autoComplete="email"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  className="wl-btn"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <><span className="spinner" /> Joining…</>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p style={{
                marginTop: 8, fontSize: 12.5, color: "#ef4444",
                textAlign: "left",
              }}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Avatar row */}
          <div>
            <AvatarStack count="2,400+" />
          </div>
        </motion.div>
      </BackgroundLines>
    </>
  );
}

