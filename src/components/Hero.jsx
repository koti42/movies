import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

const Hero = ({ items, mediaType = 'movie' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!items || items.length === 0) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
                setIsTransitioning(false);
            }, 500);
        }, 8000);

        return () => clearInterval(interval);
    }, [items]);

    if (!items || items.length === 0) {
        return (
            <div className="relative h-[50vh] md:h-[80vh] bg-netflix-gray animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
            </div>
        );
    }

    const current = items[currentIndex];
    const { id, title, name, overview, backdrop_path, vote_average } = current;
    const displayTitle = title || name;
    const type = current.media_type || mediaType;

    const goToSlide = (index) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div className="relative h-[50vh] md:h-[80vh] overflow-hidden">
            {/* Background Image */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <img
                    src={getImageUrl(backdrop_path, 'original')}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="px-4 md:px-12 max-w-2xl">
                    <h1
                        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {displayTitle}
                    </h1>

                    {vote_average > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1 bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-yellow-400 font-bold">{vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    )}

                    <p
                        className={`text-sm md:text-lg mb-6 line-clamp-3 text-shadow transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {overview}
                    </p>

                    <div className="flex gap-4">
                        <Link
                            to={`/${type}/${id}`}
                            className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Play
                        </Link>
                        <Link
                            to={`/${type}/${id}`}
                            className="btn-secondary flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
