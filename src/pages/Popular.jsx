import { useState, useEffect } from 'react';
import { getTrendingMovies, getTrendingTVShows } from '../services/api';
import MovieCard from '../components/MovieCard';
import { SkeletonGrid } from '../components/Skeleton';

const Popular = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'movie', label: 'Movies' },
        { id: 'tv', label: 'TV Shows' },
    ];

    useEffect(() => {
        fetchPopular();
    }, [activeTab]);

    const fetchPopular = async () => {
        try {
            setLoading(true);
            setError(null);

            if (activeTab === 'all') {
                const [movies, tvShows] = await Promise.all([
                    getTrendingMovies('week'),
                    getTrendingTVShows('week'),
                ]);
                const combined = [...movies.results, ...tvShows.results]
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 40);
                setItems(combined);
            } else if (activeTab === 'movie') {
                const data = await getTrendingMovies('week');
                setItems(data.results);
            } else {
                const data = await getTrendingTVShows('week');
                setItems(data.results);
            }
        } catch (err) {
            console.error('Error fetching popular content:', err);
            setError('Failed to load popular content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 md:px-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Popular This Week</h1>
                <p className="text-gray-400">Trending movies and TV shows</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id
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
                    <button onClick={fetchPopular} className="btn-primary mt-4">
                        Retry
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                    {items.map((item) => (
                        <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Popular;
