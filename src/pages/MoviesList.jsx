import MediaList from "../components/MediaList";
import { fetchAllMovies, fetchMovieGenre } from "../services/tmdb";

export default function MoviesList() {
  return (
    <MediaList
      title="Movies"
      fetchGenre={fetchMovieGenre}
      fetchItems={fetchAllMovies}
      mediaType="movie"
    />
  );
}
