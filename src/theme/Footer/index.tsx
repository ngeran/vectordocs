/**
 * Custom Footer Component
 * Minimal footer with just copyright text
 */

import React from 'react';
import styles from './styles.module.css';

export default function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright © 2026 VectorDocs @ ngeran[io]
      </p>
    </footer>
  );
}
