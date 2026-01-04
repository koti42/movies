import { useState, useEffect } from 'react';
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { SkeletonGrid } from '../components/Skeleton';

const Movies = () => {
    const [activeTab, setActiveTab] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const tabs = [
        { id: 'popular', label: 'Popular', fetch: getPopularMovies },
        { id: 'top_rated', label: 'Top Rated', fetch: getTopRatedMovies },
        { id: 'now_playing', label: 'Now Playing', fetch: getNowPlayingMovies },
        { id: 'upcoming', label: 'Upcoming', fetch: getUpcomingMovies },
    ];

    useEffect(() => {
        fetchMovies(1);
    }, [activeTab]);

    const fetchMovies = async (pageNum) => {
        try {
            setLoading(true);
            setError(null);
            const tab = tabs.find(t => t.id === activeTab);
            const data = await tab.fetch(pageNum);
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setPage(pageNum);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setPage(1);
    };

    return (
        <div className="min-h-screen pt-24 px-4 md:px-12">
            <h1 className="text-4xl font-bold mb-8">Movies</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-netflix-red text-white shadow-lg'
                                : 'bg-netflix-gray text-gray-400 hover:text-white hover:bg-netflix-gray/80'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <SkeletonGrid count={20} />
            ) : error ? (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-netflix-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl text-gray-400">{error}</p>
                    <button onClick={() => fetchMovies(page)} className="btn-primary mt-4">
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} item={movie} mediaType="movie" />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mb-12">
                            <button
                                onClick={() => fetchMovies(page - 1)}
                                disabled={page === 1}
                                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2">
                                {page > 2 && (
                                    <>
                                        <button onClick={() => fetchMovies(1)} className="w-10 h-10 rounded-full bg-netflix-gray hover:bg-netflix-red transition-colors">
                                            1
                                        </button>
                                        {page > 3 && <span className="text-gray-500">...</span>}
                                    </>
                                )}

                                {page > 1 && (
                                    <button onClick={() => fetchMovies(page - 1)} className="w-10 h-10 rounded-full bg-netflix-gray hover:bg-netflix-red transition-colors">
                                        {page - 1}
                                    </button>
                                )}

                                <div className="w-10 h-10 rounded-full bg-netflix-red flex items-center justify-center font-bold">
                                    {page}
                                </div>

                                {page < totalPages && (
                                    <button onClick={() => fetchMovies(page + 1)} className="w-10 h-10 rounded-full bg-netflix-gray hover:bg-netflix-red transition-colors">
                                        {page + 1}
                                    </button>
                                )}

                                {page < totalPages - 1 && (
                                    <>
                                        {page < totalPages - 2 && <span className="text-gray-500">...</span>}
                                        <button onClick={() => fetchMovies(totalPages)} className="w-10 h-10 rounded-full bg-netflix-gray hover:bg-netflix-red transition-colors">
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => fetchMovies(page + 1)}
                                disabled={page === totalPages}
                                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Movies;
