import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ThemeToggle } from "../common/ThemeToggle";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export interface NavItem {
  label: string;
  href: string;
  index?: string;
  shape?: string;
}

export interface KineticNavigationProps {
  items?: NavItem[];
  showOnlyAfterHero?: boolean;
  brandText?: string;
  brandHref?: string;
  onLinkClick?: (href: string) => void;
}

export function Component({
  items,
  showOnlyAfterHero = false,
  brandText = "JAYANTH E",
  brandHref = "#about",
  onLinkClick,
}: KineticNavigationProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(!showOnlyAfterHero);

  // Monitor scroll to reveal button only after hero parallax effect if requested
  useEffect(() => {
    if (!showOnlyAfterHero) {
      setIsScrolledPastHero(true);
      return;
    }

    let ticking = false;

    const checkHeroThreshold = () => {
      const headerEl = document.querySelector(".parallax__header") as HTMLElement | null;
      const threshold = headerEl ? headerEl.offsetHeight * 0.8 : window.innerHeight * 0.8;
      const pastHero = window.scrollY >= threshold;

      setIsScrolledPastHero((prev) => (prev !== pastHero ? pastHero : prev));
      ticking = false;
    };

    checkHeroThreshold();

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkHeroThreshold);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showOnlyAfterHero]);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing safely
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // 1. Arrow Animation (Safe check if arrowLine exists)
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      // 2. Shape Hover
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  const isInitialMount = useRef(true);

  // Initial setup: set closed state cleanly without premature animation
  useEffect(() => {
    if (!containerRef.current) return;
    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
    const menu = containerRef.current.querySelector(".menu-content");
    const overlay = containerRef.current.querySelector(".overlay");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");

    gsap.set(navWrap, { display: "none" });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(menu, { xPercent: 110 });
    gsap.set(bgPanels, { xPercent: 105 });
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" });

        // Overlay fade in
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, "<");

        // Menu drawer enters from right
        tl.fromTo(menu, { xPercent: 110 }, { xPercent: 0, duration: 0.6, ease: "power3.out" }, "<");

        // Staggered backdrop panels
        tl.fromTo(
          bgPanels,
          { xPercent: 105 },
          { xPercent: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" },
          "<"
        );

        // Animate Button Text Swapping if elements exist
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.15 }, "<");
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
        }

        // Staggered menu links reveal
        tl.fromTo(
          menuLinks,
          { yPercent: 100, opacity: 0, rotate: 6 },
          { yPercent: 0, opacity: 1, rotate: 0, stagger: 0.04, duration: 0.45, ease: "power2.out" },
          "<+=0.2"
        );

        if (fadeTargets && fadeTargets.length > 0) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
            "<+=0.2"
          );
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        // Links exit
        tl.to(menuLinks, { yPercent: 40, opacity: 0, duration: 0.25 });

        // Panels slide out
        tl.to(bgPanels, { xPercent: 105, stagger: 0.06, duration: 0.4, ease: "power3.in" }, "<");

        // Menu slides out
        tl.to(menu, { xPercent: 110, duration: 0.45, ease: "power3.in" }, "<");

        // Overlay fades out
        tl.to(overlay, { autoAlpha: 0, duration: 0.3 }, "<");

        // Animate Button Text and Icon Back
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, "<");
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0 }, "<");
        }

        tl.set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLinkClick = (href: string) => {
    closeMenu();
    if (onLinkClick) {
      onLinkClick(href);
    }
  };

  // Default menu links if none provided
  const defaultItems: NavItem[] = [
    { label: "About us", href: "#about", index: "01", shape: "1" },
    { label: "Our work", href: "#projects", index: "02", shape: "2" },
    { label: "Services", href: "#experience", index: "03", shape: "3" },
    { label: "Blog", href: "#skills", index: "04", shape: "4" },
    { label: "Contact us", href: "#contact", index: "05", shape: "5" },
  ];

  const menuItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div ref={containerRef}>
      <div className={`site-header-wrapper ${!isScrolledPastHero ? "header--hidden" : ""}`}>
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <a
                href={brandHref}
                aria-label="home"
                className="nav-logo-row w-inline-block"
                onClick={() => handleLinkClick(brandHref)}
              >
                <span style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "0.1rem 0.4rem", borderRadius: "4px", fontSize: "0.8rem" }}>
                  [JE]
                </span>
                <span>{brandText}</span>
              </a>

              <div className="nav-row__right">
                {/* Theme Mode Toggle Button */}
                <ThemeToggle variant="navbar" />

                {/* Clean Menu Indicator (Arrow Removed) */}
                <div
                  className="nav-toggle-label"
                  onClick={toggleMenu}
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                >
                  <span className="toggle-text">click me</span>
                </div>

                {/* Restored Menu Button */}
                <button
                  type="button"
                  role="button"
                  className="nav-close-btn"
                  onClick={toggleMenu}
                  style={{ pointerEvents: "auto" }}
                  aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                  aria-expanded={isMenuOpen}
                >
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content" aria-label="Kinetic Navigation Menu">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              {/* Abstract shapes container - Pearl Silver Sheens */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(255,255,255,0.16)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(226,232,240,0.14)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(203,213,225,0.12)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(255,255,255,0.18)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(226,232,240,0.18)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(255,255,255,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(226,232,240,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(203,213,225,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(255,255,255,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(226,232,240,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(203,213,225,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(226,232,240,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(255,255,255,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(203,213,225,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(226,232,240,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(255,255,255,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(226,232,240,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(203,213,225,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(255,255,255,0.14)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(226,232,240,0.12)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(255,255,255,0.18)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(226,232,240,0.15)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(203,213,225,0.12)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {menuItems.map((item, idx) => {
                  const shapeNumber = item.shape || String((idx % 5) + 1);
                  return (
                    <li key={item.label} className="menu-list-item" data-shape={shapeNumber}>
                      <a
                        href={item.href}
                        className="nav-link w-inline-block"
                        onClick={() => handleLinkClick(item.href)}
                      >
                        <p className="nav-link-text" data-menu-fade>
                          {item.label}
                        </p>
                        {item.index && <span className="nav-link-index">// {item.index}</span>}
                        <div className="nav-link-hover-bg"></div>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="menu-footer">
                <div className="menu-footer-actions">
                  <a
                    href="#contact"
                    className="wf-button wf-button-primary wf-button-sm"
                    onClick={() => handleLinkClick("#contact")}
                    style={{ textDecoration: "none" }}
                  >
                    [Get in Touch &rarr;]
                  </a>
                  <a
                    href="https://github.com/jayanth-e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wf-button wf-button-outline wf-button-sm"
                    style={{ textDecoration: "none" }}
                  >
                    [GitHub]
                  </a>
                  <a
                    href="https://linkedin.com/in/jayanth-e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wf-button wf-button-outline wf-button-sm"
                    style={{ textDecoration: "none" }}
                  >
                    [LinkedIn]
                  </a>
                </div>
                {/* Theme Mode Selector Inside Drawer */}
                <ThemeToggle variant="drawer" />
                <div className="menu-footer-tagline">
                  Jayanth E &bull; AI & Data Science Portfolio
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export const SterlingGateKineticNavigation = Component;
export default Component;
