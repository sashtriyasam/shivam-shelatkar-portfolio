"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ExternalLink, Volume2, VolumeX } from "lucide-react";
import type { ProjectAudio } from "@/lib/projects";

interface MusicPlayerProps {
  audio: ProjectAudio;
  colorAccent?: string;
}

export function MusicPlayer({
  audio,
  colorAccent = "#ff7a4d",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);

  // Synthesizer nodes for fallback preview
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscs: OscillatorNode[];
    gain: GainNode;
  } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Total seconds parsed from duration string (e.g., "03:42")
  const parseDurationSeconds = (dur: string): number => {
    const parts = dur.split(":").map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 180;
  };

  const totalSeconds = parseDurationSeconds(audio.duration);

  // Start peaceful ambient melodic preview
  const startSynth = () => {
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Root chord frequencies (Sa-Pa drone & warm harmonies)
      const baseFreq = audio.title.includes("Thevita")
        ? 146.83 // D3
        : audio.title.includes("Raatrani")
          ? 130.81 // C3 (Nocturnal)
          : 164.81; // E3 (Saffron)

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);

      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0, baseFreq * 2.25];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle organic detune for acoustic shimmer
        osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.3 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      synthNodesRef.current = { oscs, gain: masterGain };
    } catch (e) {
      console.error("Web Audio error", e);
    }
  };

  const stopSynth = () => {
    if (synthNodesRef.current && audioCtxRef.current) {
      try {
        const { oscs, gain } = synthNodesRef.current;
        const now = audioCtxRef.current.currentTime;
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        setTimeout(() => {
          oscs.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {}
          });
          synthNodesRef.current = null;
        }, 700);
      } catch {}
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynth();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      startSynth();

      let currentSec = (progress / 100) * totalSeconds;
      intervalRef.current = setInterval(() => {
        currentSec += 1;
        if (currentSec >= totalSeconds) {
          currentSec = 0;
          setIsPlaying(false);
          stopSynth();
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        const pct = (currentSec / totalSeconds) * 100;
        setProgress(pct);

        const m = Math.floor(currentSec / 60);
        const s = Math.floor(currentSec % 60);
        setCurrentTime(
          `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
        );
      }, 1000);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    const currentSec = (val / 100) * totalSeconds;
    const m = Math.floor(currentSec / 60);
    const s = Math.floor(currentSec % 60);
    setCurrentTime(
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    );
  };

  const toggleMute = () => {
    if (synthNodesRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      if (isMuted) {
        synthNodesRef.current.gain.gain.setValueAtTime(0.05, now);
        setIsMuted(false);
      } else {
        synthNodesRef.current.gain.gain.setValueAtTime(0.00001, now);
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="music-player-card"
      style={{
        background: "rgba(12, 14, 20, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 20,
        padding: "24px 28px",
        margin: "24px 0 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background visual glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colorAccent}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isPlaying ? "#00f59b" : "rgba(255, 255, 255, 0.3)",
                boxShadow: isPlaying ? "0 0 10px #00f59b" : "none",
                transition: "all 300ms ease",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isPlaying ? "#00f59b" : "rgba(255, 255, 255, 0.5)",
              }}
            >
              {isPlaying ? "NOW PLAYING PREVIEW" : "IN-BROWSER AUDIO PREVIEW"}
            </span>
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {audio.title}
          </h3>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              color: "rgba(255, 255, 255, 0.65)",
            }}
          >
            {audio.subtitle}
          </p>
        </div>

        {/* Equalizer animation bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            height: 28,
            paddingBottom: 4,
          }}
        >
          {[18, 24, 12, 28, 16, 22, 10, 26].map((h, i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: isPlaying
                  ? `${Math.max(6, (h * ((progress % 7) + 1)) / 4)}px`
                  : "4px",
                background: isPlaying
                  ? colorAccent
                  : "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                transition: "height 200ms ease, background 300ms ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrub & Control bar */}
      <div style={{ margin: "20px 0 16px" }}>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          aria-label="Track progress"
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            accentColor: colorAccent,
            background: "rgba(255, 255, 255, 0.12)",
            cursor: "pointer",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: 6,
          }}
        >
          <span>{currentTime}</span>
          <span>{audio.duration}</span>
        </div>
      </div>

      {/* Control Actions & External Streaming */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause track" : "Play track"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              background: isPlaying ? "#ffffff" : colorAccent,
              color: isPlaying ? "#060709" : "#ffffff",
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 200ms ease, background 200ms ease",
            }}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            {isPlaying ? "Pause" : "Play Preview"}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              color: "rgba(255, 255, 255, 0.8)",
              cursor: "pointer",
            }}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        {/* Official Streaming Badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            Full Track:
          </span>

          {audio.streaming.spotify && (
            <a
              href={audio.streaming.spotify}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: "rgba(29, 185, 84, 0.15)",
                color: "#1ed760",
                border: "1px solid rgba(29, 185, 84, 0.3)",
                textDecoration: "none",
              }}
            >
              Spotify <ExternalLink size={11} />
            </a>
          )}

          {audio.streaming.jiosaavn && (
            <a
              href={audio.streaming.jiosaavn}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: "rgba(0, 212, 255, 0.12)",
                color: "#00d4ff",
                border: "1px solid rgba(0, 212, 255, 0.25)",
                textDecoration: "none",
              }}
            >
              JioSaavn <ExternalLink size={11} />
            </a>
          )}

          {audio.streaming.youtube && (
            <a
              href={audio.streaming.youtube}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: "rgba(255, 59, 48, 0.15)",
                color: "#ff3b30",
                border: "1px solid rgba(255, 59, 48, 0.3)",
                textDecoration: "none",
              }}
            >
              YouTube <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
