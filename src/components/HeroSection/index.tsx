/**
 * HeroSection Component
 * Hero section with title, subtitle, tabs, and CTA buttons
 */

import React, {useState} from 'react';
import styles from './styles.module.css';
import networkingDark from '@site/static/img/networking-dark.png';

/**
 * JNCIE-SP Journey Illustration
 */
const JourneyIllustration = () => (
  <img
    src={networkingDark}
    alt="Networking"
    className={styles.illustrationImage}
  />
);

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface CTAButton {
  text: string;
  to: string;
  primary?: boolean;
}

export interface HeroSectionProps {
  /**
   * Main title
   */
  title?: string;

  /**
   * Subtitle/description
   */
  subtitle?: string;

  /**
   * Tab items
   */
  tabs?: Tab[];

  /**
   * CTA buttons
   */
  ctas?: CTAButton[];

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Background variant
   */
  variant?: 'default' | 'gradient' | 'minimal';

  /**
   * Show journey illustration
   */
  showIllustration?: boolean;

  /**
   * Journey text/motto
   */
  journeyText?: string;
}

/**
 * HeroSection Component
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  tabs,
  ctas,
  className = '',
  variant = 'default',
  showIllustration = false,
  journeyText,
}) => {
  const [activeTab, setActiveTab] = useState(
    tabs && tabs.length > 0 ? tabs[0].id : null
  );

  const heroClasses = [
    styles.hero,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <section className={heroClasses}>
      {/* Grid pattern background */}
      <svg
        className={styles.gridPattern}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="200"
            height="200"
            x="100%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" stroke="currentColor" strokeWidth="1"></path>
          </pattern>
        </defs>
        <svg x="50%" y="-1" className={styles.gridSquares}>
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
            fill="currentColor"
          ></path>
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#grid-pattern)"
        ></rect>
      </svg>

      <div className={styles.container}>
        {/* Illustration */}
        {showIllustration && (
          <div className={styles.illustrationWrapper}>
            <JourneyIllustration />
          </div>
        )}

        {/* Title */}
        {title && <h1 className={styles.title}>{title}</h1>}

        {/* Subtitle */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* Journey Text */}
        {journeyText && <p className={styles.journeyText}>{journeyText}</p>}

        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.tabActive : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Active Tab Content */}
        {tabs && activeTab && (
          <div className={styles.tabContent}>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        )}

        {/* CTA Buttons */}
        {ctas && ctas.length > 0 && (
          <div className={styles.ctas}>
            {ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.to}
                className={`${styles.ctaButton} ${
                  cta.primary ? styles.ctaButtonPrimary : styles.ctaButtonSecondary
                }`}
              >
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
