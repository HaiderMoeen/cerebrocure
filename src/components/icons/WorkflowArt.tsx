import React from 'react';
import brainImg from '../../assets/brain.jpg';

export const WorkflowInputArt: React.FC = () => (
  <svg viewBox="0 0 220 150" className="w-full h-full rounded-xl border border-pink/30 bg-[#0d1130] p-2 overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id="artGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#181f50" />
        <stop offset="100%" stopColor="#0d1130" />
      </linearGradient>
      <clipPath id="tileClip">
        <rect x="0" y="0" width="48" height="42" rx="10" />
      </clipPath>
    </defs>

    {/* Animated Flowing Dashed Lines from 2 Imaging Boxes */}
    <path d="M 64 43 Q 110 43 110 75" fill="none" stroke="var(--pink)" strokeWidth="2" className="gline hot" />
    <path d="M 64 107 Q 110 107 110 75" fill="none" stroke="var(--pink)" strokeWidth="2" className="gline hot" />
    <path d="M 110 75 L 170 75" fill="none" stroke="var(--pink)" strokeWidth="2" className="gline hot" />

    {/* Image Tile 1: Clinical Imaging Data Series A */}
    <g transform="translate(12, 22)">
      <rect width="52" height="44" rx="10" fill="url(#artGrad)" stroke="var(--pink)" strokeWidth="1.5" />
      <g clipPath="url(#tileClip)" transform="translate(2, 1)">
        <image href={brainImg} x="0" y="-4" width="48" height="48" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="2" y="32" width="48" height="10" rx="4" fill="rgba(10,16,51,0.85)" />
      <text x="26" y="39" fill="var(--text)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">MRI - Axial</text>
    </g>

    {/* Image Tile 2: Clinical Imaging Data Series B */}
    <g transform="translate(12, 85)">
      <rect width="52" height="44" rx="10" fill="url(#artGrad)" stroke="var(--pink)" strokeWidth="1.5" />
      <g clipPath="url(#tileClip)" transform="translate(2, 1)">
        <image href={brainImg} x="-4" y="0" width="56" height="44" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="2" y="32" width="48" height="10" rx="4" fill="rgba(10,16,51,0.85)" />
      <text x="26" y="39" fill="var(--text)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">CT - Scan</text>
    </g>

    {/* AI Merge Node */}
    <circle cx="110" cy="75" r="8" fill="#181f50" stroke="var(--pink)" strokeWidth="2" />
    <circle cx="110" cy="75" r="3.5" fill="var(--pink)" />

    {/* Output Cloud Target Node */}
    <g transform="translate(162, 54)">
      <rect width="44" height="42" rx="10" fill="url(#artGrad)" stroke="var(--pink)" strokeWidth="1.5" />
      {/* Cloud Icon */}
      <path d="M 15 25 A 4 4 0 0 1 19 21 A 6 6 0 0 1 29 21 A 4 4 0 0 1 31 25 Z" fill="none" stroke="var(--pink)" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  </svg>
);

export const WorkflowNetworkArt: React.FC = () => {
  // Layer configuration: Layer 0 (1 node), Layer 1 (3 nodes), Layer 2 (3 nodes), Layer 3 (1 node)
  const layerCoords = [
    [{ x: 30, y: 75 }],
    [{ x: 80, y: 35 }, { x: 80, y: 75 }, { x: 80, y: 115 }],
    [{ x: 140, y: 35 }, { x: 140, y: 75 }, { x: 140, y: 115 }],
    [{ x: 190, y: 75 }],
  ];

  // Build edges between adjacent layers
  const edges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let l = 0; l < layerCoords.length - 1; l++) {
    layerCoords[l].forEach((n1, i) => {
      layerCoords[l + 1].forEach((n2, j) => {
        edges.push({
          x1: n1.x,
          y1: n1.y,
          x2: n2.x,
          y2: n2.y,
          delay: (i + j) * 0.15,
        });
      });
    });
  }

  return (
    <svg viewBox="0 0 220 150" className="w-full h-full rounded-xl border border-line bg-bg2/40 p-2 overflow-visible" aria-hidden="true">
      {/* Network Edges */}
      {edges.map((e, idx) => (
        <line
          key={idx}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="var(--pink)"
          strokeWidth="1.5"
          className="gline hot"
          style={{ animationDelay: `${e.delay}s` }}
        />
      ))}

      {/* Network Nodes */}
      {layerCoords.map((layer, lIdx) =>
        layer.map((node, nIdx) => {
          const isOutput = lIdx === 3;
          return (
            <g key={`${lIdx}-${nIdx}`} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={isOutput ? 9 : 6}
                fill={isOutput ? 'var(--pink)' : 'var(--surface2)'}
                stroke={isOutput ? 'var(--soft)' : 'var(--line)'}
                strokeWidth={isOutput ? 2 : 1.5}
                className={isOutput ? 'pulse' : ''}
              />
              {!isOutput && <circle r="2.5" fill="var(--text)" opacity="0.8" />}
            </g>
          );
        })
      )}
    </svg>
  );
};

export const WorkflowOutputArt: React.FC = () => (
  <svg viewBox="0 0 220 150" className="w-full h-full rounded-xl border border-line bg-bg2/40 p-3 overflow-visible" aria-hidden="true">
    {/* Report Card Frame */}
    <rect x="25" y="15" width="170" height="120" rx="14" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
    <rect x="35" y="25" width="150" height="100" rx="10" fill="var(--bg2)" stroke="rgba(238,241,255,0.08)" strokeWidth="1" />

    {/* Card Header */}
    <circle cx="52" cy="42" r="10" fill="var(--surface2)" stroke="var(--pink)" strokeWidth="1.5" />
    {/* Brain glyph */}
    <path d="M 49 42 C 47 38, 55 38, 53 42 C 55 46, 47 46, 49 42 Z" fill="none" stroke="var(--pink)" strokeWidth="1" />

    <rect x="70" y="36" width="60" height="5" rx="2.5" fill="var(--text)" />
    <rect x="70" y="46" width="40" height="4" rx="2" fill="var(--muted)" />

    {/* Checkmark Badge */}
    <g transform="translate(152, 34)">
      <circle cx="10" cy="10" r="10" fill="#22C55E" opacity="0.2" />
      <circle cx="10" cy="10" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" />
      <polyline points="6 10 9 13 14 7" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Progress Bar 1 (Pink fill) */}
    <text x="45" y="72" fill="var(--muted)" fontSize="9" fontFamily="var(--font-body)">Diagnostic Index</text>
    <rect x="45" y="78" width="130" height="8" rx="4" fill="var(--surface2)" />
    <rect x="45" y="78" width="98" height="8" rx="4" fill="var(--pink)" />

    {/* Progress Bar 2 (Peach/Amber fill) */}
    <text x="45" y="102" fill="var(--muted)" fontSize="9" fontFamily="var(--font-body)">Treatment Eligibility</text>
    <rect x="45" y="108" width="130" height="8" rx="4" fill="var(--surface2)" />
    <rect x="45" y="108" width="82" height="8" rx="4" fill="var(--peach)" />
  </svg>
);
