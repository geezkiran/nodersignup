import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import img1 from "../../app/assets/1.jpg";
import img2 from "../../app/assets/2.jpg";
import img3 from "../../app/assets/3.jpg";
import img4 from "../../app/assets/4.jpg";
import img5 from "../../app/assets/5.jpg";
import styles from "./Waitlist1.module.css";

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
      <div className={styles.section}>
        <motion.div
          className={styles.panel}
          {...fadeUp(0)}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
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

            EARLY ACCESS
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
              fontSize: 18,
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
                <span className={styles.successMessage}>
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
                  className={`${styles.input} ${status === "error" ? styles.inputError : ""}`}
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  aria-label="Email address"
                  autoComplete="email"
                  disabled={status === "loading"}
                />
                <button type="submit" className={styles.button} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <><span className={styles.spinner} /> Joining…</>
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
