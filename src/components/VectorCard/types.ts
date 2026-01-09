/**
 * VectorCard Component Types
 */

export interface VectorCardAuthor {
  name: string;
  avatar?: string;
  url?: string;
}

export interface VectorCardTag {
  label: string;
  color?: string;
}

export interface VectorCardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Card description/excerpt
   */
  description?: string;

  /**
   * Featured image URL
   */
  image?: string;

  /**
   * Link when card is clicked
   */
  to: string;

  /**
   * Publication date (formatted string)
   */
  date?: string;

  /**
   * Reading time (e.g., "5 min")
   */
  readTime?: string;

  /**
   * Author information
   */
  author?: VectorCardAuthor;

  /**
   * Tags/badges to display
   */
  tags?: VectorCardTag[];

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Placeholder for images (gradients based on category)
   */
  placeholderType?: 'gradient' | 'pattern';
  placeholderColor?: string;
}
