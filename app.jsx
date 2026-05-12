import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Stories", "Contact"];

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

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff9d22";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        ctx.fillStyle = i % 3 === 0 ? "#00ff9d33" : "#00e5ff11";
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 50);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, opacity: 0.5, pointerEvents: "none" }} />;
}

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,10,18,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid #00ff9d22" : "none",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "68px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setPage("Home")}>
        <div style={{
          width: 36, height: 36, border: "2px solid #00ff9d",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", transform: "rotate(45deg)"
        }}>
          <span style={{ transform: "rotate(-45deg)", fontSize: 14, fontWeight: 900, color: "#00ff9d", fontFamily: "monospace" }}>CN</span>
        </div>
        <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: "1.1rem", color: "#fff", letterSpacing: 2 }}>
          CyberNest<span style={{ color: "#00ff9d" }}>_</span>
        </span>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => setPage(link)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: page === link ? "#00ff9d" : "#aaa",
            fontFamily: "'Courier New', monospace", fontSize: "0.85rem",
            letterSpacing: 2, textTransform: "uppercase",
            borderBottom: page === link ? "1px solid #00ff9d" : "1px solid transparent",
            paddingBottom: 2, transition: "all 0.2s",
          }}>{link}</button>
        ))}
        <button onClick={() => setPage("Contact")} style={{
          background: "transparent", border: "1px solid #00ff9d",
          color: "#00ff9d", fontFamily: "'Courier New', monospace",
          fontSize: "0.8rem", letterSpacing: 2, padding: "8px 18px",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.background = "#00ff9d"; e.target.style.color = "#000"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00ff9d"; }}
        >SECURE_CONTACT</button>
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(m => !m)} style={{
        display: "none", background: "none", border: "none", cursor: "pointer",
        color: "#00ff9d", fontSize: "1.5rem"
      }} className="hamburger">☰</button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0,
          background: "rgba(6,10,18,0.98)", borderBottom: "1px solid #00ff9d22",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem", zIndex: 99
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => { setPage(link); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer",
              color: page === link ? "#00ff9d" : "#ccc",
              fontFamily: "'Courier New', monospace", fontSize: "1rem",
              letterSpacing: 2, textAlign: "left",
            }}>{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function Badge({ children }) {
  return (
    <span style={{
      background: "#00ff9d15", border: "1px solid #00ff9d44",
      color: "#00ff9d", fontFamily: "monospace", fontSize: "0.7rem",
      letterSpacing: 2, padding: "3px 10px", textTransform: "uppercase"
    }}>{children}</span>
  );
}

function StatCard({ value, label }) {
  return (
    <div style={{
      border: "1px solid #00ff9d33", padding: "1.5rem", textAlign: "center",
      background: "rgba(0,255,157,0.04)",
    }}>
      <div style={{ fontSize: "2.4rem", fontWeight: 900, fontFamily: "monospace", color: "#00ff9d", lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#666", fontSize: "0.75rem", letterSpacing: 2, marginTop: 6, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: "8rem 2rem 4rem", textAlign: "center", position: "relative", zIndex: 1
      }}>
        <Badge>// MALAWI'S CYBER DEFENSE UNIT</Badge>
        <GlitchHeading text="CyberNest Solutions" className="" />
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
          >LATEST THREATS ⚠</button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <div style={{ width: 24, height: 40, border: "2px solid #00ff9d44", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: "#00ff9d", borderRadius: 2, animation: "scrollDot 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* What is Cybersecurity */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { icon: "🛡️", title: "Defense", desc: "Protecting your digital assets from malicious actors, malware, ransomware, and unauthorized intrusion at every layer of your infrastructure." },
            { icon: "🔍", title: "Detection", desc: "Continuous monitoring and threat intelligence to identify suspicious activity, vulnerabilities, and breaches before they escalate." },
            { icon: "⚡", title: "Response", desc: "Rapid incident response protocols, forensic analysis, and recovery strategies to minimize damage and restore operations swiftly." },
            { icon: "🔐", title: "Compliance", desc: "Ensuring your systems meet local and international data protection standards — safeguarding your reputation and your clients' trust." },
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

      {/* Stats */}
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

function AboutPage() {
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

        {/* Why Choose Us */}
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

function StoryCard({ date, title, tag, tagColor, summary, details, source }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article style={{
      border: `1px solid ${tagColor}33`, background: `${tagColor}05`,
      marginBottom: "1.5rem", overflow: "hidden", transition: "all 0.3s"
    }}>
      <div style={{ padding: "1.5rem 2rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.8rem", flexWrap: "wrap" }}>
          <span style={{ background: `${tagColor}22`, color: tagColor, fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: 2, padding: "3px 10px", border: `1px solid ${tagColor}55` }}>{tag}</span>
          <span style={{ color: "#444", fontFamily: "monospace", fontSize: "0.75rem" }}>{date}</span>
        </div>
        <h3 style={{ color: "#eee", fontFamily: "monospace", fontSize: "1rem", letterSpacing: 1, marginBottom: "0.7rem", lineHeight: 1.4 }}>{title}</h3>
        <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.7 }}>{summary}</p>
        {expanded && <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.8, marginTop: "1rem", borderTop: "1px solid #1a2a1a", paddingTop: "1rem" }}>{details}</p>}
        {source && expanded && <p style={{ color: "#444", fontSize: "0.75rem", fontFamily: "monospace", marginTop: 8 }}>SOURCE: {source}</p>}
      </div>
      <button onClick={() => setExpanded(e => !e)} style={{
        width: "100%", background: "transparent", border: "none", borderTop: "1px solid #1a2a1a",
        color: tagColor, fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: 2,
        padding: "10px", cursor: "pointer", textTransform: "uppercase",
      }}>{expanded ? "▲ COLLAPSE" : "▼ READ MORE"}</button>
    </article>
  );
}

function StoriesPage() {
  const stories = [
    {
      date: "March 2024", tag: "MOBILE MONEY FRAUD", tagColor: "#ff4444",
      title: "Mpamba Agents Targeted in Organised SIM-Swap Scam — Thousands Lost",
      summary: "A wave of fraudulent SIM-swap attacks hit TNM Mpamba agents across Blantyre and Lilongwe, with victims losing between MK50,000 and MK800,000 each before operators could respond.",
      details: "Criminals posed as network representatives contacting agents via WhatsApp, claiming their SIM cards needed 'security upgrades.' Once agents shared verification codes, attackers swapped their SIMs and drained Mpamba float accounts within minutes. Dozens of agents reported losses before TNM issued an emergency alert. Law enforcement in Blantyre arrested three suspects linked to a coordinated network, but losses were largely unrecovered. Cybersecurity experts urged operators to mandate two-factor authentication for all agent accounts and eliminate OTP-based verification over phone calls.",
      source: "Malawi24 / Times Group Malawi"
    },
    {
      date: "January 2024", tag: "AIRTEL MONEY FRAUD", tagColor: "#ff6b00",
      title: "Airtel Money Agents Defrauded Through Fake 'Agent Upgrade' Portal",
      summary: "Scammers created a phishing website mimicking Airtel Malawi's agent portal, tricking agents into entering credentials that were then used to siphon mobile money balances.",
      details: "The fake portal was shared in official-looking WhatsApp messages claiming agents needed to upgrade their accounts to 'Airtel Money 2.0.' The site collected PIN numbers, phone numbers, and ID details. At least 47 agents across the country reported compromised accounts, with total losses estimated above MK3 million. Airtel Malawi issued public warnings via radio and social media but the domain remained accessible for days. This incident highlights the urgent need for agent digital literacy and proper incident reporting channels.",
      source: "Malawi News Agency (MANA)"
    },
    {
      date: "October 2023", tag: "PHISHING", tagColor: "#ffcc00",
      title: "Government Email Accounts Compromised in Spear-Phishing Campaign",
      summary: "Several Malawian government ministry email accounts were hijacked via targeted spear-phishing emails, exposing sensitive procurement and budget documents.",
      details: "Attackers sent emails appearing to come from the Ministry of Finance requesting 'urgent document verification.' Staff who clicked the link were redirected to a fake Outlook login page. Compromised credentials were used to access internal communications for weeks before detection. Forensic investigators found evidence that attackers had exfiltrated budget allocation files. The incident renewed calls for mandatory cybersecurity training for all civil servants and the adoption of government-wide multi-factor authentication.",
      source: "The Nation Malawi"
    },
    {
      date: "August 2023", tag: "SOCIAL ENGINEERING", tagColor: "#aa44ff",
      title: "WhatsApp Impersonation Scam Targets Small Businesses in Blantyre",
      summary: "Business owners in Blantyre's CBD were defrauded after criminals impersonated their trusted suppliers via cloned WhatsApp accounts, redirecting payments to fraudulent accounts.",
      details: "Attackers studied businesses' communication patterns before creating WhatsApp accounts with near-identical names and profile photos of known suppliers. They then sent invoice-like messages asking for urgent payments to 'new bank details.' Several businesses paid before discovering the fraud. Losses per victim ranged from MK200,000 to MK1.5 million. Police opened investigations but recovery was limited. Experts recommend always verbally confirming any change in payment details via a known direct phone call — never through messaging platforms alone.",
      source: "Zodiak Broadcasting Station"
    },
    {
      date: "May 2023", tag: "RANSOMWARE", tagColor: "#ff4444",
      title: "Local Hospital System Hit by Ransomware — Patient Records Locked for Days",
      summary: "A private hospital in Lilongwe had its patient management system encrypted by ransomware, forcing staff to operate on pen-and-paper for over 72 hours.",
      details: "The attack is believed to have originated from a phishing email opened by administrative staff. The ransomware encrypted all patient records, appointment databases, and billing systems. The hospital refused to pay the ransom demand (reported to be in Bitcoin) and instead worked with a local IT firm to restore from backups — though weeks of records were lost. The incident exposed the critical vulnerability of healthcare systems in Malawi to cyber threats and the absence of proper data backup protocols in many institutions.",
      source: "Malawi Medical Journal (reported)"
    },
    {
      date: "February 2023", tag: "MOBILE MONEY FRAUD", tagColor: "#ff4444",
      title: "Pensioners Targeted in Elaborate Mobile Banking Fraud Scheme",
      summary: "Elderly Malawians receiving pension via mobile money were systematically defrauded through fake 'NSSF verification' calls requesting PINs.",
      details: "Fraudsters called pensioners claiming to be from the National Social Security Fund, stating that accounts needed to be 'verified' before the next payment cycle. Victims were instructed to share their mobile money PIN or forward an OTP to 'confirm identity.' Scores of pensioners in Mzuzu, Zomba, and Lilongwe lost full monthly pension payments ranging from MK30,000 to MK180,000. NSSF issued public clarifications that they never ask for PINs via phone, but awareness reached victims too late. This case underscores the need for targeted digital fraud education for vulnerable populations.",
      source: "Times Television Malawi"
    },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Badge>// CYBER CRIME REPORTS</Badge>
          <h2 style={{ fontFamily: "monospace", color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginTop: "1rem", letterSpacing: 3 }}>
            Malawi <span style={{ color: "#ff4444" }}>Threat</span> Stories
          </h2>
          <p style={{ color: "#666", maxWidth: 560, margin: "1rem auto", lineHeight: 1.8, fontSize: "0.9rem" }}>
            Documented cybercrime incidents from across Malawi — including scams targeting Mpamba and Airtel Money agents.
            Awareness is the first step to protection.
          </p>
        </div>

        <div style={{
          background: "#ff444411", border: "1px solid #ff444444", padding: "1rem 1.5rem",
          marginBottom: "2.5rem", display: "flex", gap: "1rem", alignItems: "flex-start"
        }}>
          <span style={{ color: "#ff4444", fontSize: "1.2rem", marginTop: 2 }}>⚠</span>
          <p style={{ color: "#ff7777", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            ADVISORY: If you or your business has been affected by cybercrime, contact CyberNest Solutions immediately or report to Malawi Police Service Cybercrime Unit.
          </p>
        </div>

        {stories.map(s => <StoryCard key={s.title} {...s} />)}
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const whatsappMsg = encodeURIComponent("Hello CyberNest Solutions, I need cybersecurity assistance.");
  const waLink = `https://wa.me/265899916755?text=${whatsappMsg}`;

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Badge>// GET IN TOUCH</Badge>
          <h2 style={{ fontFamily: "monospace", color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginTop: "1rem", letterSpacing: 3 }}>
            Contact <span style={{ color: "#00ff9d" }}>CyberNest</span>
          </h2>
          <p style={{ color: "#666", maxWidth: 540, margin: "1rem auto", lineHeight: 1.8 }}>
            Facing a cyber threat? Need a security audit? Reach out now — our team is ready to secure your systems.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem", alignItems: "start" }}>
          {/* Contact Info */}
          <div>
            {/* WhatsApp CTA */}
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "1rem",
              background: "#25D36611", border: "1px solid #25D366",
              padding: "1.2rem 1.5rem", marginBottom: "2rem", textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#25D36622"}
              onMouseLeave={e => e.currentTarget.style.background = "#25D36611"}
            >
              <div style={{ fontSize: "2rem" }}>📲</div>
              <div>
                <div style={{ color: "#25D366", fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, fontSize: "0.9rem" }}>WhatsApp Us Instantly</div>
                <div style={{ color: "#aaa", fontSize: "0.82rem", marginTop: 2 }}>+265 899 916 755</div>
                <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "monospace", marginTop: 2 }}>Click to open chat →</div>
              </div>
            </a>

            {[
              { icon: "📍", label: "Location", val: "Blantyre & Lilongwe, Malawi" },
              { icon: "📧", label: "Email", val: "info@cybernest.mw" },
              { icon: "📞", label: "Phone", val: "+265 899 916 755" },
              { icon: "🕒", label: "Response", val: "Within 2 hours (Business Hours)" },
            ].map(c => (
              <div key={c.label} style={{
                display: "flex", gap: "1rem", alignItems: "center",
                padding: "1rem", border: "1px solid #1c2c1c", marginBottom: "0.8rem",
                background: "rgba(0,255,157,0.02)"
              }}>
                <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
                <div>
                  <div style={{ color: "#00ff9d", fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: 2 }}>{c.label}</div>
                  <div style={{ color: "#bbb", fontSize: "0.88rem", marginTop: 2 }}>{c.val}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#00ff9d08", border: "1px solid #00ff9d22" }}>
              <p style={{ color: "#555", fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: 1, lineHeight: 1.7 }}>
                🔒 ALL COMMUNICATIONS ARE ENCRYPTED<br />
                We operate under strict confidentiality agreements. Your security inquiries are safe with us.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ border: "1px solid #1c2c1c", padding: "2.5rem", background: "rgba(0,0,0,0.3)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: "#00ff9d", fontFamily: "monospace", letterSpacing: 2 }}>MESSAGE_RECEIVED</h3>
                <p style={{ color: "#666", marginTop: 8 }}>We'll respond within 2 business hours.</p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: "1.5rem", background: "transparent", border: "1px solid #00ff9d44",
                  color: "#00ff9d", fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: 2,
                  padding: "10px 24px", cursor: "pointer"
                }}>SEND ANOTHER</button>
              </div>
            ) : (
              <>
                <Badge>// SECURE FORM</Badge>
                <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
                  {[
                    { name: "name", label: "FULL NAME", type: "text", placeholder: "Your full name" },
                    { name: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
                    { name: "phone", label: "PHONE / WHATSAPP", type: "text", placeholder: "+265 ..." },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ color: "#444", fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: 2, display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} style={{
                        width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid #2a3a2a",
                        color: "#eee", fontFamily: "monospace", fontSize: "0.9rem", padding: "10px 12px",
                        outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
                      }}
                        onFocus={e => e.target.style.borderColor = "#00ff9d"}
                        onBlur={e => e.target.style.borderColor = "#2a3a2a"}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ color: "#444", fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: 2, display: "block", marginBottom: 6 }}>SERVICE NEEDED</label>
                    <select name="service" value={form.service} onChange={handleChange} style={{
                      width: "100%", background: "#0a1a0a", border: "1px solid #2a3a2a",
                      color: "#eee", fontFamily: "monospace", fontSize: "0.85rem", padding: "10px 12px",
                      outline: "none", boxSizing: "border-box"
                    }}>
                      <option value="">-- Select Service --</option>
                      <option>Vulnerability Assessment</option>
                      <option>Penetration Testing</option>
                      <option>Mobile Money Security</option>
                      <option>Security Awareness Training</option>
                      <option>Incident Response</option>
                      <option>Data Protection & Compliance</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: "#444", fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: 2, display: "block", marginBottom: 6 }}>MESSAGE</label>
                    <textarea name="message" placeholder="Describe your security concern or inquiry..." value={form.message} onChange={handleChange} rows={5} style={{
                      width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid #2a3a2a",
                      color: "#eee", fontFamily: "monospace", fontSize: "0.88rem", padding: "10px 12px",
                      outline: "none", boxSizing: "border-box", resize: "vertical", transition: "border-color 0.2s"
                    }}
                      onFocus={e => e.target.style.borderColor = "#00ff9d"}
                      onBlur={e => e.target.style.borderColor = "#2a3a2a"}
                    />
                  </div>
                  <button onClick={handleSubmit} style={{
                    background: "#00ff9d", color: "#000", border: "none", fontFamily: "monospace",
                    fontWeight: 700, fontSize: "0.85rem", letterSpacing: 2, padding: "14px",
                    cursor: "pointer", transition: "all 0.2s", width: "100%"
                  }}
                    onMouseEnter={e => e.target.style.background = "#00e5ff"}
                    onMouseLeave={e => e.target.style.background = "#00ff9d"}
                  >SEND_SECURE_MESSAGE →</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  const wa = `https://wa.me/265899916755?text=${encodeURIComponent("Hello CyberNest Solutions")}`;
  return (
    <footer style={{ borderTop: "1px solid #0a1a0a", background: "rgba(0,0,0,0.6)", padding: "3rem 2rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#00ff9d", letterSpacing: 2, marginBottom: "0.8rem" }}>CyberNest Solutions</div>
          <p style={{ color: "#444", fontSize: "0.82rem", lineHeight: 1.7 }}>Malawi's trusted cybersecurity partner — protecting individuals, businesses, and institutions from digital threats.</p>
        </div>
        <div>
          <div style={{ color: "#555", fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: 2, marginBottom: "1rem" }}>NAVIGATION</div>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{
              display: "block", background: "none", border: "none", color: "#555",
              fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: 1, cursor: "pointer",
              padding: "3px 0", transition: "color 0.2s", textAlign: "left"
            }}
              onMouseEnter={e => e.target.style.color = "#00ff9d"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{l}</button>
          ))}
        </div>
        <div>
          <div style={{ color: "#555", fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: 2, marginBottom: "1rem" }}>CONTACT US</div>
          <a href={wa} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#25D366", textDecoration: "none", fontFamily: "monospace", fontSize: "0.82rem"
          }}>📲 WhatsApp: +265 899 916 755</a>
          <p style={{ color: "#444", fontFamily: "monospace", fontSize: "0.8rem", marginTop: 8 }}>📧 info@cybernest.mw</p>
          <p style={{ color: "#444", fontFamily: "monospace", fontSize: "0.8rem", marginTop: 4 }}>📍 Blantyre & Lilongwe, Malawi</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #0a1a0a", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ color: "#333", fontFamily: "monospace", fontSize: "0.72rem" }}>© 2024 CyberNest Solutions. All rights reserved.</p>
        <p style={{ color: "#222", fontFamily: "monospace", fontSize: "0.7rem" }}>PROTECT · DETECT · RESPOND</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    if (page === "Home") return <HomePage setPage={setPage} />;
    if (page === "About") return <AboutPage />;
    if (page === "Stories") return <StoriesPage />;
    if (page === "Contact") return <ContactPage />;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060a12", color: "#eee", fontFamily: "'Georgia', serif" }}>
      <MatrixRain />
      <Navbar page={page} setPage={setPage} />
      <main style={{ position: "relative", zIndex: 1 }}>
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
