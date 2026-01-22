import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Contact.css';

export const Contact: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setStatusMessage(data.message || t('contact.success'));
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setStatusMessage(data.message || t('contact.error'));
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage(t('contact.connectionError'));
        }

        // Reset status after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setStatusMessage('');
        }, 5000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                {/* Heading */}
                <h2 className="contact-title">{t('contact.title')}</h2>
                <p className="contact-subtitle">
                    {t('contact.subtitle')}
                </p>

                {/* Status Message */}
                {statusMessage && (
                    <div className={`status-message status-${status}`}>
                        {statusMessage}
                    </div>
                )}

                {/* Form */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">{t('contact.name')}</label>
                        <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('contact.namePlaceholder')}
                                className="form-input"
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('contact.email')}</label>
                        <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('contact.emailPlaceholder')}
                                className="form-input"
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('contact.message')}</label>
                        <div className="form-input-wrapper form-textarea-wrapper">
                            <svg className="form-icon form-icon-textarea" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('contact.messagePlaceholder')}
                                className="form-textarea"
                                rows={5}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`contact-submit ${status === 'loading' ? 'loading' : ''}`}
                        disabled={status === 'loading'}
                    >
                        <span>{status === 'loading' ? t('contact.sending') : t('contact.send')}</span>
                        <span className="submit-arrow">→</span>
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
