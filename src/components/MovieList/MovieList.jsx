import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const searchedMovie = useSelector(store => store.search);
    const [search, setSearch] = useState('');

    // setup variable to use useHistory().
    const history = useHistory();

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // dispatch to search movie name.
    const searchMovie = () => {
        dispatch({
            type: 'SEARCH_MOVIE',
            payload: search
        });
    }

    const clearSearch = () => {
        dispatch({type: 'CLEAR_SEARCH'});
        // clear input.
        setSearch('');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={() => history.push('/form')}>Add a Movie</button>
            <div>
                <input type='text' value={search} onChange={evt => setSearch(evt.target.value)} placeholder='Search'/>
                <button onClick={() => searchMovie()}>Confirm</button>
                <button onClick={() => clearSearch()}>Clear</button>
            </div>
            <section className="movies">
                {searchedMovie.length !== 0 ? 
                <div>
                    <h3>{searchedMovie[0].title}</h3>
                    <img onClick={() => history.push(`/details/${searchedMovie[0].id}`)} src={searchedMovie[0].poster} alt={searchedMovie[0].title}/>
                </div> : 
                <>
                    {movies.map(movie => {
                        return (
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                {/* When image is clicked, push to the details page. */}
                                <img onClick={() => history.push(`/details/${movie.id}`)} src={movie.poster} alt={movie.title}/>
                            </div>
                        );
                    })}
                </>}
            </section>
        </main>
    );
}

export default MovieList;