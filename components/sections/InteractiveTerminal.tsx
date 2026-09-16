"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div style={{ color: "#8be4ff", lineHeight: 1.6 }}>
          <span>✦ SHIVAM-OS [v2.4.0-production]</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.6)" }}>
            Interactive terminal connected. Type a command or click a quick-chip below.
          </span>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    sound.playClick();
    const cmd = raw.toLowerCase();
    let res: React.ReactNode = null;

    switch (cmd) {
      case "help":
        res = (
          <div style={{ color: "#c7f35a", lineHeight: 1.7 }}>
            <div>Available system routines:</div>
            <div style={{ paddingLeft: "1rem", color: "rgba(255,255,255,0.85)" }}>
              <div>• <strong>projects</strong> — Inspect shipped case studies</div>
              <div>• <strong>skills</strong> — Core design & engineering stack</div>
              <div>• <strong>about</strong> — Background, location & focus</div>
              <div>• <strong>contact</strong> — Direct channels & coordinates</div>
              <div>• <strong>matrix</strong> — Trigger visual data stream</div>
              <div>• <strong>clear</strong> — Flush terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "projects":
        res = (
          <div style={{ lineHeight: 1.7 }}>
            <div style={{ color: "#ff7a4d", marginBottom: "0.4rem" }}>✦ Selected High-Consequence Systems:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", paddingLeft: "0.8rem" }}>
              <a href="/work/depthwizard" style={{ color: "#66e3ff", textDecoration: "underline" }}>
                01. DepthWizard (ISRO Geospatial Intelligence Platform) ↗
              </a>
              <a href="/work/projection-ai" style={{ color: "#c7f35a", textDecoration: "underline" }}>
                02. Projection AI (Predictive Revenue Modeling Workspace) ↗
              </a>
              <a href="/work/park-easy" style={{ color: "#ff3b82", textDecoration: "underline" }}>
                03. ParkEasy (Urban IoT Parking Operating System) ↗
              </a>
            </div>
          </div>
        );
        break;

      case "skills":
        res = (
          <div style={{ color: "#e5e5e5", lineHeight: 1.7 }}>
            <div style={{ color: "#c7f35a" }}>ENGINEERING:</div>
            <div style={{ color: "rgba(255,255,255,0.7)", paddingLeft: "0.8rem" }}>
              Next.js 16, React 19, TypeScript, WebGL, Three.js, Mapbox GL, D3.js, GSAP
            </div>
            <div style={{ color: "#66e3ff", marginTop: "0.4rem" }}>DESIGN:</div>
            <div style={{ color: "rgba(255,255,255,0.7)", paddingLeft: "0.8rem" }}>
              Interaction Architecture, Spatial UX, Design Systems, Motion Choreography
            </div>
          </div>
        );
        break;

      case "about":
        res = (
          <div style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
            <div><strong>Shivam Shelatkar</strong> — Creative Technologist & Product Designer</div>
            <div>Location: Thane·Mumbai, India · Remote-ready</div>
            <div style={{ marginTop: "0.4rem", color: "rgba(255,255,255,0.6)" }}>
              Specialized in high-density data visualization, geospatial interfaces, and real-time operations tools.
            </div>
          </div>
        );
        break;

      case "contact":
        res = (
          <div style={{ lineHeight: 1.7 }}>
            <div>Email: <a href="mailto:shelatkarshivam4@gmail.com" style={{ color: "#c7f35a" }}>shelatkarshivam4@gmail.com</a></div>
            <div>LinkedIn: <a href="https://linkedin.com/in/shivam-shelatkar" target="_blank" rel="noreferrer" style={{ color: "#66e3ff" }}>linkedin.com/in/shivam-shelatkar ↗</a></div>
            <div>GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#ff7a4d" }}>github.com ↗</a></div>
          </div>
        );
        break;

      case "matrix":
        res = (
          <div style={{ color: "#00f59b", fontFamily: "var(--font-mono)", fontSize: "0.68rem" }}>
            01001001 01010011 01010010 01001111 00100000 01010011 01000001 01010100<br />
            01000100 01000101 01010000 01010100 01001000 01010111 01001001 01011010<br />
            [SYSTEM OVERRIDE: COGNITIVE OVERHEAD MINIMIZED // ALL SYSTEMS NOMINAL]
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        res = (
          <div style={{ color: "#ff5f57" }}>
            Command not recognized: &quot;{raw}&quot;. Type <strong>help</strong> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output: res }]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div
      style={{
        background: "#08090c",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6)",
        fontFamily: "var(--font-mono)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          padding: "0.8rem 1.2rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.65rem",
          color: "rgba(255, 255, 255, 0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span style={{ marginLeft: "0.8rem", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <TerminalIcon size={12} /> shivam@workstation: ~ (zsh)
        </span>
        <span style={{ marginLeft: "auto", color: "#00f59b", fontSize: "0.58rem" }}>● ONLINE</span>
      </div>

      {/* Quick Action Chips */}
      <div
        style={{
          padding: "0.6rem 1.2rem",
          background: "rgba(0, 0, 0, 0.3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          QUICK:
        </span>
        {["projects", "skills", "about", "contact", "matrix", "clear"].map((q) => (
          <button
            key={q}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(q);
            }}
            onMouseEnter={() => sound.playHover()}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.8)",
              borderRadius: 999,
              padding: "0.22rem 0.65rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Output Stream */}
      <div
        style={{
          padding: "1.4rem",
          minHeight: 240,
          maxHeight: 380,
          overflowY: "auto",
          fontSize: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {history.map((item, idx) => (
          <div key={idx}>
            <div style={{ color: "rgba(255, 255, 255, 0.4)", marginBottom: "0.3rem" }}>
              <span style={{ color: "#00d4ff" }}>shivam@machine</span>:<span style={{ color: "#ff7a4d" }}>~</span>$ {item.command}
            </div>
            <div>{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.8rem 1.4rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <span style={{ color: "#00d4ff", marginRight: "0.5rem", fontSize: "0.75rem" }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' and press Enter..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
          }}
        />
        <button
          type="submit"
          style={{
            background: "var(--accent-red, #ff3b30)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.3rem 0.7rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Run
        </button>
      </form>
    </div>
  );
}
