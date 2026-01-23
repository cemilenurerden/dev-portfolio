import { useLanguage } from '../../contexts/LanguageContext';
import './Hero.css';

/* ============================================
   Types & Interfaces
   ============================================ */

interface HeroProps {
    name?: string;
    resumeUrl?: string;
}

/* ============================================
   Hero Component
   ============================================ */

export function Hero({
    name = 'Cemile',
    resumeUrl = '/cv.pdf'
}: HeroProps) {
    const { t } = useLanguage();

    const profileImage = '/projects/pp.jpeg';

    return (
        <section id="home" className="hero">
            {/* Profile Image - Static */}
            <div className="hero__profile">
                <div className="hero__profile-ring">
                    <img
                        src={profileImage}
                        alt={`${name}'s profile`}
                        className="hero__profile-image"
                    />
                </div>
            </div>

            {/* Greeting */}
            <h1 className="hero__greeting">
                Hi, I'm {name}.
            </h1>

            {/* Description */}
            <p className="hero__description">
                {t('hero.title')}
            </p>

            {/* CTA Buttons */}
            <div className="hero__buttons">
                <a href="#links" className="hero__btn hero__btn--primary">
                    <span className="hero__btn-icon">🔗</span>
                    <span>{t('hero.contact')}</span>
                </a>
                <a
                    href={resumeUrl}
                    download="Cemile_Nur_Erden_CV.pdf"
                    className="hero__btn hero__btn--secondary"
                >
                    <span className="hero__btn-icon">↓</span>
                    <span>{t('hero.downloadCV')}</span>
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="hero__scroll-indicator">
                <span>⌄</span>
            </div>
        </section>
    );
}

export default Hero;
