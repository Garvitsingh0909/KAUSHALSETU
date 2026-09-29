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

// Live Status Pulse Dot (makes systems look active, connected, and human-monitored)
export function LivePulseDot({ color = 'emerald', className = '' }: { color?: 'emerald' | 'blue' | 'amber' | 'indigo'; className?: string }) {
  const colorMap = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    indigo: 'bg-indigo-500'
  };

  const pingMap = {
    emerald: 'bg-emerald-400',
    blue: 'bg-blue-400',
    amber: 'bg-amber-400',
    indigo: 'bg-indigo-400'
  };

  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 duration-1000", pingMap[color])} />
      <span className={cn("relative inline-flex rounded-full h-2 w-2", colorMap[color])} />
    </span>
  );
}
