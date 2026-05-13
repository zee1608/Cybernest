import { useState } from "react";

function Badge({ children }) {
  return (
    <span style={{
      background: "#0f0f12eb", border: "1px solid #00ff9d44",
      color: "#00ff9d", fontFamily: "monospace", fontSize: "0.7rem",
      letterSpacing: 2, padding: "3px 10px", textTransform: "uppercase"
    }}>{children}</span>
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
          <span style={{ color: "#504e4e", fontFamily: "monospace", fontSize: "0.75rem" }}>{date}</span>
        </div>
        <h3 style={{ color: "#f4f1f1", fontFamily: "monospace", fontSize: "1rem", letterSpacing: 1, marginBottom: "0.7rem", lineHeight: 1.4 }}>{title}</h3>
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

export default function StoriesPage() {
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
          <span style={{ color: "#ff4444", fontSize: "1.2rem", marginTop: 2 }}></span>
          <p style={{ color: "#ff7777", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            ADVISORY: If you or your business has been affected by cybercrime, contact SureDefense systems immediately or report to Malawi Police Service Cybercrime Unit.
          </p>
        </div>

        {stories.map(s => <StoryCard key={s.title} {...s} />)}
      </div>
    </div>
  );
}