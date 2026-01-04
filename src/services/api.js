import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const getLanguage = () => {
    return localStorage.getItem('preferredLanguage') || 'en-US';
};

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        language: getLanguage(),
    };
    return config;
});


export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const getImageUrl = (path, size = 'original') => {
    if (!path) return '/placeholder.jpg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrendingMovies = async (timeWindow = 'day') => {
    const response = await api.get(`/trending/movie/${timeWindow}`);
    return response.data;
};

export const getPopularMovies = async (page = 1) => {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
    const response = await api.get('/movie/top_rated', { params: { page } });
    return response.data;
};

export const getNowPlayingMovies = async (page = 1) => {
    const response = await api.get('/movie/now_playing', { params: { page } });
    return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
    const response = await api.get('/movie/upcoming', { params: { page } });
    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const response = await api.get(`/movie/${movieId}`, {
        params: {
            append_to_response: 'videos,credits,similar,recommendations',
        },
    });
    return response.data;
};

export const getTrendingTVShows = async (timeWindow = 'day') => {
    const response = await api.get(`/trending/tv/${timeWindow}`);
    return response.data;
};

export const getPopularTVShows = async (page = 1) => {
    const response = await api.get('/tv/popular', { params: { page } });
    return response.data;
};

export const getTopRatedTVShows = async (page = 1) => {
    const response = await api.get('/tv/top_rated', { params: { page } });
    return response.data;
};

export const getTVShowDetails = async (tvId) => {
    const response = await api.get(`/tv/${tvId}`, {
        params: {
            append_to_response: 'videos,credits,similar,recommendations',
        },
    });
    return response.data;
};

export const searchMulti = async (query, page = 1) => {
    const response = await api.get('/search/multi', {
        params: { query, page },
    });
    return response.data;
};

export const searchMovies = async (query, page = 1) => {
    const response = await api.get('/search/movie', {
        params: { query, page },
    });
    return response.data;
};

export const searchTVShows = async (query, page = 1) => {
    const response = await api.get('/search/tv', {
        params: { query, page },
    });
    return response.data;
};

export const getMovieGenres = async () => {
    const response = await api.get('/genre/movie/list');
    return response.data;
};

export const getTVGenres = async () => {
    const response = await api.get('/genre/tv/list');
    return response.data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    const response = await api.get('/discover/movie', {
        params: { with_genres: genreId, page },
    });
    return response.data;
};


export const getPersonDetails = async (personId) => {
    const response = await api.get(`/person/${personId}`, {
        params: {
            append_to_response: 'movie_credits,tv_credits',
        },
    });
    return response.data;
};

export default api;
