'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
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
        </div>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          Read More <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
