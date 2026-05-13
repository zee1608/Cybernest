import { useState, useEffect } from "react";

const GLITCH_CHARS = "01!@#$%^&*ABCDEFXYZabcxyz";

function useGlitchText(text, active) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) =>
          i < iter ? char : char === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      iter += 1;
      if (iter > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [active, text]);
  return display;
}

function GlitchHeading({ text, className = "" }) {
  const [active, setActive] = useState(false);
  const glitched = useGlitchText(text, active);
  useEffect(() => { setActive(true); }, []);
  return (
    <h1
      className={className}
      onMouseEnter={() => setActive(true)}
      style={{ cursor: "default" }}
    >
      {glitched}
    </h1>
  );
}

function Badge({ children }) {
  return (
    <span style={{
      background: "#043f32ea", border: "1px solid #00ff9d44",
      color: "#00ff9d", fontFamily: "monospace", fontSize: "0.7rem",
      letterSpacing: 2, padding: "3px 10px", textTransform: "uppercase"
    }}>{children}</span>
  );
}

function StatCard({ value, label }) {
  return (
    <div style={{
      border: "1px solid #00ff9d33", padding: "1.5rem", textAlign: "center",
      background: "rgba(18, 15, 19, 0.94)",
    }}>
      <div style={{ fontSize: "2.4rem", fontWeight: 900, fontFamily: "monospace", color: "#00ff9d", lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#666", fontSize: "0.75rem", letterSpacing: 2, marginTop: 6, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

export default function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: "8rem 2rem 4rem", textAlign: "center", position: "relative", zIndex: 1
      }}>
        <GlitchHeading text="SureDefense systems" className="" />
        <style>{`
          h1 { font-family: 'Courier New', monospace; font-size: clamp(2.2rem, 6vw, 5rem); font-weight: 900;
            color: #fff; margin: 1.2rem 0 0.5rem; letter-spacing: 4px; line-height: 1.1; }
        `}</style>
        <p style={{
          color: "#00ff9d", fontFamily: "monospace", fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
          letterSpacing: 3, marginBottom: "1.5rem"
        }}>PROTECT · DETECT · RESPOND</p>
        <p style={{
          color: "#888", maxWidth: 620, lineHeight: 1.8, fontSize: "1rem", marginBottom: "2.5rem"
        }}>
          Cybersecurity is the practice of protecting systems, networks, and data from digital attacks,
          unauthorized access, and damage. In today's hyper-connected world — especially across Malawi —
          every organization is a target. We exist to defend you.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => setPage("About")} style={{
            background: "#00ff9d", color: "#000", border: "none", fontFamily: "monospace",
            fontWeight: 700, fontSize: "0.85rem", letterSpacing: 2, padding: "14px 32px",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#00e5ff"}
            onMouseLeave={e => e.target.style.background = "#00ff9d"}
          >OUR_SERVICES →</button>
          <button onClick={() => setPage("Stories")} style={{
            background: "transparent", border: "1px solid #ff4444", color: "#ff4444",
            fontFamily: "monospace", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 2,
            padding: "14px 32px", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = "#ff4444"; e.target.style.color = "#000"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#ff4444"; }}
          >LATEST THREATS </button>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <div style={{ width: 24, height: 40, border: "2px solid #00ff9d44", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: "#00ff9d", borderRadius: 2, animation: "scrollDot 2s infinite" }} />
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { title: "Defense", desc: "Protecting your digital assets from malicious actors, malware, ransomware, and unauthorized intrusion at every layer of your infrastructure." },
            { title: "Detection", desc: "Continuous monitoring and threat intelligence to identify suspicious activity, vulnerabilities, and breaches before they escalate." },
            { title: "Response", desc: "Rapid incident response protocols, forensic analysis, and recovery strategies to minimize damage and restore operations swiftly." },
            { title: "Compliance", desc: "Ensuring your systems meet local and international data protection standards — safeguarding your reputation and your clients' trust." },
          ].map(c => (
            <div key={c.title} style={{
              border: "1px solid #1a2a1a", padding: "2rem", background: "rgba(0,255,157,0.03)",
              transition: "all 0.3s", cursor: "default"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff9d66"; e.currentTarget.style.background = "rgba(0,255,157,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a2a1a"; e.currentTarget.style.background = "rgba(0,255,157,0.03)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{c.icon}</div>
              <h3 style={{ color: "#00ff9d", fontFamily: "monospace", letterSpacing: 3, fontSize: "0.9rem", marginBottom: "0.8rem", textTransform: "uppercase" }}>{c.title}</h3>
              <p style={{ color: "#777", lineHeight: 1.7, fontSize: "0.9rem" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "3rem 2rem 5rem", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Badge>// THREAT LANDSCAPE 2024</Badge>
          <p style={{ color: "#555", marginTop: 12, fontFamily: "monospace", fontSize: "0.8rem" }}>Why cybersecurity matters right now</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          <StatCard value="↑340%" label="Mobile Money Fraud" />
          <StatCard value="72hrs" label="Avg Breach Detection Time" />
          <StatCard value="MK2.8B" label="Est. Annual Cyber Losses" />
          <StatCard value="94%" label="Attacks via Phishing" />
        </div>
      </section>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        @keyframes scrollDot { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(12px)} }
      `}</style>
    </div>
  );
}