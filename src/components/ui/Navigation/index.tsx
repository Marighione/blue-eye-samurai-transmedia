'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { SITE_NAME, NAV_ITEMS, TOTAL_DOCUMENTS } from '@/lib/constants';
import { useUserState } from '@/context/UserStateContext';

const LIGHT_BG_ROUTES = ['/archivo'];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { state } = useUserState();
  const { scrollY } = useScroll();

  const isLightPage = LIGHT_BG_ROUTES.some((r) => pathname.startsWith(r));

  const navBackground = useTransform(
    scrollY,
    [0, 80],
    ['rgba(13, 27, 42, 0)', 'rgba(13, 27, 42, 0.95)']
  );

  const navBlur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(8px)']);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const visibleFragments = state.unlockedDocuments.length + 6;

  const useDarkText = isLightPage && !scrolled;

  const logoColor = useDarkText ? 'text-ink hover:text-blood' : 'text-snow hover:text-gold';
  const linkColor = useDarkText ? 'text-ink-faded hover:text-ink' : 'text-snow/80 hover:text-snow';
  const activeColor = useDarkText ? 'text-blood' : 'text-gold';
  const featuredClass = useDarkText
    ? 'text-blood border border-blood/40 px-3 py-1'
    : 'text-gold-bright border border-gold/30 px-3 py-1';
  const hamburgerColor = useDarkText ? 'bg-ink' : 'bg-snow';
  const fragmentColor = useDarkText ? 'text-ink-faded/70' : 'text-mist/60';

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBackground, backdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-display text-xl tracking-widest transition-colors duration-300 ${logoColor}`}
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const isFeatured = 'featured' in item && item.featured;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-ui text-sm font-medium transition-colors duration-300 relative group ${
                  isActive
                    ? activeColor
                    : isFeatured
                    ? featuredClass
                    : linkColor
                }`}
              >
                {item.label}
                {!isActive && !isFeatured && (
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                      useDarkText ? 'bg-blood' : 'bg-gold'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Progress indicator + hamburger */}
        <div className="flex items-center gap-4">
          {state.totalFragments > 0 && (
            <span className={`hidden md:block font-ui text-xs font-light ${fragmentColor}`}>
              {visibleFragments}/{TOTAL_DOCUMENTS} fragmentos
            </span>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-px ${hamburgerColor} block transition-colors duration-300`} />
            <span className={`w-6 h-px ${hamburgerColor} block transition-colors duration-300`} />
            <span className={`w-6 h-px ${hamburgerColor} block transition-colors duration-300`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-night/95 flex flex-col items-center justify-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <button
              className="absolute top-5 right-6 font-ui text-2xl text-snow/70 hover:text-snow"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              ×
            </button>

            <nav className="flex flex-col items-center gap-8">
              <Link
                href="/"
                className={`font-display text-2xl tracking-widest ${pathname === '/' ? 'text-gold' : 'text-snow'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className={`font-display text-2xl tracking-widest ${pathname === item.href ? 'text-gold' : 'text-snow'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
