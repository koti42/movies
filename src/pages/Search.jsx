import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMulti } from '../services/api';
import { useSearch } from '../context/SearchContext';
import MovieCard from '../components/MovieCard';
import { SkeletonGrid } from '../components/Skeleton';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { recentSearches, addSearch, removeSearch, clearSearches } = useSearch();

    useEffect(() => {
        if (query) {
            performSearch(query, 1);
            addSearch(query);
        }
    }, [query]);

    const performSearch = async (searchQuery, pageNum) => {
        try {
            setLoading(true);
            setError(null);
            const data = await searchMulti(searchQuery, pageNum);
            setResults(data.results.filter(item => item.media_type !== 'person'));
            setTotalPages(data.total_pages);
            setPage(pageNum);
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to search. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRecentSearch = (searchQuery) => {
        setSearchParams({ q: searchQuery });
    };

    return (
        <div className="min-h-screen pt-24 px-4 md:px-12">
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Recent Searches</h2>
                        <button
                            onClick={clearSearches}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {recentSearches.map((search, index) => (
                            <div
                                key={index}
                                className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 group"
                            >
                                <button
                                    onClick={() => handleRecentSearch(search)}
                                    className="text-netflix-lightGray hover:text-white transition-colors"
                                >
                                    {search}
                                </button>
                                <button
                                    onClick={() => removeSearch(search)}
                                    className="text-gray-500 hover:text-netflix-red transition-colors"
                                    aria-label="Remove"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {query && (
                <>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
                        {!loading && results.length > 0 && (
                            <p className="text-gray-400">Found {results.length} results</p>
                        )}
                    </div>

                    {loading ? (
                        <SkeletonGrid count={20} />
                    ) : error ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-netflix-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl text-gray-400">{error}</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl text-gray-400">No results found for "{query}"</p>
                            <p className="text-gray-500 mt-2">Try different keywords</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                                {results.map((item) => (
                                    <MovieCard key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mb-12">
                                    <button
                                        onClick={() => performSearch(query, page - 1)}
                                        disabled={page === 1}
                                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="flex items-center px-4 text-gray-400">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => performSearch(query, page + 1)}
                                        disabled={page === totalPages}
                                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {/* Empty State */}
            {!query && recentSearches.length === 0 && (
                <div className="text-center py-24">
                    <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">Search for Movies & TV Shows</h2>
                    <p className="text-gray-400">Use the search bar above to find your favorite content</p>
                </div>
            )}
        </div>
    );
};

export default Search;
