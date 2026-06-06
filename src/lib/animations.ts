export const revealFromFog = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const documentAppear = {
  hidden: { opacity: 0, scale: 0.95, rotate: -1 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const characterReveal = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

export const pageTransition = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    opacity: 0, filter: 'blur(10px)',
    transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] as const }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};
