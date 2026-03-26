'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import BlogNavbar from '../../../components/Blog/BlogNavbar';
import Footer from '../../../components/Footer/Footer';
import { blogPosts } from '../../../data/blogData';
import styles from '../../../components/Blog/Blog.module.css';

function renderContentBlock(block, index) {
  if (block.type === 'heading') {
    return <h2 key={index}>{block.text}</h2>;
  }

  if (block.type === 'quote') {
    return <blockquote key={index}>{block.text}</blockquote>;
  }

  return <p key={index}>{block.text}</p>;
}

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen">
        <BlogNavbar />
        <main className={styles.postLayout}>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className={styles.backButton}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BlogNavbar />
      <main className={styles.postLayout}>
        <Link href="/blog" className={styles.backButton}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className={styles.postHeader}>
          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {post.date}
            </span>
            <span className={styles.metaItem}>
              <User size={14} /> {post.author}
            </span>
          </div>
          <h1 className={styles.postTitle}>{post.title}</h1>
        </article>

        <img src={post.image.src} alt={post.title} className={styles.postHeroImage} />

        <div className={styles.postContent}>
          {post.content.map((block, index) => renderContentBlock(block, index))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
