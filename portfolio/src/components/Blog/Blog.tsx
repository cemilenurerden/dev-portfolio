import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Blog.css';

interface BlogPost {
    id: number;
    title: string;
    description: string;
    url: string;
    image: string;
    date: string;
    readTime: string;
    tags: string[];
}

// Medium yazılarınızı buraya ekleyin
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'Yapay Zeka Korkutucu mu? Benim İçin Cevabı Zamanla Netleşti',
        description: 'Yapay zekanın hayatımızdaki yeri ve geleceği hakkında düşüncelerim. Korku mu, fırsat mı?',
        url: 'https://medium.com/@cemileerden06/yapay-zeka-korkutucu-mu-benim-i%CC%87%C3%A7in-cevab%C4%B1-zamanla-netle%C5%9Fti-b87c44bed128',
        image: '/projects/robot.png',
        date: '2024-01-20',
        readTime: '5 min',
        tags: ['Yapay Zeka', 'Teknoloji'],
    },
    // Daha fazla yazı ekleyebilirsiniz
];

export const Blog: React.FC = () => {
    const { t } = useLanguage();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <section id="blog" className="section blog-section">
            <div className="container">
                <div className="blog-header">
                    <div>
                        <h2 className="section__title blog-main-title">{t('blog.title')}</h2>
                    </div>
                    <a
                        href="https://medium.com/@cemileerden06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blog-view-all"
                    >
                        {t('blog.viewAll')} <span>&rarr;</span>
                    </a>
                </div>

                {blogPosts.length === 0 ? (
                    <div className="blog-empty">
                        <p>{t('blog.empty')}</p>
                    </div>
                ) : (
                    <div className="blog-grid">
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="blog-card"
                                onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        window.open(post.url, '_blank', 'noopener,noreferrer');
                                    }
                                }}
                            >
                                <div className="blog-card__image-container">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="blog-card__image"
                                    />
                                    <div className="blog-card__tags">
                                        {post.tags.slice(0, 2).map((tag, index) => (
                                            <span key={index} className="blog-card__tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="blog-card__content">
                                    <div className="blog-card__meta">
                                        <span className="blog-card__date">{formatDate(post.date)}</span>
                                        <span className="blog-card__read-time">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                width="14"
                                                height="14"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="blog-card__title">{post.title}</h3>
                                    <p className="blog-card__description">{post.description}</p>
                                    <div className="blog-card__footer">
                                        <span className="blog-card__read-more">
                                            {t('blog.readMore')}
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                width="16"
                                                height="16"
                                            >
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
