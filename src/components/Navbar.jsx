import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLanguages, setShowLanguages] = useState(false);
    const navigate = useNavigate();
    const { getCurrentLanguage, changeLanguage, languages } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-netflix-red p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-netflix-red">MovieFlix</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-netflix-lightGray hover:text-white transition-colors duration-200 font-medium">
                        Home
                    </Link>
                    <Link to="/movies" className="text-netflix-lightGray hover:text-white transition-colors duration-200 font-medium">
                        Movies
                    </Link>
                    <Link to="/tv-shows" className="text-netflix-lightGray hover:text-white transition-colors duration-200 font-medium">
                        TV Shows
                    </Link>
                    <Link to="/popular" className="text-netflix-lightGray hover:text-white transition-colors duration-200 font-medium">
                        Popular
                    </Link>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4 relative">
                    {showSearch ? (
                        <div className="relative">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search movies, TV shows..."
                                    className="bg-netflix-gray/80 backdrop-blur-md text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-netflix-red w-48 md:w-64"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="bg-netflix-red px-4 py-2 rounded-r-lg hover:bg-netflix-red/90 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowSearch(false);
                                        setSearchQuery('');
                                    }}
                                    className="ml-2 text-netflix-lightGray hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </form>
                            {searchQuery.trim().length >= 2 && (
                                <SearchDropdown
                                    query={searchQuery}
                                    onClose={() => {
                                        setShowSearch(false);
                                        setSearchQuery('');
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowSearch(true)}
                            className="text-netflix-lightGray hover:text-white transition-colors"
                            aria-label="Search"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    )}

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLanguages(!showLanguages)}
                            className="flex items-center gap-2 text-netflix-lightGray hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-netflix-gray/50"
                            aria-label="Select Language"
                        >
                            <span className="text-xl">{getCurrentLanguage().flag}</span>
                            <span className="hidden md:inline text-sm font-medium">{getCurrentLanguage().name}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showLanguages && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowLanguages(false)}
                                />

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-netflix-gray/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50 animate-fade-in">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setShowLanguages(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-netflix-red/20 transition-colors ${getCurrentLanguage().code === lang.code ? 'bg-netflix-red/30 text-white' : 'text-netflix-lightGray'
                                                }`}
                                        >
                                            <span className="text-xl">{lang.flag}</span>
                                            <span className="font-medium">{lang.name}</span>
                                            {getCurrentLanguage().code === lang.code && (
                                                <svg className="w-5 h-5 ml-auto text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
