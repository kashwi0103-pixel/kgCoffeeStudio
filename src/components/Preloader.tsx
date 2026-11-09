/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          soundEngine.playBubble();
          setTimeout(onComplete, 400);
          return 100;
        }
        // Little random increments for organic feel
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + inc, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getStatusText = () => {
    if (progress < 25) return 'Warming up the kettle... 🌸';
    if (progress < 55) return 'Selecting cute coffee beans... ☕';
    if (progress < 85) return 'Whisking pastel cream... ✨';
    return 'Your KG Coffee station is ready! 💕';
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F2] via-[#FDF0EC] to-[#FAE8E0] px-4 select-none">
      {/* Decorative Pastel Background Bubbles */}
      <div className="absolute top-12 left-10 w-24 h-24 rounded-full bg-pink-200/30 blur-xl animate-gentle-pulse pointer-events-none" />
      <div className="absolute bottom-16 right-12 w-32 h-32 rounded-full bg-amber-200/40 blur-xl animate-gentle-pulse pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-rose-200/30 blur-lg pointer-events-none" />

      {/* Center Preloader Cup Animation */}
      <div className="relative flex flex-col items-center mb-8">
        {/* Steam Curles */}
        <div className="flex items-center gap-3 mb-2 h-12">
          <span
            className="w-2 h-8 rounded-full bg-gradient-to-t from-pink-300 to-transparent animate-steam"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-2.5 h-10 rounded-full bg-gradient-to-t from-amber-300 to-transparent animate-steam"
            style={{ animationDelay: '0.4s' }}
          />
          <span
            className="w-2 h-8 rounded-full bg-gradient-to-t from-pink-300 to-transparent animate-steam"
            style={{ animationDelay: '0.8s' }}
          />
        </div>

        {/* Coffee Cup SVG */}
        <div className="relative">
          <svg
            width="130"
            height="110"
            viewBox="0 0 130 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Saucer */}
            <ellipse cx="65" cy="100" rx="55" ry="8" fill="#F3D5DB" />
            <ellipse cx="65" cy="98" rx="46" ry="6" fill="#FCE7ED" />

            {/* Cup Handle */}
            <path
              d="M95 40 C118 40 120 70 95 76"
              stroke="#F472B6"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M95 42 C114 42 116 68 95 74"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cup Body */}
            <path
              d="M25 24 H105 L96 90 C96 94 92 98 86 98 H44 C38 98 34 94 34 90 L25 24 Z"
              fill="#FFFFFF"
              stroke="#FCE7ED"
              strokeWidth="3"
            />

            {/* Pastel Cup Cute Face */}
            <circle cx="56" cy="58" r="3.5" fill="#6B4B3E" />
            <circle cx="74" cy="58" r="3.5" fill="#6B4B3E" />
            {/* Blushing cheeks */}
            <circle cx="50" cy="63" r="3" fill="#F472B6" opacity="0.6" />
            <circle cx="80" cy="63" r="3" fill="#F472B6" opacity="0.6" />
            {/* Smile */}
            <path
              d="M61 64 Q65 68 69 64"
              stroke="#6B4B3E"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Coffee Liquid inside Cup */}
            <ellipse cx="65" cy="24" rx="40" ry="8" fill="#DDB892" />
            <ellipse cx="65" cy="24" rx="36" ry="6" fill="#935E48" />

            {/* Latte Art Heart */}
            <path
              d="M65 24 C62 20 57 20 57 23 C57 26 65 29 65 29 C65 29 73 26 73 23 C73 20 68 20 65 24 Z"
              fill="#FFF8F0"
              opacity="0.9"
            />
          </svg>

          {/* Floating tiny bubbles */}
          <div className="absolute -top-3 left-6 w-3 h-3 rounded-full bg-pink-300/80 animate-float-bubble" />
          <div
            className="absolute -top-5 right-8 w-2 h-2 rounded-full bg-amber-300/80 animate-float-bubble"
            style={{ animationDelay: '1.2s' }}
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bubbly font-bold text-[#6D4C41] mb-2 text-center tracking-wide">
        Whipping Up Something Sweet
      </h2>

      {/* Dynamic Status Text */}
      <p className="text-sm font-medium text-[#9C7A6D] mb-5 text-center min-h-[22px]">
        {getStatusText()}
      </p>

      {/* Progress Bar */}
      <div className="w-64 max-w-[85vw] h-4 bg-white rounded-full p-1 border border-pink-200/80 shadow-inner mb-4 relative overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 mb-6">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>{progress}%</span>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPop();
          onComplete();
        }}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#7C594C] hover:text-[#53382D] bg-white/70 hover:bg-white rounded-full border border-pink-200/60 shadow-sm transition-all hover:scale-105"
      >
        <span>Enter Kitchen</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
