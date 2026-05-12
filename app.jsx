import { useState, useEffect, useRef } from "react";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const NAV_LINKS = ["Home", "About", "Stories", "Contact"];
const GLITCH_CHARS = "01!@#$%^&*ABCDEFXYZabcxyz";

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
