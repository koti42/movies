import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMulti, getImageUrl } from '../services/api';

const SearchDropdown = ({ query, onClose }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const data = await searchMulti(query);
                setResults(data.results.slice(0, 5)); // Show top 5 results
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleResultClick = (item) => {
        const type = item.media_type === 'movie' ? 'movie' : 'tv';
        navigate(`/${type}/${item.id}`);
        onClose();
    };

    const handleViewAll = () => {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        onClose();
    };

    if (query.trim().length < 2) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-netflix-gray/95 backdrop-blur-lg rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50"
        >
            {loading ? (
                <div className="p-4 text-center text-gray-400">
                    <div className="animate-spin w-6 h-6 border-2 border-netflix-red border-t-transparent rounded-full mx-auto"></div>
                </div>
            ) : results.length > 0 ? (
                <>
                    <div className="max-h-96 overflow-y-auto">
                        {results.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleResultClick(item)}
                                className="flex items-center gap-3 p-3 hover:bg-netflix-red/20 cursor-pointer transition-colors border-b border-gray-700 last:border-0"
                            >
                                <div className="w-12 h-16 flex-shrink-0 bg-netflix-black rounded overflow-hidden">
                                    {item.poster_path ? (
                                        <img
                                            src={getImageUrl(item.poster_path, 'w200')}
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white truncate">
                                        {item.title || item.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span className="capitalize">{item.media_type}</span>
                                        {item.release_date && (
                                            <>
                                                <span>•</span>
                                                <span>{new Date(item.release_date).getFullYear()}</span>
                                            </>
                                        )}
                                        {item.first_air_date && (
                                            <>
                                                <span>•</span>
                                                <span>{new Date(item.first_air_date).getFullYear()}</span>
                                            </>
                                        )}
                                        {item.vote_average > 0 && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {item.vote_average.toFixed(1)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="w-full p-3 text-center text-netflix-red hover:bg-netflix-red/10 transition-colors font-semibold border-t border-gray-700"
                    >
                        View All Results →
                    </button>
                </>
            ) : (
                <div className="p-4 text-center text-gray-400">
                    No results found for "{query}"
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;
