import { useState, useRef, type ChangeEvent } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Hero.css';

/* ============================================
   Types & Interfaces
   ============================================ */

interface HeroProps {
    name?: string;
    defaultProfileImage?: string;
    resumeUrl?: string;
}

/* ============================================
   Hero Component
   ============================================ */

export function Hero({
    name = 'Cemile',
    defaultProfileImage,
    resumeUrl = '/cv.pdf'
}: HeroProps) {
    const { t } = useLanguage();

    const [profileImage, setProfileImage] = useState<string | undefined>(() => {
        // Try to load image from localStorage on initial state
        return localStorage.getItem('profileImage') || defaultProfileImage;
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle profile image click - trigger file input
    const handleProfileClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file selection
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert(t('hero.imageAlert'));
                return;
            }

            // Convert to Base64 to save in localStorage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImage(base64String);
                localStorage.setItem('profileImage', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonksiyonu siliyoruz çünkü artık direkt link kullanacağız.

    return (
        <section id="home" className="hero">
            {/* Profile Image - Clickable */}
            <div className="hero__profile">
                <button
                    type="button"
                    className="hero__profile-button"
                    onClick={handleProfileClick}
                    aria-label="Profil fotoğrafı seç"
                >
                    <div className="hero__profile-ring">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt={`${name}'s profile`}
                                className="hero__profile-image"
                            />
                        ) : (
                            <div className="hero__profile-image hero__profile-placeholder">
                                <span className="hero__profile-initial">{name.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                </button>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hero__profile-input"
                    aria-hidden="true"
                />

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
