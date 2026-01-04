import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getTVShowDetails, getImageUrl } from '../services/api';
import MovieRow from '../components/MovieRow';
import { SkeletonHero, SkeletonRow } from '../components/Skeleton';

const Detail = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = type === 'movie'
                    ? await getMovieDetails(id)
                    : await getTVShowDetails(id);
                setDetails(data);
            } catch (err) {
                console.error('Error fetching details:', err);
                setError('Failed to load details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
        window.scrollTo(0, 0);
    }, [type, id]);

    if (loading) {
        return (
            <>
                <SkeletonHero />
                <SkeletonRow />
            </>
        );
    }

    if (error || !details) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 text-netflix-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <Link to="/" className="btn-primary">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    const {
        title,
        name,
        overview,
        backdrop_path,
        poster_path,
        vote_average,
        vote_count,
        release_date,
        first_air_date,
        runtime,
        episode_run_time,
        genres,
        credits,
        videos,
        similar,
        recommendations,
        number_of_seasons,
        number_of_episodes,
    } = details;

    const displayTitle = title || name;
    const displayDate = release_date || first_air_date;
    const year = displayDate ? new Date(displayDate).getFullYear() : '';
    const trailer = videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const director = credits?.crew?.find(c => c.job === 'Director');
    const cast = credits?.cast?.slice(0, 10) || [];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[90vh] overflow-hidden">
                <img
                    src={getImageUrl(backdrop_path, 'original')}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/50 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-16 md:pb-32">
                    <div className="px-4 md:px-12 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">{displayTitle}</h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
                            {vote_average > 0 && (
                                <div className="flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-yellow-400 font-bold">{vote_average.toFixed(1)}</span>
                                    <span className="text-gray-300">({vote_count?.toLocaleString()} votes)</span>
                                </div>
                            )}
                            {year && <span className="text-gray-300">{year}</span>}
                            {runtime && <span className="text-gray-300">{runtime} min</span>}
                            {number_of_seasons && (
                                <span className="text-gray-300">
                                    {number_of_seasons} Season{number_of_seasons > 1 ? 's' : ''} • {number_of_episodes} Episodes
                                </span>
                            )}
                        </div>

                        {genres && genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="glass-effect px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-4 mb-4">
                            {trailer && (
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && trailer && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setShowVideo(false)}
                >
                    <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-12 right-0 text-white hover:text-netflix-red transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="px-4 md:px-12 -mt-8 md:-mt-32 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{overview}</p>
                        </div>

                        {director && (
                            <div className="pt-4 border-t border-gray-700">
                                <span className="text-gray-400">Director: </span>
                                <span className="text-white font-semibold">{director.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <img
                            src={getImageUrl(poster_path, 'w500')}
                            alt={displayTitle}
                            className="w-full rounded-lg shadow-2xl sticky top-24"
                        />
                    </div>
                </div>

                {/* Cast */}
                {cast.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Cast</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {cast.map((person) => (
                                <div key={person.id} className="text-center group cursor-pointer">
                                    <div className="aspect-square rounded-full overflow-hidden mb-2 bg-netflix-gray">
                                        {person.profile_path ? (
                                            <img
                                                src={getImageUrl(person.profile_path, 'w500')}
                                                alt={person.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <p className="font-semibold text-sm">{person.name}</p>
                                    <p className="text-gray-400 text-xs">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar */}
                {similar?.results?.length > 0 && (
                    <MovieRow title="Similar" items={similar.results} mediaType={type} />
                )}

                {/* Recommendations */}
                {recommendations?.results?.length > 0 && (
                    <MovieRow title="You May Also Like" items={recommendations.results} mediaType={type} />
                )}
            </div>
        </div>
    );
};

export default Detail;
