"use client";

import React, { useRef, useState } from "react";
import { sound } from "@/lib/audio";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  href?: string;
  accentColor?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = 8,
  href,
  accentColor,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  const content = (
    <div
      ref={cardRef}
      className={`tilt-card-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: transform ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        position: "relative",
        ...style,
      }}
    >
      {/* Glare specular reflection */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          borderRadius: "inherit",
          background: accentColor
            ? `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, ${accentColor}33, transparent 65%)`
            : `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 60%)`,
          transition: "opacity 0.25s ease",
        }}
      />
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {content}
      </a>
    );
  }

  return content;
}
