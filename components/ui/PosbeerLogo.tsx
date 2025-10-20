"use client";
import React from 'react';

interface PosbeerLogoProps extends React.SVGProps<SVGSVGElement> {
  textColor?: string;
}

export const PosbeerLogo: React.FC<PosbeerLogoProps> = ({ textColor = "blue", ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" width="140" height="40" {...props}>
      <g transform="scale(1.5) translate(0, 2)">
        <path d="M17 11h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"
          fill="none" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11V8a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v3"
          fill="none" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19v-8" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12h10" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="40" y="28" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill={textColor}>
        POSBeer
      </text>
    </svg>
  );
};
