// Built using Hyperiux Vault & Custom GSAP Alternating scrub architecture
"use client";

import React, {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

export type Month = keyof typeof monthOrder;

export type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  content: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
  items?: JourneyItem[];
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export const defaultMilestones: JourneyItem[] = [
  {
    id: "school",
    year: "2020",
    month: "March",
    content: "Secondary School Education — strong foundation in mathematics, science, and computing fundamentals.",
  },
  {
    id: "hsc",
    year: "2022",
    month: "May",
    content: "Higher Secondary Education (HSC) — focused coursework in Computer Science, Mathematics, and Physics.",
  },
  {
    id: "college",
    year: "2022",
    month: "October",
    content: "B.Tech in Artificial Intelligence & Data Science — deep dive into ML algorithms, deep learning, and data systems.",
  },
  {
    id: "mern",
    year: "2023",
    month: "August",
    content: "MERN Stack Engineering Internship — built interactive full-stack web applications, REST APIs, and MongoDB pipelines.",
  },
  {
    id: "agentic-ai",
    year: "2024",
    month: "July",
    content: "Agentic AI Internship — autonomous LLM multi-agent architectures, tool calling, and prompt engineering.",
  },
  {
    id: "pavakie",
    year: "2024",
    month: "November",
    content: "AI Internship at Pavakie — applied predictive analytics, ML modeling pipelines, and model evaluation.",
  },
];

export default function Timeline({
  title = "Journey Timeline",
  periodLabel = "2018 — Present",
  textColor = "var(--wf-text-primary, #ffffff)",
  mutedTextColor = "var(--wf-text-muted, #94a3b8)",
  activeColor = "#ffffff",
  backgroundColor = "var(--wf-bg-body, #05070a)",
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "Jayanth Engineering & AI workspace",
  items,
  topData,
  bottomData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Combine & sort all items chronologically
  const allJourneyItems: JourneyItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (topData || bottomData) {
      return [...(topData || []), ...(bottomData || [])].sort((a, b) => {
        const yearDiff = Number(a.year.slice(0, 4)) - Number(b.year.slice(0, 4));
        if (yearDiff !== 0) return yearDiff;
        return (monthOrder[a.month] || 0) - (monthOrder[b.month] || 0);
      });
    }
    return defaultMilestones;
  }, [items, topData, bottomData]);

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;
    const slider = wholeSliderRef.current;
    if (!section || !slider) return;

    const isMobile = window.innerWidth < 768;
    // Safe bounded horizontal slide percentages: ensures the track never scrolls into an empty void
    const slidePercent = isMobile ? -72 : -56;

    // Reset initial stem and dot states
    allJourneyItems.forEach((item, idx) => {
      const isTop = idx % 2 === 0;
      gsap.set(`.jl-${item.id}`, {
        scaleY: reducedMotion ? 1 : 0.2,
        transformOrigin: isTop ? "bottom bottom" : "top top",
      });
      gsap.set(`.jd-${item.id}`, {
        scale: reducedMotion ? 1 : 0.6,
      });
    });

    if (reducedMotion) {
      gsap.set(".journey-line", { width: "100%" });
      return;
    }

    // ScrollTrigger timeline scrub: native sticky track stays pinned for the height of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      defaults: {
        ease: "none",
      },
    });

    // Horizontal scrub from 0% to slidePercent
    tl.fromTo(
      slider,
      { xPercent: 0 },
      { xPercent: slidePercent },
      0
    );

    // Central horizontal axis line draws across
    tl.fromTo(
      ".journey-line",
      { width: "0%" },
      { width: "100%" },
      0
    );

    // Staggered activation of vertical stems & dots as each milestone approaches
    allJourneyItems.forEach((item, idx) => {
      const ratio = idx / Math.max(allJourneyItems.length - 1, 1);
      tl.to(
        `.jl-${item.id}`,
        {
          scaleY: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        ratio * 0.82
      ).to(
        `.jd-${item.id}`,
        {
          scale: 1.2,
          duration: 0.12,
          ease: "back.out(2)",
        },
        "<"
      );
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [allJourneyItems, reducedMotion], scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      className="h-[260vh] max-[768px]:h-[380vh] w-full relative transition-colors duration-300"
      style={sectionStyle}
    >
      {/* Native CSS Sticky Container: Centered at 50vh, locked while scrolling through the 260vh track */}
      <div className="h-screen w-full sticky top-0 flex flex-col justify-center items-start overflow-hidden">
        {/* Horizontal Sliding Track */}
        <div
          ref={wholeSliderRef}
          className="flex h-[72vh] max-h-[640px] min-h-[480px] items-center pl-8 md:pl-20 pr-48 gap-10 md:gap-16 flex-nowrap w-fit"
        >
          {/* Leading Visual Card */}
          <div className="h-[52vh] max-h-[460px] w-[280px] md:w-[340px] rounded-2xl overflow-hidden border border-white/15 relative flex-shrink-0 shadow-2xl group bg-[#0a0d14]">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">
                CHRONOLOGY
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1 leading-tight tracking-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 font-mono tracking-wider">
                {periodLabel}
              </p>
              <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-400">
                <span className="inline-block animate-pulse text-white">●</span>
                <span>Scroll to traverse &rarr;</span>
              </div>
            </div>
          </div>

          {/* Continuous Timeline Track */}
          <div className="relative h-full flex items-center flex-nowrap">
            {/* Center Axis Line running horizontally through all columns */}
            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center h-fit z-10 pointer-events-none">
              <div
                className="size-3 rounded-full ring-4 ring-white/15 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={activeStyle}
              ></div>
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                style={activeStyle}
              ></div>
              <div
                className="size-3 rounded-full ring-4 ring-white/15 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={activeStyle}
              ></div>
            </div>

            {/* Alternating Milestone Columns: Pure minimalist typography without boxed cards */}
            <div className="flex items-center gap-12 md:gap-16 flex-nowrap h-full">
              {allJourneyItems.map((item, idx) => {
                const isTop = idx % 2 === 0;
                const titlePart = item.content.includes("—")
                  ? item.content.split("—")[0].trim()
                  : item.content;
                const descPart = item.content.includes("—")
                  ? item.content.split("—")[1].trim()
                  : "";

                return (
                  <div
                    key={`milestone-${item.id}`}
                    className="relative h-full w-[300px] md:w-[360px] flex flex-col justify-between flex-shrink-0"
                  >
                    {isTop ? (
                      <>
                        {/* Top Milestone: Pure Typography */}
                        <div className="h-1/2 flex flex-col justify-end items-start pb-0">
                          <div className="w-full mb-3 pr-4 pl-0.5">
                            <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-wider">
                              <span className="text-white font-bold">{item.year}</span>
                              <span className="text-white/30 font-light">/</span>
                              <span className="text-slate-400 font-semibold uppercase">{item.month}</span>
                            </div>
                            <h4
                              className={`title-${item.id} text-lg md:text-xl font-bold text-white tracking-tight leading-snug mb-2`}
                            >
                              {titlePart}
                            </h4>
                            {descPart && (
                              <p
                                className={`description-${item.id} text-xs md:text-sm leading-relaxed text-slate-300 font-normal`}
                                style={mutedTextStyle}
                              >
                                {descPart}
                              </p>
                            )}
                          </div>

                          {/* Vertical Stem connecting DOWN to center axis line */}
                          <div className="w-full h-10 flex flex-col items-start relative pointer-events-none">
                            <div
                              className={`h-full w-[2px] origin-bottom jl-${item.id} shadow-[0_0_6px_rgba(255,255,255,0.7)]`}
                              style={activeStyle}
                            ></div>
                            <div
                              className={`size-3.5 rounded-full jd-${item.id} -mb-1.5 translate-x-[-5px] ring-4 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.9)] z-20`}
                              style={activeStyle}
                            ></div>
                          </div>
                        </div>

                        {/* Bottom half is empty space */}
                        <div className="h-1/2" />
                      </>
                    ) : (
                      <>
                        {/* Top half is empty space */}
                        <div className="h-1/2" />

                        {/* Bottom Milestone: Pure Typography */}
                        <div className="h-1/2 flex flex-col justify-start items-start pt-0">
                          {/* Vertical Stem connecting UP to center axis line */}
                          <div className="w-full h-10 flex flex-col items-start relative pointer-events-none">
                            <div
                              className={`size-3.5 rounded-full jd-${item.id} -mt-1.5 translate-x-[-5px] ring-4 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.9)] z-20`}
                              style={activeStyle}
                            ></div>
                            <div
                              className={`h-full w-[2px] origin-top jl-${item.id} shadow-[0_0_6px_rgba(255,255,255,0.7)]`}
                              style={activeStyle}
                            ></div>
                          </div>

                          <div className="w-full mt-3 pr-4 pl-0.5">
                            <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-wider">
                              <span className="text-white font-bold">{item.year}</span>
                              <span className="text-white/30 font-light">/</span>
                              <span className="text-slate-400 font-semibold uppercase">{item.month}</span>
                            </div>
                            <h4
                              className={`title-${item.id} text-base md:text-lg font-bold text-white tracking-tight leading-snug mb-2`}
                            >
                              {titlePart}
                            </h4>
                            {descPart && (
                              <p
                                className={`description-${item.id} text-xs md:text-sm leading-relaxed text-slate-300 font-normal`}
                                style={mutedTextStyle}
                              >
                                {descPart}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Timeline };
