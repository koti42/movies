import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

const MovieCard = ({ item, mediaType = 'movie' }) => {
    const { id, title, name, poster_path, vote_average, release_date, first_air_date } = item;
    const displayTitle = title || name;
    const displayDate = release_date || first_air_date;
    const year = displayDate ? new Date(displayDate).getFullYear() : '';
    const type = item.media_type || mediaType;

    return (
        <Link
            to={`/${type}/${id}`}
            className="group relative block min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0 cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-netflix-gray">
                {poster_path ? (
                    <img
                        src={getImageUrl(poster_path, 'w500')}
                        alt={displayTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{displayTitle}</h3>
                    <div className="flex items-center justify-between text-xs">
                        {year && <span className="text-gray-300">{year}</span>}
                        {vote_average > 0 && (
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-yellow-400 font-semibold">{vote_average.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
