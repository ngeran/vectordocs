/**
 * ContentGrid Component
 * Responsive grid container for cards
 */

import React from 'react';
import styles from './styles.module.css';

export interface ContentGridProps {
  /**
   * Grid content (cards)
   */
  children: React.ReactNode;

  /**
   * Number of columns on desktop (1-4)
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Maximum width of container
   * @default 'xl'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * ContentGrid Component
 * Provides a responsive grid layout that adapts to screen size
 *
 * Breakpoints:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1024px): 2 columns
 * - Desktop (1024px - 1440px): 3 columns (or specified columns)
 * - Wide (> 1440px): 4 columns (or specified columns + 1)
 */
export const ContentGrid: React.FC<ContentGridProps> = ({
  children,
  columns = 3,
  className = '',
  maxWidth = 'xl',
}) => {
  const gridClasses = [
    styles.grid,
    styles[`cols${columns}`],
    styles[`maxWidth${maxWidth.charAt(0).toUpperCase() + maxWidth.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={gridClasses}>{children}</div>;
};

export default ContentGrid;
