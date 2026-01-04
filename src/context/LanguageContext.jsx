import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';


const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
];

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('preferredLanguage') || 'en-US';
    });

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    const changeLanguage = (languageCode) => {
        setLanguage(languageCode);
        window.location.reload();
    };

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === language) || languages[0]; // Default to English
    };

    const t = (key) => {
        return getTranslation(key, language);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, getCurrentLanguage, languages, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
