import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

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

const AVATARS = [
  { src: img1, alt: "AK" },
  { src: img2, alt: "RJ" },
  { src: img3, alt: "SM" },
  { src: img4, alt: "LP" },
  { src: img5, alt: "TW" },
];

function AvatarStack({ count = "2,400+" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        {AVATARS.map((av, i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--bg-secondary)",
              border: "2px solid rgb(187, 187, 187)",
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
      <p style={{ fontSize: 14, color: "#a1a1aa", margin: 0 }}>
        <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{count}</strong> people already joined
      </p>
    </div>
  );
}

export default function Waitlist1() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  }

  useEffect(() => {
    if (status === "error") setStatus("idle");
  }, [email]);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg-color); color: var(--text-primary); font-family: 'Inter', system-ui, sans-serif; }

        .wl-input {
          flex: 1;
          height: 44px;
          padding: 0 14px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          color: var(--text-primary);
          background: rgb(var(--rgb-text) / 0.05);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .wl-input::placeholder { color: var(--text-secondary); }
        .wl-input:focus {
          border-color: var(--text-secondary);
          box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
        }
        .wl-input.error {
          border-color: var(--danger);
          box-shadow: 0 0 0 3px rgb(var(--rgb-danger) / 0.1);
        }

        .wl-btn {
          height: 44px;
          padding: 0 20px;
          border-radius: 8px;
          background: var(--text-primary);
          color: var(--bg-color);
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
        .wl-btn:hover:not(:disabled) { opacity: 0.88; }
        .wl-btn:active:not(:disabled) { transform: scale(0.98); }
        .wl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgb(var(--rgb-text) / 0.3);
          border-top-color: var(--text-primary);
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
          color: var(--success);
          font-weight: 500;
        }
      `}</style>

      <div>
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
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              borderRadius: 99,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 400,
              color: "#a1a1aa",
              marginBottom: 28,
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
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
              fontSize: "3rem",
              fontFamily: "var(--font-instrument-serif)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
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
              color: "#a1a1aa",
              maxWidth: 600,
              marginBottom: 36,
              letterSpacing: "-0.01em",
              fontWeight: 400,
              lineHeight: "1.4",
            }}
          >
            Be the first to know when we launch. We're building something extraordinary.
          </p>

          {/* Form */}
          <div style={{ width: "100%", maxWidth: 440, marginBottom: 28 }}>
            {status === "success" ? (
              <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="success-msg">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="9" fill="#dcfce7" />
                    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're on the list! We'll be in touch soon.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }} noValidate>
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
                <button type="submit" className="wl-btn" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <><span className="spinner" /> Joining…</>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p style={{ marginTop: 8, fontSize: 12.5, color: "#ef4444", textAlign: "left" }}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Avatar row */}
          <AvatarStack count="2,400+" />
        </motion.div>
      </div>
    </>
  );
}