import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WelcomeModal = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisitedMemoFlix');
        if (!hasVisited) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('hasVisitedMemoFlix', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-gradient-to-br from-netflix-gray to-netflix-black border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-netflix-red via-red-600 to-netflix-red"></div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="bg-netflix-red/20 p-4 rounded-full">
                            <svg className="w-12 h-12 text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white mb-3">
                        {t('welcomeTitle')}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        {t('welcomeDescription')}
                    </p>

                    {/* Developer credit */}
                    <div className="mb-6 p-4 bg-netflix-black/50 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Developed by</p>
                        <p className="text-lg font-semibold text-white">Mehmet Küçükçelebi</p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-300">Live Search</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-300">HD Trailers</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-300">Detailed Info</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-300">Recommendations</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleClose}
                        className="w-full bg-netflix-red hover:bg-netflix-red/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        {t('startExploring')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
