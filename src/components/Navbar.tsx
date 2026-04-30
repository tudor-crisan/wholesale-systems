"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Why Us", href: "#why-us" },
  { name: "Calculator", href: "#calculator" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <nav
        className={`
          flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-2xl 
          transition-all duration-500 pointer-events-auto border
          ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-slate-800 shadow-2xl shadow-emerald-500/10" : "bg-transparent border-transparent"}
        `}
      >
        <a href="#home" className="text-xl font-black tracking-tighter text-emerald-400">
          WS.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://calendly.com/t2060891/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-900/20"
          >
            Audit
          </a>
        </div>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-6 top-24 z-40 md:hidden bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold tracking-tight text-slate-200 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://calendly.com/t2060891/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-4 bg-emerald-600 text-white rounded-2xl text-center font-bold text-lg"
            >
              Book Systems Audit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
