import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.about': 'About Me',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',

        // Hero
        'hero.contact': 'Contact',
        'hero.downloadCV': 'Download CV',
        'hero.imageAlert': 'Please select an image file.',
        'hero.title': 'Full Stack & Mobile Developer building web and mobile applications end-to-end.',

        // Links
        'links.title': 'Contact & Social',
        'links.copied': 'Copied',

        // Projects
        'projects.title': 'Featured Projects',
        'projects.viewAll': 'View All',
        'projects.loading': 'Loading projects...',
        'projects.error': 'An error occurred while loading projects.',
        'projects.noDescription': 'No description available for this project.',
        'projects.viewCode': 'View Code',
        'projects.liveDemo': 'Live Demo',

        // Blog
        'blog.title': 'Blog Posts',
        'blog.viewAll': 'View All on Medium',
        'blog.readMore': 'Read More',
        'blog.empty': 'No blog posts yet. Check back soon!',


        // About
        'about.title': 'ABOUT',
        'about.titleHighlight': 'ME',
        'about.subtitle': 'Software Engineer & System Architect. Building scalable systems with minimalist precision.',
        'about.experience': 'EXPERIENCE',
        'about.education': 'EDUCATION',
        'about.bio': 'BIO',
        'about.bioText': "I am a passionate software engineering student focused on building scalable systems and clean, minimalist interfaces. I enjoy working in challenging environments and turning complex problems into elegant code. When I'm not coding, I explore new technology stacks. I develop AI-integrated web and mobile systems.",
        'about.skills': 'TECHNICAL SKILLS',
        'about.tools': 'TOOLS & TECH',
        'about.expTitle': 'Software Engineer Intern',
        'about.expCompany': 'Akgun Technology',
        'about.expPeriod': 'June 2025 - August 2025',
        'about.expHighlight1': 'Developed frontend features and integrated them with backend services via APIs.',
        'about.expHighlight2': 'Built user interfaces using Ionic component structures and managed data received from services.',
        'about.expHighlight3': 'Gained experience using GitHub (branching, commits, pull requests) and participated in team collaboration workflows.',
        'about.eduDegree': 'Software Engineering',
        'about.eduSchool': 'Kırklareli University',
        'about.eduPeriod': '2022 - 2026',

        // Contact
        'contact.title': "Let's build something.",
        'contact.subtitle': 'Got a project in mind or just want to talk code? My inbox is always open.',
        'contact.name': 'Name',
        'contact.namePlaceholder': 'Enter your name',
        'contact.email': 'Email',
        'contact.emailPlaceholder': 'Enter your email',
        'contact.message': 'Message',
        'contact.messagePlaceholder': 'Write your message here...',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Your message was sent successfully!',
        'contact.error': 'An error occurred.',
        'contact.connectionError': 'Could not connect to server. Please try again.',
    },
    tr: {
        // Navbar
        'nav.home': 'Ana Sayfa',
        'nav.about': 'Hakkımda',
        'nav.projects': 'Projeler',
        'nav.blog': 'Blog',
        'nav.contact': 'İletişim',

        // Hero
        'hero.contact': 'İletişim',
        'hero.downloadCV': 'CV İndir',
        'hero.imageAlert': 'Lütfen bir resim dosyası seçin.',
        'hero.title': 'Web ve mobil uygulamaları uçtan uca geliştiren Full Stack & Mobil Geliştirici.',

        // Links
        'links.title': 'İletişim & Sosyal Medya',
        'links.copied': 'Kopyalandı',

        // Projects
        'projects.title': 'Öne Çıkan Projeler',
        'projects.viewAll': 'Hepsini Gör',
        'projects.loading': 'Projeler yükleniyor...',
        'projects.error': 'Projeler yüklenirken bir hata oluştu.',
        'projects.noDescription': 'Bu proje için henüz bir açıklama girilmemiş.',
        'projects.viewCode': 'Kodu Görüntüle',
        'projects.liveDemo': 'Canlı Demo',

        // Blog
        'blog.title': 'Blog Yazıları',
        'blog.viewAll': "Medium'da Hepsini Gör",
        'blog.readMore': 'Devamını Oku',
        'blog.empty': 'Henüz blog yazısı yok. Yakında tekrar kontrol edin!',


        // About
        'about.title': 'HAKKIMDA',
        'about.titleHighlight': '',
        'about.subtitle': 'Yazılım Mühendisi & Sistem Mimarı. Minimalist hassasiyetle ölçeklenebilir sistemler geliştiriyorum.',
        'about.experience': 'DENEYİM',
        'about.education': 'EĞİTİM',
        'about.bio': 'BİYOGRAFİ',
        'about.bioText': 'Ölçeklenebilir sistemler ve temiz, minimalist arayüzler oluşturmaya odaklanan tutkulu bir yazılım mühendisliği öğrencisiyim. Zorlu ortamlarda çalışmayı ve karmaşık sorunları zarif kodlara dönüştürmeyi seviyorum. Kod yazmadığım zamanlarda yeni teknoloji yığınlarını keşfediyorum. Yapay zeka entegreli web ve mobil sistemler geliştiriyorum.',
        'about.skills': 'TEKNİK BECERİLER',
        'about.tools': 'ARAÇLAR & TEKNOLOJİLER',
        'about.expTitle': 'Yazılım Mühendisi Stajyeri',
        'about.expCompany': 'Akgun Teknoloji',
        'about.expPeriod': 'Haziran 2025 - Ağustos 2025',
        'about.expHighlight1': 'Frontend özellikleri geliştirdim ve bunları API aracılığıyla backend servisleri ile entegre ettim.',
        'about.expHighlight2': 'Ionic bileşen yapılarını kullanarak kullanıcı arayüzleri oluşturdum ve servislerden gelen verileri yönettim.',
        'about.expHighlight3': 'GitHub kullanarak deneyim kazandım (branching, commit, pull request) ve ekip işbirliği iş akışlarına katıldım.',
        'about.eduDegree': 'Yazılım Mühendisliği',
        'about.eduSchool': 'Kırklareli Üniversitesi',
        'about.eduPeriod': '2022 - 2026',

        // Contact
        'contact.title': 'Birlikte bir şeyler inşa edelim.',
        'contact.subtitle': 'Aklınızda bir proje mi var yoksa sadece kod hakkında konuşmak mı istiyorsunuz? Mesaj kutum her zaman açık.',
        'contact.name': 'İsim',
        'contact.namePlaceholder': 'İsminizi giriniz',
        'contact.email': 'E-posta',
        'contact.emailPlaceholder': 'E-posta adresinizi giriniz',
        'contact.message': 'Mesaj',
        'contact.messagePlaceholder': 'Mesajınızı buraya yazın...',
        'contact.send': 'Mesaj Gönder',
        'contact.sending': 'Gönderiliyor...',
        'contact.success': 'Mesajınız başarıyla gönderildi!',
        'contact.error': 'Bir hata oluştu.',
        'contact.connectionError': 'Sunucuya bağlanılamadı. Lütfen tekrar deneyin.',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        const value = translations[language][key as keyof typeof translations['en']];
        return value !== undefined ? value : key;
    };

    useEffect(() => {
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
