'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Clock3, ArrowRight } from 'lucide-react';
import styles from './Blog.module.css';

export default function BlogCard({ post, index }) {
  return (
    <motion.div
      className={styles.blogCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        <div className={styles.cardImageContainer}>
          <img src={post.image.src} alt={post.title} className={styles.cardImage} />
          <div className={styles.categoryBadge}>Article</div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {post.date}
            </span>
            <span className={styles.metaItem}>
              <User size={14} /> {post.author}
            </span>
            <span className={styles.metaItem}>
              <Clock3 size={14} /> 2min
            </span>
          </div>

          <h3 className={`${styles.cardTitle} ${styles.clampTwoLines}`}>{post.title}</h3>
          <p className={`${styles.cardExcerpt} ${styles.clampTwoLines}`}>{post.excerpt}</p>

          <div className={styles.readMore}>
            READ MORE <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
