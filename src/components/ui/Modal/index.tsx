'use client';

import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'document' | 'full';
}

export function Modal({ isOpen, onClose, children, size = 'document' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const maxW = size === 'full' ? 'max-w-[90vw]' : 'max-w-2xl';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-night/90" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full ${maxW} max-h-[85vh] overflow-y-auto`}
            style={{
              backgroundColor: '#F5F0E8',
              backgroundImage: `
                radial-gradient(ellipse at 20% 50%, rgba(180,140,100,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(140,100,60,0.1) 0%, transparent 50%)
              `,
            }}
          >
            {/* Botón de cierre */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-5 font-ui text-2xl text-ink-faded/60 hover:text-ink transition-colors duration-200 leading-none z-10"
            >
              ×
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
