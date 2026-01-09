/**
 * Custom BlogPostItem Component with corner brackets on all four corners
 * Overrides default Docusaurus BlogPostItem
 */

import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/BlogPostItem';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function BlogPostItem({children, className}: Props): React.JSX.Element {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    date,
    tags,
    title,
    description,
    permalink,
    frontMatter,
  } = metadata;

  // Format date
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formattedDate = date ? dateTimeFormat.format(new Date(date)) : '';

  // In list view, use our custom card layout
  if (!isBlogPostPage) {
    return (
      <Link to={permalink} className={clsx(styles.blogPostItem, className)}>
        {/* Image/placeholder wrapper with corners */}
        {frontMatter?.image && (
          <div className={styles.imageWrapper}>
            {/* Four Corner Elements - One on each corner */}
            <span className={`${styles.cornerElem} ${styles.cornerTopLeft}`}></span>
            <span className={`${styles.cornerElem} ${styles.cornerTopRight}`}></span>
            <span className={`${styles.cornerElem} ${styles.cornerBottomLeft}`}></span>
            <span className={`${styles.cornerElem} ${styles.cornerBottomRight}`}></span>

            <img
              src={frontMatter.image}
              alt={title}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>
            {title}
          </h3>

          {description && (
            <p className={styles.description}>
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className={styles.metadata}>
            {date && (
              <time dateTime={date} className={styles.date}>
                {formattedDate}
              </time>
            )}
            {tags && tags.length > 0 && (
              <span className={styles.tags}>
                {tags.slice(0, 2).map((tag) => (
                  <span key={tag.label} className={styles.tag}>
                    {tag.label}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // In blog post page, use default layout
  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
