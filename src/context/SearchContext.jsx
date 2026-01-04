import { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
};

export const SearchProvider = ({ children }) => {
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const addSearch = (query) => {
        if (!query.trim()) return;

        const updated = [
            query,
            ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())
        ].slice(0, 10); // Keep only 10 recent searches

        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const removeSearch = (query) => {
        const updated = recentSearches.filter(s => s !== query);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    return (
        <SearchContext.Provider value={{ recentSearches, addSearch, clearSearches, removeSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
