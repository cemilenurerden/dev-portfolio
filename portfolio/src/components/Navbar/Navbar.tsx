import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

/* ============================================
   Types & Interfaces
   ============================================ */

interface NavLink {
    id: string;
    label: string;
    href: string;
}

interface NavbarProps {
    logoText?: string;
    ctaText?: string;
    ctaHref?: string;
}

/* ============================================
   Constants
   ============================================ */

const NAV_LINKS: NavLink[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About Me', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

const SCROLL_THRESHOLD = 50;

/* ============================================
   Navbar Component
   ============================================ */

export function Navbar({
    logoText = 'Cemile.dev',
    ctaText = "Let's Talk",
    ctaHref = '#contact'
}: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

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
                    {NAV_LINKS.map(link => (
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

                {/* CTA Button */}
                <a href={ctaHref} className="navbar__cta">
                    <span>{ctaText}</span>
                    <span className="navbar__cta-arrow">→</span>
                </a>

                {/* Mobile Menu Toggle */}
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

            {/* Mobile Menu */}
            <nav
                className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
                aria-label="Mobile navigation"
            >
                {NAV_LINKS.map(link => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
                        onClick={() => handleLinkClick(link.id)}
                    >
                        {link.label}
                    </a>
                ))}
                <a href={ctaHref} className="navbar__cta" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>{ctaText}</span>
                    <span className="navbar__cta-arrow">→</span>
                </a>
            </nav>
        </header>
    );
}

export default Navbar;
