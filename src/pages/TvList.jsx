import MediaList from "../components/MediaList";
import { fetchAllTv, fetchTvGenre } from "../services/tmdb";

export default function TvList() {
  return (
    <MediaList
      title="TV Shows"
      fetchGenre={fetchTvGenre}
      fetchItems={fetchAllTv}
      mediaType="tv"
    />
  );
}
