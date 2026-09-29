/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MOTION ANIMATION UTILITIES
 * Organic, human-crafted physics presets for micro-interactions,
 * staggered card grids, smooth reveals, and spring taps.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

// Staggered Container for Lists and Grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04
    }
  }
};

// Subtle card entrance with gentle spring and upward float
export const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 260
    }
  }
};

// Section Fade-In
export const sectionFade = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface StaggerGridProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGrid({ children, className, ...props }: StaggerGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Live Status Indicator Dot (clean, minimal status indicator)
export function LivePulseDot({ color = 'emerald', className = '' }: { color?: 'emerald' | 'blue' | 'amber' | 'indigo'; className?: string }) {
  const colorMap = {
    emerald: 'bg-emerald-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-600',
    indigo: 'bg-indigo-600'
  };

  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      <span className={cn("inline-block rounded-full h-1.5 w-1.5", colorMap[color])} />
    </span>
  );
}
