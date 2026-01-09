import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {HeroSection} from '@site/src/components/HeroSection';
import {ContentGrid} from '@site/src/components/ContentGrid';
import {VectorCard} from '@site/src/components/VectorCard';

import styles from './index.module.css';

/**
 * Latest 3 posts from the documentation
 * Sorted by date (most recent first)
 * Excluding draft posts
 */
const latestPosts = [
  {
    title: 'AS Path',
    description: 'Understand how AS Path attribute works in BGP, its role in loop prevention, and path selection algorithms.',
    to: '/docs/routing/bgp/as_path',
    date: 'December 17, 2024',
    readTime: '7 min',
    image: '/img/migrated/routing/bgp/as_path/featured.png',
    tags: [{label: 'BGP'}, {label: 'Path Attributes'}, {label: 'Routing'}],
  },
  {
    title: 'Local Preference',
    description: 'Understanding BGP Local Preference attribute for influencing outbound traffic selection in autonomous systems.',
    to: '/docs/routing/bgp/local_preference',
    date: 'December 12, 2024',
    readTime: '6 min',
    image: '/img/migrated/routing/bgp/local_preference/featured.png',
    tags: [{label: 'BGP'}, {label: 'Path Selection'}, {label: 'Routing'}],
  },
  {
    title: 'BGP Attributes',
    description: 'Deep dive into BGP attributes including AS_PATH, NEXT_HOP, LOCAL_PREF, MED, and how they affect route selection.',
    to: '/docs/routing/bgp/bgp-attributes',
    date: 'December 10, 2024',
    readTime: '10 min',
    image: '/img/migrated/routing/bgp/bgp-attributes/featured.png',
    tags: [{label: 'BGP'}, {label: 'Attributes'}, {label: 'Routing Policy'}],
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const journeyText = "My JNCIE-SP journey through note-taking. I'm a network engineer pushing toward certification, and this blog is my study companion—learning by writing and sharing knowledge to help others along the way.";

  const ctas = [
    {
      text: 'Explore Documentation',
      to: '/docs/intro',
      primary: true,
    },
    {
      text: 'Read Blog',
      to: '/blog',
      primary: false,
    },
  ];

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Modern documentation with a beautiful grid-based card layout">
      {/* Hero Section */}
      <HeroSection
        showIllustration={true}
        journeyText={journeyText}
        ctas={ctas}
        variant="default"
      />

      {/* Latest Posts Grid */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Latest Posts</h2>
          <ContentGrid columns={3}>
            {latestPosts.map((post) => (
              <VectorCard
                key={post.to}
                title={post.title}
                description={post.description}
                to={post.to}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
              />
            ))}
          </ContentGrid>
        </div>
      </main>
    </Layout>
  );
}
