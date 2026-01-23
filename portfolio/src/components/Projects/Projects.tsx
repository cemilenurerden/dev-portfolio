import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Projects.css';

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    stargazers_count: number;
    fork: boolean;
}

const getProjectImage = (name: string) => {
    const images: { [key: string]: string } = {
        'dev-portfolio': '/projects/dev-portfolio.png',
        'cityDiscovery': '/projects/city-discovery.jpeg',
        'NeGerekApp': '/projects/NeGerek.png',
        'MultiModel_Leaf_Disease_Classifier': '/projects/leaf-disease.png',
        'Protein-Structure-Prediction': '/projects/protein-structure.png',
        'STAJ22001': '/projects/staj1.png',
        'STAJ22002': '/projects/staj2.png',
    };
    return images[name] || '/projects/default.png';
};

export const Projects: React.FC = () => {
    const { t } = useLanguage();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetching from user cemilenurerden
                const response = await fetch('https://api.github.com/users/cemilenurerden/repos?sort=updated&per_page=10');
                if (!response.ok) {
                    throw new Error(t('projects.error'));
                }
                const data = await response.json();

                // Filter out forks and repositories without descriptions if desired
                const filteredRepos = data.filter((repo: Repository) =>
                    !repo.fork && repo.name !== 'ButtonControlPanel'
                );
                setRepos(filteredRepos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="section projects-section">
                <div className="container">
                    <h2 className="section__title">{t('projects.title')}</h2>
                    <div className="projects-loading">{t('projects.loading')}</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" className="section projects-section">
                <div className="container">
                    <h2 className="section__title">{t('projects.title')}</h2>
                    <div className="projects-error">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <div className="projects-header">
                    <div>
                        <h2 className="section__title projects-main-title">{t('projects.title')}</h2>
                    </div>
                    <a href="https://github.com/cemilenurerden" target="_blank" rel="noopener noreferrer" className="projects-view-all">
                        {t('projects.viewAll')} <span>&rarr;</span>
                    </a>
                </div>

                <div className="projects-grid">
                    {repos.map((repo) => (
                        <div
                            key={repo.id}
                            className="project-card"
                            onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    window.open(repo.html_url, '_blank', 'noopener,noreferrer');
                                }
                            }}
                        >
                            <div className="project-card__image-container">
                                <img
                                    src={getProjectImage(repo.name)}
                                    alt={repo.name}
                                    className="project-card__image"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/projects/default.png';
                                    }}
                                />
                                {repo.language && (
                                    <div className="project-card__tags">
                                        <span className="project-card__tag">{repo.language}</span>
                                    </div>
                                )}
                            </div>

                            <div className="project-card__content">
                                <div className="project-card__header">
                                    <h3 className="project-card__title">{repo.name.replace(/-/g, ' ')}</h3>
                                    <div className="project-card__links">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-card__link"
                                            title={t('projects.viewCode')}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </svg>
                                        </a>
                                        {repo.homepage && (
                                            <a
                                                href={repo.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-card__link"
                                                title={t('projects.liveDemo')}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="project-card__description">
                                    {repo.description || t('projects.noDescription')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
