'use client';
import React from 'react';
import BlogNavbar from '../../components/Blog/BlogNavbar';
import BlogFooter from '../../components/Blog/BlogFooter';
import BlogHeader from '../../components/Blog/BlogHeader';
import BlogCard from '../../components/Blog/BlogCard';
import { blogPosts } from '../../data/blogData';
import styles from '../../components/Blog/Blog.module.css';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <BlogNavbar />
      <main>
        <BlogHeader />
        <section className={styles.blogFeed}>
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}
