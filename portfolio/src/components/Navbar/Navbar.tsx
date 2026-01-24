import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navbar.css';

/* ============================================
   Types & Interfaces
   ============================================ */

interface NavbarProps {
    logoText?: string;
}

const SCROLL_THRESHOLD = 50;

/* ============================================
   Navbar Component
   ============================================ */

export function Navbar({
    logoText = 'Cemile.dev',
}: NavbarProps) {
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(true);

    const navLinks = [
        { id: 'home', label: t('nav.home'), href: '#home' },
        { id: 'about', label: t('nav.about'), href: '#about' },
        { id: 'projects', label: t('nav.projects'), href: '#projects' },
        { id: 'blog', label: t('nav.blog'), href: '#blog' },
        { id: 'contact', label: t('nav.contact'), href: '#contact' },
    ];

    // Handle scroll effect
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, []);

    // Handle link click
    const handleLinkClick = useCallback((linkId: string) => {
        setActiveLink(linkId);
        setIsMobileMenuOpen(false);
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Toggle dark mode
    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    }, []);

    // Toggle language
    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    }, [language, setLanguage]);

    // Scroll listener setup
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const isDark = savedTheme === 'dark';
            setIsDarkMode(isDark);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container">
                {/* Logo */}
                <a href="#home" className="navbar__logo" onClick={() => handleLinkClick('home')}>
                    <span className="navbar__logo-icon">C</span>
                    <span>{logoText}</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar__nav" aria-label="Main navigation">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
                            onClick={() => handleLinkClick(link.id)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Actions (Lang, Theme, Mobile Toggle) */}
                <div className="navbar__actions">
                    <button
                        className="navbar__lang-toggle"
                        onClick={toggleLanguage}
                        aria-label={language === 'en' ? 'Switch to Turkish' : 'Switch to English'}
                    >
                        {language === 'en' ? 'TR' : 'EN'}
                    </button>

                    <button
                        className="navbar__theme-toggle"
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>

                    <button
                        className={`navbar__toggle ${isMobileMenuOpen ? 'navbar__toggle--open' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="navbar__toggle-line" />
                        <span className="navbar__toggle-line" />
                        <span className="navbar__toggle-line" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav
                className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
                aria-label="Mobile navigation"
            >
                {navLinks.map(link => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
                        onClick={() => handleLinkClick(link.id)}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Navbar;
