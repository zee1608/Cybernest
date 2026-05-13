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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const whatsappMsg = encodeURIComponent("Hello SureDefense systems, I need cybersecurity assistance.");
  const waLink = `https://wa.me/265899916755?text=${whatsappMsg}`;

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Badge>// GET IN TOUCH</Badge>
          <h2 style={{ fontFamily: "monospace", color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginTop: "1rem", letterSpacing: 3 }}>
            Contact <span style={{ color: "#00ff9d" }}>SureDefense systems</span>
          </h2>
          <p style={{ color: "#666", maxWidth: 540, margin: "1rem auto", lineHeight: 1.8 }}>
            Facing a cyber threat? Need a security audit? Reach out now — our team is ready to secure your systems.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "1rem",
              background: "#25D36611", border: "1px solid #25D366",
              padding: "1.2rem 1.5rem", marginBottom: "2rem", textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#25D36622"}
              onMouseLeave={e => e.currentTarget.style.background = "#25D36611"}
            >
              <div style={{ fontSize: "2rem" }}></div>
              <div>
                <div style={{ color: "#25D366", fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, fontSize: "0.9rem" }}>WhatsApp Us Instantly</div>
                <div style={{ color: "#aaa", fontSize: "0.82rem", marginTop: 2 }}>+265 899 916 755</div>
                <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "monospace", marginTop: 2 }}>Click to open chat →</div>
              </div>
            </a>

            {[
              { label: "Location", val: "Blantyre & Lilongwe, Malawi" },
              { label: "Email", val: "zeechimzere@gmail.com" },
              { label: "Phone", val: "+265 899 916 755" },
              { label: "Response", val: "Within 24 hours (Business Hours)" },
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
                ALL COMMUNICATIONS ARE ENCRYPTED<br />
                We operate under strict confidentiality agreements. Your security inquiries are safe with us.
              </p>
            </div>
          </div>

          <div style={{ border: "1px solid #1c2c1c", padding: "2.5rem", background: "rgba(0,0,0,0.3)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}></div>
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
                      <option>PC System Repair Services</option>
                      <option>GRC(Governance, Risk, and Compliance)Services</option>
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