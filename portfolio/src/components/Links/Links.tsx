import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Links.css';

interface LinkCardProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    actionLabel: string;
    actionHref?: string;
    isCopy?: boolean;
    accentColor: string;
}

const LinkCard: React.FC<LinkCardProps & { copiedText: string }> = ({ icon, title, subtitle, actionLabel, actionHref, isCopy, accentColor, copiedText }) => {
    const [copied, setCopied] = useState(false);

    const handleAction = () => {
        if (isCopy) {
            navigator.clipboard.writeText(subtitle);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else if (actionHref) {
            window.open(actionHref, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="link-card" style={{ '--accent-color': accentColor } as React.CSSProperties}>
            <div className="link-card__icon-wrapper">
                {icon}
            </div>
            <h3 className="link-card__title">{title}</h3>
            <p className="link-card__subtitle">{subtitle}</p>
            <button
                className={`link-card__button ${copied ? 'link-card__button--copied' : ''}`}
                onClick={handleAction}
            >
                {isCopy ? (
                    <>
                        <span className="link-card__btn-icon">{copied ? '✅' : '📋'}</span>
                        {copied ? copiedText : actionLabel}
                    </>
                ) : (
                    <>
                        <span className="link-card__btn-icon">🔗</span>
                        {actionLabel}
                    </>
                )}
            </button>
        </div>
    );
};

export const Links: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="links" className="section links-section">
            <div className="container">
                <div className="links-header">
                    <h2 className="section__title links-main-title">{t('links.title')}</h2>
                </div>
                <div className="links-grid">
                    <LinkCard
                        id="gmail"
                        icon={(
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        )}
                        title="Gmail"
                        subtitle="cemileerden06@gmail.com"
                        actionLabel="Send Email"
                        actionHref="mailto:cemileerden06@gmail.com"
                        accentColor="#2dd4bf"
                        copiedText={t('links.copied')}
                    />
                    <LinkCard
                        id="linkedin"
                        icon={(
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                        )}
                        title="LinkedIn"
                        subtitle="cemile-nur-erden5"
                        actionLabel="Open Profile"
                        actionHref="https://www.linkedin.com/in/cemile-nur-erden5/"
                        accentColor="#0077b5"
                        copiedText={t('links.copied')}
                    />
                    <LinkCard
                        id="github"
                        icon={(
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                        )}
                        title="GitHub"
                        subtitle="@cemilenurerden"
                        actionLabel="Open Profile"
                        actionHref="https://github.com/cemilenurerden"
                        accentColor="#fafafa"
                        copiedText={t('links.copied')}
                    />
                    <LinkCard
                        id="medium"
                        icon={(
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M13.54 12a6.8 6.8 0 1 1-13.54 0 6.8 6.8 0 0 1 13.54 0zm5.91 0c0 3.53-1.52 6.4-3.4 6.4s-3.4-2.87-3.4-6.4 1.52-6.4 3.4-6.4 3.4 2.87 3.4 6.4zm3.66.1a.91.91 0 0 1-1.16.8c-.5-.12-.86-.45-.86-.8v-.2c0-.35.36-.68.86-.81a.92.92 0 0 1 1.16.8z" />
                            </svg>
                        )}
                        title="Medium"
                        subtitle="@cemileerden06"
                        actionLabel="Open Profile"
                        actionHref="https://medium.com/@cemileerden06"
                        accentColor="#ffc017"
                        copiedText={t('links.copied')}
                    />
                </div>
            </div>
        </section>
    );
};

export default Links;
