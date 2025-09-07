import { fetchAllMovies, fetchMovieGenre, fetchAllTv, fetchTvGenre } from "../services/tmdb";
import MediaList from "../components/MediaList";

export function MoviesList() {
  return (
    <MediaList
      title="Movies"
      fetchGenre={fetchMovieGenre}
      fetchItems={fetchAllMovies}
      mediaType="movie"
    />
  );
}

export function TvList() {
  return (
    <MediaList
      title="TV Shows"
      fetchGenre={fetchTvGenre}
      fetchItems={fetchAllTv}
      mediaType="tv"
    />
  );
}