import React, { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ReactPaginate from "react-paginate";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import { FetchMoviesResponse } from '../../services/movieService';
import './App.module.css'

const token = import.meta.env.VITE_TMDB_TOKEN;

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


const { data, isLoading, isError, isFetching } = useQuery<FetchMoviesResponse, Error>({
  queryKey: ['movies', query, page],
  queryFn: () => fetchMovies(query, page),
  enabled: !!query,
  staleTime: 5000,
  placeholderData: (previousData) => previousData,
});

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (selected: { selected: number }) => {
    setPage(selected.selected + 1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const isSuccess = !isLoading && !isError && data !== undefined;

React.useEffect(() => {
  if (isSuccess && data?.results.length === 0) {
    toast.error('No movies found for your request.');
  }
}, [isSuccess, data]);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <>
          {data && data.results.length > 0 && (
            <>
              <MovieGrid movies={data.results} onSelect={handleSelectMovie} />

              <ReactPaginate
                pageCount={data.total_pages > 500 ? 500 : data.total_pages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={page - 1}
              />
            </>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;