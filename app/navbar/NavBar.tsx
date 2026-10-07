"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const links = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Background after the user scrolls away from the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently in view
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu when tapping outside the header
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close the mobile menu on Escape, for keyboard-only users
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (id: string) =>
    `py-2 text-[13px] font-bold uppercase tracking-wide transition-colors hover:text-[#d92525] md:py-0 ${
      active === id ? "text-[#d92525]" : "text-white"
    }`;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black"
      }`}
    >
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 md:px-10">
        <a
          href="#home"
          aria-label="Ashraf Dalal home"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d92525] text-sm font-extrabold text-[#d92525] transition-all duration-300 hover:scale-110 hover:bg-[#d92525] hover:text-white"
        >
          <span aria-hidden="true" className="absolute -inset-1.5 -z-10 animate-logo-glow rounded-full bg-[#d92525] blur-md" />
          AD
        </a>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-xl" />
        </button>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col bg-black px-6 pb-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-10 md:p-0`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active === link.href.slice(1) ? "true" : undefined}
              className={linkClass(link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
