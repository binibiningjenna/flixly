const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const safeFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return await response.json()
    } catch (error) {
        console.error("TMDB fetch error: ", error);
        return null;
    }
}

export const fetchTrending = async (timeWindow = 'day') => {
    const data = await safeFetch(`${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`);
    return data?.results ?? [];
}

export const fetchMovieGenre = async () => {
    const data = await safeFetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return data?.genres ?? [];
}

export const fetchMoviesByGenre = async (movieGenreId) => {
    const data = await safeFetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${movieGenreId}`)
    return data?.results ?? [];
}

export const fetchTvGenre = async () => {
    const data = await safeFetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
    return data?.genres ?? [];
}

export const fetchTvByGenre = async (tvGenreId) => {
    const data = await safeFetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${tvGenreId}`)
    return data?.results ?? [];
}

export const fetchAllMovies = async (page, genreId) => {
    const data = await safeFetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreId}`);
    return {
        results: data?.results ?? [],
        totalPages: data?.total_pages ?? 1,
    };
};

export const fetchMediaVideos = async (id, mediaType) => {
    const data = await safeFetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`);
    return data?.results ?? [];
}

export const fetchAllTv = async (page, genreId) => {
    const data = await safeFetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&with_genres=${genreId}`);
    return {
        results: data?.results ?? [],
        totalPages: data?.total_pages ?? 1,
    };
};

export const searchMulti = async (query) => {
    const data = await safeFetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    return data?.results ?? [];
}

export const fetchMovieById = async (movieId) => {
    const data = await safeFetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return data ?? {};
}

export const fetchSimilarMovie = async (movieId) => {
    const data = await safeFetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
    return data?.results ?? [];
}

export const fetchTvById = async (tvId) => {
    const data = await safeFetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`);
    return data ?? {};
}

export const fetchTvSeason = async (tvId, seasonNumber) => {
    const data = await safeFetch(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`);
    return data ?? {};
}


