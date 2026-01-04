import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { SkeletonHero, SkeletonRow } from '../components/Skeleton';
import {
    getTrendingMovies,
    getPopularMovies,
    getTrendingTVShows,
    getTopRatedMovies,
    getNowPlayingMovies,
} from '../services/api';

const Home = () => {
    const [heroItems, setHeroItems] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [trending, popular, trendingTV, topRated, nowPlaying] = await Promise.all([
                    getTrendingMovies('day'),
                    getPopularMovies(),
                    getTrendingTVShows('day'),
                    getTopRatedMovies(),
                    getNowPlayingMovies(),
                ]);

                setHeroItems(trending.results.slice(0, 5));
                setTrendingMovies(trending.results);
                setPopularMovies(popular.results);
                setTrendingTVShows(trendingTV.results);
                setTopRatedMovies(topRated.results);
                setNowPlayingMovies(nowPlaying.results);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 text-netflix-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {loading ? (
                <>
                    <SkeletonHero />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                </>
            ) : (
                <>
                    <Hero items={heroItems} mediaType="movie" />

                    <div className="relative -mt-32 z-10">
                        <MovieRow title="Trending Now" items={trendingMovies} mediaType="movie" />
                        <MovieRow title="Popular Movies" items={popularMovies} mediaType="movie" />
                        <MovieRow title="Now Playing" items={nowPlayingMovies} mediaType="movie" />
                        <MovieRow title="Top Rated Movies" items={topRatedMovies} mediaType="movie" />
                        <MovieRow title="Trending TV Shows" items={trendingTVShows} mediaType="tv" />
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
