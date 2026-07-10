import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const MindCheckLogo: React.FC<LogoProps> = ({ className = '', size = '100%' }) => {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="mindcheck-logo-svg"
    >
      <defs>
        {/* Define gradients for pristine high-fidelity depth */}
        <linearGradient id="backFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A3A24" /> {/* Deep Moss/Forest Green */}
          <stop offset="100%" stopColor="#2C543A" />
        </linearGradient>
        <linearGradient id="frontFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6EBE4" /> {/* Pristine Light Sage Cream */}
          <stop offset="100%" stopColor="#D5DFD3" />
        </linearGradient>
        <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3E26" />
          <stop offset="100%" stopColor="#255333" />
        </linearGradient>
        <linearGradient id="leafGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C5738" />
          <stop offset="100%" stopColor="#417D51" />
        </linearGradient>
        <linearGradient id="circleBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAFDF9" />
          <stop offset="100%" stopColor="#EBF1E9" />
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="5" stdDeviation="5" floodOpacity="0.10" floodColor="#1a3b25" />
        </filter>
      </defs>

      {/* Circle organic wrapper */}
      <circle cx="256" cy="256" r="236" fill="url(#circleBg)" stroke="#D0DCD0" strokeWidth="6" />

      {/* 1. Behind Profile (Dark Forest Shadow) */}
      <path 
        d="M256,70 C150,70 115,160 115,250 C115,340 170,410 256,435 C275,395 285,380 292,370 C300,350 310,345 315,330 C320,310 315,295 330,290 C345,285 358,265 365,250 C372,235 375,220 362,208 C349,195 352,185 357,175 C362,155 350,140 341,131 C323,113 310,100 256,70 Z" 
        fill="url(#backFaceGrad)" 
        opacity="0.9"
        filter="url(#softShadow)"
      />

      {/* 2. Overlapping Front Profile (Cream/Sage Green Face) */}
      <path 
        d="M242,88 C160,88 135,170 135,250 C135,330 180,395 242,415 C258,382 267,368 273,358 C280,340 288,335 292,322 C296,305 292,292 305,288 C318,283 328,265 334,251 C340,237 342,224 331,213 C320,201 323,192 327,183 C331,165 321,152 313,144 C297,128 288,116 242,88 Z" 
        fill="url(#frontFaceGrad)"
        filter="url(#softShadow)"
      />

      {/* 3. The Botanical Growth (Organic leaf sprigs weaving up the chin/neck) */}
      {/* Central plant stem */}
      <path 
        d="M244,414 C218,375 205,325 228,218 Q231,202 233,192" 
        stroke="#1A3A24" 
        strokeWidth="9" 
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path 
        d="M228,335 C176,325 148,245 220,225 C240,220 242,242 228,335 Z" 
        fill="url(#leafGradLeft)" 
        filter="url(#softShadow)"
      />

      {/* Bottom Left Leaf */}
      <path 
        d="M236,380 C155,370 128,295 215,275 C233,270 237,292 236,380 Z" 
        fill="url(#leafGradLeft)"
        filter="url(#softShadow)"
      />

      {/* Right Leaf */}
      <path 
        d="M233,285 C285,275 303,212 240,198 C222,194 220,212 233,285 Z" 
        fill="url(#leafGradRight)" 
        filter="url(#softShadow)"
      />

      {/* Leaf Vein overlays */}
      <path d="M188,278 C202,265 214,261 220,257" stroke="#8BBF98" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M192,330 C209,312 222,308 227,306" stroke="#8BBF98" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M250,242 C238,228 235,219 232,214" stroke="#D5DFD3" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
