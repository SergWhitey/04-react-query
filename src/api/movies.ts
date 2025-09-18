import axios from "axios";

const API_KEY = "your_tmdb_api_key";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (query: string, page: number = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return response.data;
};
