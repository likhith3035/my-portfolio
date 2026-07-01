import React, { useRef } from 'react';

const ITEMS = [
  { text: 'Vibe Coder',              emoji: '⚡', accent: true  },
  { text: 'AI & Data Science',       emoji: '🤖', accent: false },
  { text: 'Cybersecurity Expert',    emoji: '🔒', accent: true  },
  { text: 'Full Stack Developer',    emoji: '💻', accent: false },
  { text: 'Open Source',             emoji: '🌐', accent: true  },
  { text: 'RAG Systems',             emoji: '🧠', accent: false },
  { text: 'IEEE 2nd Prize',          emoji: '🏆', accent: true  },
  { text: 'React · Firebase · Supabase', emoji: '🚀', accent: false },
];

function Track({ reverse }) {
  return (
    <div
      className={`flex items-center gap-10 font-black text-sm md:text-base tracking-widest uppercase whitespace-nowrap ${
        reverse ? 'animate-marquee-slow' : 'animate-marquee'
      }`}
      style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
        <React.Fragment key={i}>
          <span className={`flex items-center gap-2 ${item.accent ? 'text-[#FBD249]' : 'text-zinc-300'}`}>
            <span>{item.emoji}</span>
            {item.text}
          </span>
          <span className="text-zinc-600 text-xs select-none">✦</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function ScrollingBanner() {
  return (
    <div className="overflow-hidden bg-zinc-950 border-y border-zinc-800 py-3.5 md:py-4 select-none">
      <Track reverse={false} />
    </div>
  );
}
