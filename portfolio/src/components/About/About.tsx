import React from 'react';
import './About.css';

export const About: React.FC = () => {
    const experiences = [
        {
            title: 'Software Engineer Intern',
            company: 'Akgun Technology',
            period: 'June 2025 - August 2025',
            isCurrent: false,
            highlights: [
                'Developed frontend features and integrated them with backend services via APIs.',
                'Built user interfaces using Ionic component structures and managed data received from services.',
                'Gained experience using GitHub (branching, commits, pull requests) and participated in team collaboration workflows.'
            ]
        }
    ];

    const education = {
        degree: 'Software Engineering',
        school: 'Kırklareli University',
        period: '2022 - 2026',
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
                        ABOUT <span className="about-title-highlight">ME</span>
                    </h2>
                    <p className="about-subtitle">
                        Software Engineer & System Architect. Building scalable systems with minimalist precision.
                    </p>
                </div>

                <div className="about-content">
                    {/* Left Column - Experience & Education */}
                    <div className="about-left">
                        {/* Experience */}
                        <div className="about-section-block">
                            <div className="section-header">
                                <span className="section-icon">💼</span>
                                <h3 className="section-title">EXPERIENCE</h3>
                            </div>
                            <div className="timeline">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-card">
                                            <div className="timeline-card-header">
                                                <h4 className="timeline-title">{exp.title}</h4>
                                                <span className={`timeline-period ${exp.isCurrent ? 'current' : ''}`}>
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className="timeline-company">{exp.company}</p>
                                            <ul className="timeline-highlights">
                                                {exp.highlights.map((highlight, i) => (
                                                    <li key={i}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="about-section-block">
                            <div className="section-header">
                                <span className="section-icon">🎓</span>
                                <h3 className="section-title">EDUCATION</h3>
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
                                <h3 className="bio-title">BIO</h3>
                            </div>
                            <p className="bio-text">
                                I am a passionate software engineering student focused on building scalable systems and clean,
                                minimalist interfaces. I enjoy working in challenging environments and turning complex problems
                                into elegant code. When I’m not coding, I explore new technology stacks.
                                I develop AI-integrated web and mobile systems.
                            </p>

                        </div>

                        {/* Technical Skills */}
                        <div className="skills-card">
                            <h3 className="skills-title">TECHNICAL SKILLS</h3>
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
                            <h3 className="tools-title">TOOLS & TECH</h3>
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
