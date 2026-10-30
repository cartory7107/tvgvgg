import React from "react";

export function TavBookLogo({ className = "h-8 w-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="tb-grad-top" x1="60" y1="90" x2="440" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#7038F8" />
          <stop offset="35%" stop-color="#2563EB" />
          <stop offset="75%" stop-color="#0284C7" />
          <stop offset="100%" stop-color="#00D2FF" />
        </linearGradient>

        <linearGradient id="tb-grad-fold" x1="70" y1="120" x2="190" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4C1D95" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="tb-grad-spine" x1="180" y1="120" x2="270" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1D4ED8" />
          <stop offset="45%" stop-color="#2563EB" />
          <stop offset="85%" stop-color="#6366F1" />
          <stop offset="100%" stop-color="#8B5CF6" />
        </linearGradient>

        <linearGradient id="tb-grad-white" x1="240" y1="210" x2="380" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="70%" stop-color="#F0F9FF" />
          <stop offset="100%" stop-color="#BAE6FD" />
        </linearGradient>

        <linearGradient id="tb-grad-cyan" x1="250" y1="260" x2="420" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>

        <linearGradient id="tb-grad-back" x1="230" y1="360" x2="440" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1E40AF" />
          <stop offset="60%" stop-color="#0284C7" />
          <stop offset="100%" stop-color="#00D2FF" />
        </linearGradient>

        <filter id="tb-logo-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Back fanning page */}
      <path
        d="M 235 460 C 270 435 345 440 375 425 C 410 405 440 340 440 250 C 440 240 430 245 410 255 C 385 270 340 340 310 380 C 275 420 245 435 235 460 Z"
        fill="url(#tb-grad-back)"
        opacity="0.95"
      />

      {/* Middle cyan page */}
      <path
        d="M 235 460 C 265 430 330 430 360 415 C 395 395 425 315 420 210 C 420 205 410 210 395 220 C 365 240 325 315 295 365 C 260 410 240 430 235 460 Z"
        fill="url(#tb-grad-cyan)"
      />

      {/* Inner white page */}
      <path
        d="M 235 460 C 255 420 300 400 330 380 C 370 350 390 260 385 170 C 385 165 375 170 360 185 C 330 215 290 300 265 350 C 245 390 238 420 235 460 Z"
        fill="url(#tb-grad-white)"
        filter="url(#tb-logo-shadow)"
      />

      {/* Vertical spine & cover (stem of T) */}
      <path
        d="M 186 126 C 186 126 276 220 276 250 L 240 460 C 238 468 230 472 222 468 L 186 428 C 180 422 176 414 176 406 L 176 126 Z"
        fill="url(#tb-grad-spine)"
        filter="url(#tb-logo-shadow)"
      />

      {/* Spine highlight */}
      <path
        d="M 186 126 L 276 250 C 270 290 248 420 238 462 C 236 460 235 450 236 440 L 268 255 L 186 140 Z"
        fill="#FFFFFF"
        opacity="0.12"
      />

      {/* Top bar (T crossbar) */}
      <path
        d="M 100 166 C 82 166 72 152 76 135 L 94 56 C 98 38 114 26 132 26 L 370 26 C 392 26 408 42 404 64 L 396 98 C 392 116 376 128 358 128 L 194 128 C 186 128 178 132 174 140 L 168 152 C 160 162 148 166 136 166 L 100 166 Z"
        fill="url(#tb-grad-top)"
        filter="url(#tb-logo-shadow)"
      />

      {/* Under-bar fold */}
      <path
        d="M 76 135 C 80 155 96 166 120 166 L 186 166 C 180 152 182 136 190 128 L 110 128 Z"
        fill="url(#tb-grad-fold)"
      />
    </svg>
  );
}
