/**
 * VectorCard Component
 * A unified card component for docs, blog posts, and featured content
 * Design with date top-right, image with corner brackets, content below
 */

import React from 'react';
import Link from '@docusaurus/Link';
import type {VectorCardProps} from './types';
import styles from './styles.module.css';

/**
 * Generate a placeholder image with gradient or pattern
 */
const PlaceholderImage = ({type = 'gradient'}: {type?: 'gradient' | 'pattern'}) => {
  return (
    <div
      className={
        type === 'gradient'
          ? styles.imagePlaceholder
          : styles.imagePlaceholderPattern
      }
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{opacity: 0.5}}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    </div>
  );
};

/**
 * VectorCard Component - New Layout Design
 */
export const VectorCard: React.FC<VectorCardProps> = ({
  title,
  description,
  image,
  to,
  date,
  readTime,
  author,
  tags,
  className,
  placeholderType = 'gradient',
}) => {
  const cardClasses = [styles.card, className].filter(Boolean).join(' ');

  return (
    <Link to={to} className={cardClasses}>
      {/* Date Badge - Top Right */}
      {date && <div className={styles.dateBadge}>{date}</div>}

      {/* Image Section with Corner Brackets */}
      <div className={styles.imageWrapper}>
        {/* Four Corner Elements - One on each corner */}
        <span className={`${styles.cornerElem} ${styles.cornerTopLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerTopRight}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomRight}`}></span>

        {image ? (
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <PlaceholderImage type={placeholderType} />
        )}
      </div>

      {/* Content Section - Below Image */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Description */}
        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Metadata Row */}
        {(author || readTime) && (
          <div className={styles.metadata}>
            {/* Author */}
            {author && (
              <div className={styles.author}>
                {author.avatar && (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className={styles.authorAvatar}
                    loading="lazy"
                  />
                )}
                <span className={styles.authorName}>{author.name}</span>
              </div>
            )}

            {/* Read time */}
            {readTime && <span className={styles.metadataItem}>{readTime}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default VectorCard;
