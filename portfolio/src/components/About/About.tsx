import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './About.css';

export const About: React.FC = () => {
    const { t } = useLanguage();

    const experience = {
        title: t('about.expTitle'),
        company: t('about.expCompany'),
        period: t('about.expPeriod'),
        isCurrent: false,
        highlights: [
            t('about.expHighlight1'),
            t('about.expHighlight2'),
            t('about.expHighlight3')
        ]
    };

    const education = {
        degree: t('about.eduDegree'),
        school: t('about.eduSchool'),
        period: t('about.eduPeriod'),
        gpa: '3.24/4.00',
    };

    const skills = [
        { name: 'TypeScript', level: 80 },
        { name: 'JavaScript', level: 80 },
        { name: 'Java', level: 60 },
        { name: 'React & React Native', level: 70 }
    ];

    const tools = ['Docker', 'Kubernetes', 'AWS', 'React', 'Tailwind', 'Git', 'PostgreSQL', 'Linux'];

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                {/* Header */}
                <div className="about-header">
                    <h2 className="about-title">
                        {t('about.title')}{t('about.titleHighlight') && <> <span className="about-title-highlight">{t('about.titleHighlight')}</span></>}
                    </h2>
                    <p className="about-subtitle">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="about-content">
                    {/* Left Column - Experience & Education */}
                    <div className="about-left">
                        {/* Experience */}
                        <div className="about-section-block">
                            <div className="section-header">
                                <span className="section-icon">💼</span>
                                <h3 className="section-title">{t('about.experience')}</h3>
                            </div>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card">
                                        <div className="timeline-card-header">
                                            <h4 className="timeline-title">{experience.title}</h4>
                                            <span className={`timeline-period ${experience.isCurrent ? 'current' : ''}`}>
                                                {experience.period}
                                            </span>
                                        </div>
                                        <p className="timeline-company">{experience.company}</p>
                                        <ul className="timeline-highlights">
                                            {experience.highlights.map((highlight: string, i: number) => (
                                                <li key={i}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="about-section-block">
                            <div className="section-header">
                                <span className="section-icon">🎓</span>
                                <h3 className="section-title">{t('about.education')}</h3>
                            </div>
                            <div className="education-card">
                                <div className="education-header">
                                    <h4 className="education-degree">{education.degree}</h4>
                                    <span className="education-period">{education.period}</span>
                                </div>
                                <p className="education-school">{education.school}</p>
                                <p className="education-details">
                                    <span className="education-gpa">GPA: {education.gpa}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Bio, Skills, Tools */}
                    <div className="about-right">
                        {/* Bio */}
                        <div className="bio-card">
                            <div className="bio-header">
                                <span className="bio-dot"></span>
                                <h3 className="bio-title">{t('about.bio')}</h3>
                            </div>
                            <p className="bio-text">
                                {t('about.bioText')}
                            </p>

                        </div>

                        {/* Technical Skills */}
                        <div className="skills-card">
                            <h3 className="skills-title">{t('about.skills')}</h3>
                            <div className="skills-list">
                                {skills.map((skill, index) => (
                                    <div key={index} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percent">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tools & Tech */}
                        <div className="tools-card">
                            <h3 className="tools-title">{t('about.tools')}</h3>
                            <div className="tools-list">
                                {tools.map((tool, index) => (
                                    <span key={index} className="tool-tag">{tool}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
