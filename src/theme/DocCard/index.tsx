/**
 * Custom DocCard Component with corner brackets on all four corners
 * Overrides default Docusaurus DocCard
 */

import React from 'react';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import {useDocById} from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/DocCard';
import type {
  PropSidebarItemLink,
  PropSidebarItemCategory,
} from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

function DocCardLink({item}: {item: PropSidebarItemLink}): React.JSX.Element {
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;
  const title = item.label;

  return (
    <Link
      className={styles.docCard}
      to={item.href}
      {...(isInternalUrl(item.href) && {
        activeClassName: styles.docCardActive,
      })}>
      {/* Image/placeholder wrapper with corners */}
      <div className={styles.imageWrapper}>
        {/* Four Corner Elements - One on each corner */}
        <span className={`${styles.cornerElem} ${styles.cornerTopLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerTopRight}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomRight}`}></span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && description.length > 0 && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </Link>
  );
}

function DocCardCategory({item}: {item: PropSidebarItemCategory}): React.JSX.Element {
  const title = item.label;
  const description = item.description ?? `${item.items.length} items`;

  return (
    <Link
      className={styles.docCard}
      to={item.href}>
      {/* Image/placeholder wrapper with corners */}
      <div className={styles.imageWrapper}>
        {/* Four Corner Elements - One on each corner */}
        <span className={`${styles.cornerElem} ${styles.cornerTopLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerTopRight}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomLeft}`}></span>
        <span className={`${styles.cornerElem} ${styles.cornerBottomRight}`}></span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.label}>Category</span>
        <h3 className={styles.title}>{title}</h3>
        {description && description.length > 0 && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </Link>
  );
}

export default function DocCard({item}: Props): React.JSX.Element {
  switch (item.type) {
    case 'link':
      return <DocCardLink item={item} />;
    case 'category':
      return <DocCardCategory item={item} />;
    default:
      throw new Error(`unknown item type: ${JSON.stringify(item)}`);
  }
}
