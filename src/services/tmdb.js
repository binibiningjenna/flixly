const API_KEY = "";
const BASE_URL = "https://api.themoviedb.org/3";
const REDIRECT_URL = "http://localhost:5173";

const safeFetch = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return await response.json()
    } catch (error) {
        console.error("TMDB fetch error: ", error);
        return null;
    }
}

export const getRequestToken = async () => {
    const data = await safeFetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
    return data ?? {};
}

export const getLoginUrl = async (requestToken) => {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${REDIRECT_URL}`;
}

export const createSession = async (requestToken) => {
    try {
        const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ request_token: requestToken }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating session:", error);
        return null;
    }
};

export const fetchTrending = async (timeWindow = 'day') => {
    const data = await safeFetch(`${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`);
    return data?.results ?? [];
}

