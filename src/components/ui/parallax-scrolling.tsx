'use client';

import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface ParallaxComponentProps {
  name?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  layer1Image?: string;
  layer2Image?: string;
  layer4Image?: string;
}

export function ParallaxComponent({
  name = 'JAYANTH',
  title = 'PORTFOLIO',
  subtitle,
  children,
  layer1Image = 'https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp',
  layer2Image = 'https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp',
  layer4Image = 'https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp',
}: ParallaxComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const layersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const layersContainer = layersContainerRef.current;
    if (!container || !header || !layersContainer) return;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        resetLayers();
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    // Cache layer elements once to prevent repeated DOM queries during scroll
    const layerDefinitions = [
      { selector: '[data-parallax-layer="1"]', yPercent: 70 },
      { selector: '[data-parallax-layer="2"]', yPercent: 55 },
      { selector: '[data-parallax-layer="3"]', yPercent: 40 },
      { selector: '[data-parallax-layer="4"]', yPercent: 10 },
    ];

    const cachedLayers: { elements: HTMLElement[]; yPercent: number }[] = layerDefinitions.map(
      (def) => ({
        elements: Array.from(layersContainer.querySelectorAll<HTMLElement>(def.selector)),
        yPercent: def.yPercent,
      })
    );

    const resetLayers = () => {
      for (let i = 0; i < cachedLayers.length; i++) {
        const { elements } = cachedLayers[i];
        for (let j = 0; j < elements.length; j++) {
          elements[j].style.transform = 'translate3d(0, 0, 0)';
        }
      }
    };

    // Cache layout dimensions to avoid forced reflows during scroll
    let headerHeight = header.offsetHeight || window.innerHeight;
    let headerTop = 0;

    const updateDimensions = () => {
      const rect = header.getBoundingClientRect();
      const scrollY = window.scrollY;
      headerTop = rect.top + scrollY;
      headerHeight = header.offsetHeight || window.innerHeight;
    };

    updateDimensions();

    // Resize listener with debounced / rAF measurement
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        updateDimensions();
        updateParallax(window.scrollY);
        resizeRafId = null;
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Viewport visibility check using IntersectionObserver to eliminate idle work
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].target === header) {
            isVisible = entries[i].isIntersecting;
            if (isVisible) {
              updateParallax(window.scrollY);
            }
          }
        }
      },
      { root: null, rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );
    observer.observe(header);

    // Optimized animation frame loop
    let latestScrollY = window.scrollY;
    let ticking = false;
    let animationFrameId: number | null = null;

    const updateParallax = (scrollY: number) => {
      if (prefersReducedMotion || !isVisible) {
        ticking = false;
        return;
      }

      // Calculate progress through header range [0.0 to 1.0]
      const relativeScroll = scrollY - headerTop;
      const progress = Math.min(Math.max(relativeScroll / headerHeight, 0), 1);

      // Apply GPU-friendly translate3d transforms directly to cached elements
      for (let i = 0; i < cachedLayers.length; i++) {
        const { elements, yPercent } = cachedLayers[i];
        const translateY = (progress * yPercent).toFixed(3);
        const transformValue = `translate3d(0, ${translateY}%, 0)`;

        for (let j = 0; j < elements.length; j++) {
          elements[j].style.transform = transformValue;
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;

      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          updateParallax(latestScrollY);
        });
        ticking = true;
      }
    };

    // Single passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial position sync
    updateParallax(window.scrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', onMotionChange);
      observer.disconnect();

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
    };
  }, []);

  return (
    <div className="parallax" ref={containerRef}>
      <section className="parallax__header" ref={headerRef}>
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers ref={layersContainerRef} className="parallax__layers">
            {/* Layer 1: Background Sky / Stars */}
            <img
              src={layer1Image}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="1"
              alt="Parallax Background Layer"
              className="parallax__layer-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80';
              }}
            />

            {/* Layer 2: Midground Ridge */}
            <img
              src={layer2Image}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="2"
              alt="Parallax Midground Layer"
              className="parallax__layer-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80';
              }}
            />

            {/* Layer 3: Title (JAYANTH then PORTFOLIO) */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <div className="parallax__title-stack">
                {name && <div className="parallax__title-name">{name}</div>}
                <h1 className="parallax__title">{title}</h1>
                {subtitle && (
                  <p className="parallax__title-subtitle">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Layer 4: Foreground Cliffs */}
            <img
              src={layer4Image}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="4"
              alt="Parallax Foreground Layer"
              className="parallax__layer-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      {/* Parallax Content Container */}
      <section className="parallax__content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <ChevronDown className="osmo-icon-svg animate-bounce" />
          <span
            style={{
              fontFamily: 'var(--wf-font-mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
            }}
          >
            Scroll to Explore
          </span>
        </div>

        {/* Embedded Children / Hero Details Slot */}
        {children && <div style={{ width: '100%', maxWidth: '1160px' }}>{children}</div>}
      </section>
    </div>
  );
}

export default ParallaxComponent;
