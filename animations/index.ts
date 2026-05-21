import { Variants } from "framer-motion";

// Subtle fade-in transition
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Elegant slide-up transition for lists or cards
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, // Ultra smooth custom ease
  },
};

// Staggered parent container to load elements sequentially
export const staggerContainer = (staggerChildren = 0.08): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
    },
  },
});

// Luxury hover variant for property cards
export const luxuryHover = {
  rest: { y: 0, scale: 1, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
  hover: {
    y: -8,
    scale: 1.01,
    boxShadow: "0 20px 25px -5px rgb(15 23 42 / 0.08), 0 8px 10px -6px rgb(15 23 42 / 0.08)", // Navy accented shadow
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Micro-animation for gold buttons or interactive badges
export const pulseGold: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
