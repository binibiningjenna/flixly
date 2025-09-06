import { useState } from 'react';
import { fetchMediaVideos } from '../services/tmdb';

export function useTrailer() {
    const [trailerKey, setTrailerKey] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const loadTrailer = async (id, mediaType) => {
        const videos = await fetchMediaVideos(id, mediaType);
        const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");

        if (trailer) {
            setShowModal(true);
            setTrailerKey(trailer.key);
        }
    };

    return { trailerKey, showModal, setShowModal, loadTrailer };
}