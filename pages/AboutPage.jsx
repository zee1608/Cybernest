import { useState } from "react";

function Badge({ children }) {
  return (
    <span style={{
      background: "#00ff9d15", border: "1px solid #00ff9d44",
      color: "#00ff9d", fontFamily: "monospace", fontSize: "0.7rem",
      letterSpacing: 2, padding: "3px 10px", textTransform: "uppercase"
    }}>{children}</span>
  );
}

function ServiceCard({ icon, title, desc, features }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#00ff9d" : "#1c2c1c"}`,
        padding: "2rem", background: hovered ? "rgba(0,255,157,0.06)" : "rgba(0,255,157,0.02)",
        transition: "all 0.3s", cursor: "default"
      }}>
      <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
      <h3 style={{ color: "#00ff9d", fontFamily: "monospace", letterSpacing: 2, fontSize: "0.95rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>{title}</h3>
      <p style={{ color: "#777", lineHeight: 1.7, fontSize: "0.88rem", marginBottom: "1.2rem" }}>{desc}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {features.map(f => (
          <li key={f} style={{ color: "#555", fontSize: "0.8rem", fontFamily: "monospace", padding: "3px 0", borderTop: "1px solid #1a2a1a" }}>
            <span style={{ color: "#00ff9d", marginRight: 8 }}>▸</span>{f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  const services = [
    {
      icon: "🔬", title: "Vulnerability Assessment",
      desc: "Comprehensive scanning and analysis of your systems to identify security weaknesses before attackers exploit them.",
      features: ["Network Infrastructure Scanning", "Web App Vulnerability Testing", "Configuration Audits", "CVE Identification & Prioritization"]
    },
    {
      icon: "⚔️", title: "Penetration Testing",
      desc: "Ethical hacking simulations that mirror real-world attacks — exposing your true security posture under controlled conditions.",
      features: ["Black/Grey/White Box Testing", "Social Engineering Simulation", "API & Mobile App Pentesting", "Full Red Team Exercises"]
    },
    {
      icon: "📱", title: "Mobile Money Security",
      desc: "Specialized audits targeting Mpamba, Airtel Money, and mobile banking platforms common across Malawi.",
      features: ["Agent Network Security Review", "SIM Swap Attack Mitigation", "Transaction Fraud Detection", "USSD Security Analysis"]
    },
    {
      icon: "🎓", title: "Security Awareness Training",
      desc: "Empowering your staff to become the first line of defense against phishing, social engineering, and insider threats.",
      features: ["Phishing Simulation Campaigns", "Employee Security Workshops", "Policy Development", "Incident Reporting Procedures"]
    },
    {
      icon: "🔒", title: "Data Protection & Compliance",
      desc: "Align with MACRA regulations and international frameworks to protect customer data and avoid costly penalties.",
      features: ["GDPR/ISO 27001 Alignment", "Data Classification", "Privacy Impact Assessments", "Regulatory Gap Analysis"]
    },
    {
      icon: "🚨", title: "Incident Response",
      desc: "24/7 rapid-response team to contain breaches, preserve forensic evidence, and restore your operations.",
      features: ["Emergency Breach Containment", "Digital Forensics", "Malware Removal & Recovery", "Post-Incident Reporting"]
    },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Badge>// WHAT WE DO</Badge>
          <h2 style={{ fontFamily: "monospace", color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginTop: "1rem", letterSpacing: 3 }}>
            Our <span style={{ color: "#00ff9d" }}>Services</span>
          </h2>
          <p style={{ color: "#666", maxWidth: 580, margin: "1rem auto", lineHeight: 1.8 }}>
            CyberNest Solutions delivers end-to-end cybersecurity services built for the Malawian digital landscape —
            from large enterprises to SMEs and financial institutions.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>

        <div style={{ marginTop: "5rem", border: "1px solid #1c2c1c", padding: "3rem", background: "rgba(0,255,157,0.02)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Badge>// WHY CYBERNEST?</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {[
              { v: "Local Expertise", d: "Deep understanding of Malawi's telecom infrastructure and digital payment systems." },
              { v: "Certified Professionals", d: "Our team holds OSCP, CEH, CISSP, and CompTIA Security+ certifications." },
              { v: "Rapid Deployment", d: "On-site assessments across all regions — Lilongwe, Blantyre, Mzuzu and beyond." },
              { v: "Confidential Results", d: "All engagement reports are fully encrypted and delivered under strict NDA." },
            ].map(i => (
              <div key={i.v} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, border: "2px solid #00ff9d", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", background: "rgba(0,255,157,0.1)" }}>
                  <span style={{ color: "#00ff9d", fontSize: "1.2rem" }}>✓</span>
                </div>
                <h4 style={{ color: "#fff", fontFamily: "monospace", letterSpacing: 1, fontSize: "0.9rem", marginBottom: 6 }}>{i.v}</h4>
                <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.7 }}>{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}