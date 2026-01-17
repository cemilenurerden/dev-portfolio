import { useState, useRef, type ChangeEvent } from 'react';
import './Hero.css';

/* ============================================
   Types & Interfaces
   ============================================ */

interface HeroProps {
    name?: string;
    title?: string;
    highlightedText?: string;
    description?: string;
    defaultProfileImage?: string;
    resumeUrl?: string;
}

/* ============================================
   Hero Component
   ============================================ */

export function Hero({
    name = 'Cemile',
    title = 'A Software Engineering Student building',
    highlightedText = 'scalable solutions',
    description = 'and pixel-perfect interfaces.',
    defaultProfileImage,
    resumeUrl = '/resume.pdf'
}: HeroProps) {

    const [profileImage, setProfileImage] = useState<string | undefined>(defaultProfileImage);
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
                alert('Lütfen bir resim dosyası seçin.');
                return;
            }

            // Create object URL for preview
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleDownloadResume = () => {
        window.open(resumeUrl, '_blank');
    };

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
                {title}{' '}
                <span className="hero__highlight">{highlightedText}</span>{' '}
                {description}
            </p>

            {/* CTA Buttons */}
            <div className="hero__buttons">
                <a href="#projects" className="hero__btn hero__btn--primary">
                    <span className="hero__btn-icon">👁️</span>
                    <span>View Projects</span>
                </a>
                <button
                    onClick={handleDownloadResume}
                    className="hero__btn hero__btn--secondary"
                >
                    <span className="hero__btn-icon">↓</span>
                    <span>Download Resume</span>
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="hero__scroll-indicator">
                <span>⌄</span>
            </div>
        </section>
    );
}

export default Hero;
