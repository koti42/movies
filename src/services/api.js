import axios from 'axios';

const API_KEY = 'ffa55576c83afa0a5c66ec5c1456a60e';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmE1NTU3NmM4M2FmYTBhNWM2NmVjNWMxNDU2YTYwZSIsIm5iZiI6MTc2NzU0Njg3MC44NTEsInN1YiI6IjY5NWE5ZmY2NWE2YTBkM2RhOGNiY2YyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jghopu_r2thMTebxnqwhphDExiwTwZPAOcxGgpSCUmE';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

// Image URLs
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const getImageUrl = (path, size = 'original') => {
    if (!path) return '/placeholder.jpg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Movies
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

// TV Shows
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

// Search
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

// Genres
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

// Person
export const getPersonDetails = async (personId) => {
    const response = await api.get(`/person/${personId}`, {
        params: {
            append_to_response: 'movie_credits,tv_credits',
        },
    });
    return response.data;
};

export default api;
