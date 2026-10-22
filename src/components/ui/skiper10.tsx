'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Skiper10Props {
  onComplete?: () => void;
  brandName?: string;
  brandRole?: string;
  duration?: number; // total loading duration in seconds
  numberOfColumns?: number;
}

export function Skiper10({
  onComplete,
  brandName = 'JAYANTH E',
  brandRole = 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
  duration = 1.9,
  numberOfColumns = 5,
}: Skiper10Props) {
  const [progress, setProgress] = useState(0);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [isCompletelyFinished, setIsCompletelyFinished] = useState(false);

  // Smooth numeric counter 0 to 100%
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const durationMs = duration * 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const nextProgress = Math.min(Math.floor((elapsed / durationMs) * 100), 100);

      setProgress(nextProgress);

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Pause briefly at 100% so user sees completion, then initiate double step parting
        setTimeout(() => {
          setIsDoneLoading(true);
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration]);

  const handleExitComplete = () => {
    setIsCompletelyFinished(true);
    if (onComplete) {
      onComplete();
    }
  };

  if (isCompletelyFinished) {
    return null;
  }

  const columns = Array.from({ length: numberOfColumns }, (_, i) => i);
  const easeTransition = [0.76, 0, 0.24, 1] as const;

  // Stagger calculation based on column index
  const getDelay = (index: number) => index * 0.07;
  const whiteLayerOffset = 0.14; // Delay for white step behind black step

  // Dynamic phase label based on progress
  const getPhaseText = () => {
    if (progress < 35) return 'LOADING CORE WORKSPACE...';
    if (progress < 75) return 'INITIALIZING AI & NEURAL PIPELINES...';
    if (progress < 100) return 'PREPARING PORTFOLIO EXPERIENCE...';
    return 'READY';
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isDoneLoading && (
        <motion.div
          key="skiper10-container"
          className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden select-none bg-transparent"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* ================================================================
              TOP HALF: DUAL STAIRS (WHITE STEP BEHIND, BLACK STEP IN FRONT)
              ================================================================ */}
          {/* Top White Step Layer (behind, z-10) */}
          <div className="absolute top-0 left-0 right-0 h-1/2 flex w-full pointer-events-none z-10">
            {columns.map((i) => (
              <motion.div
                key={`top-white-stair-${i}`}
                initial={{ y: '0%' }}
                exit={{
                  y: '-101%',
                  transition: {
                    duration: 0.82,
                    ease: easeTransition,
                    delay: getDelay(i) + whiteLayerOffset, // Second step: White follows after black
                  },
                }}
                className="h-full flex-1 bg-[#f8fafc] border-r border-neutral-300/60 last:border-none shadow-xl"
              />
            ))}
          </div>

          {/* Top Black Step Layer (in front, z-11) */}
          <div className="absolute top-0 left-0 right-0 h-1/2 flex w-full pointer-events-none z-11">
            {columns.map((i) => (
              <motion.div
                key={`top-black-stair-${i}`}
                initial={{ y: '0%' }}
                exit={{
                  y: '-101%',
                  transition: {
                    duration: 0.82,
                    ease: easeTransition,
                    delay: getDelay(i), // First step: Black slides first
                  },
                }}
                className="h-full flex-1 bg-[#090b10] border-r border-[#1e2330]/80 last:border-none shadow-2xl"
              />
            ))}
          </div>

          {/* ===================================================================
              BOTTOM HALF: DUAL STAIRS (WHITE STEP BEHIND, BLACK STEP IN FRONT)
              =================================================================== */}
          {/* Bottom White Step Layer (behind, z-10) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex w-full pointer-events-none z-10">
            {columns.map((i) => (
              <motion.div
                key={`bottom-white-stair-${i}`}
                initial={{ y: '0%' }}
                exit={{
                  y: '101%',
                  transition: {
                    duration: 0.82,
                    ease: easeTransition,
                    delay: getDelay(numberOfColumns - 1 - i) + whiteLayerOffset, // Second step: White follows
                  },
                }}
                className="h-full flex-1 bg-[#f8fafc] border-r border-neutral-300/60 last:border-none shadow-xl"
              />
            ))}
          </div>

          {/* Bottom Black Step Layer (in front, z-11) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex w-full pointer-events-none z-11">
            {columns.map((i) => (
              <motion.div
                key={`bottom-black-stair-${i}`}
                initial={{ y: '0%' }}
                exit={{
                  y: '101%',
                  transition: {
                    duration: 0.82,
                    ease: easeTransition,
                    delay: getDelay(numberOfColumns - 1 - i), // First step: Black slides first
                  },
                }}
                className="h-full flex-1 bg-[#090b10] border-r border-[#1e2330]/80 last:border-none shadow-2xl"
              />
            ))}
          </div>

          {/* ===================================================================
              CENTER INFORMATION & LIVE COUNTER
              =================================================================== */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 pointer-events-none">
            <motion.div
              className="flex flex-col items-center text-center max-w-xl w-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.92,
                filter: 'blur(8px)',
                transition: { duration: 0.28, ease: 'easeIn' },
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Minimal Top Pill Badge - Pearl Silver Accent */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neutral-400/30 bg-neutral-900/80 backdrop-blur-md shadow-lg shadow-black/70">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-neutral-200 uppercase">
                  {brandRole}
                </span>
              </div>

              {/* High Contrast Name Heading with Pearl Glow */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.18em] text-white uppercase font-sans mb-3 drop-shadow-[0_4px_30px_rgba(255,255,255,0.25)]">
                {brandName}
              </h1>

              {/* Numeric Percentage Counter */}
              <div className="flex items-baseline justify-center my-4 font-mono">
                <span className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {progress < 10 ? `0${progress}` : progress}
                </span>
                <span className="text-2xl sm:text-3xl font-medium text-neutral-400 ml-1.5">
                  %
                </span>
              </div>

              {/* Progress Track with Glowing Pearl Silver Bar */}
              <div className="w-64 sm:w-80 h-1.5 bg-neutral-900/90 rounded-full overflow-hidden p-[1px] border border-neutral-700 shadow-inner my-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-neutral-400 via-white to-slate-200 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Live Status Phase Label */}
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-neutral-300 uppercase">
                <span className="text-white">&gt;</span>
                <span>{getPhaseText()}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const DoubleStairsPreloader = Skiper10;
export default Skiper10;
