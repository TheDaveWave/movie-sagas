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
        if(search === '') {
            alert('Please enter a movie title.');
        } else {
            dispatch({
                type: 'SEARCH_MOVIE',
                payload: search
            });
        }
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
            <header className='list-header'>
                <div className='header-container'>
                    <div></div>
                    <div>
                        <h1>Movie List</h1>
                        <div className='search'>
                            <div>
                            <input type='text' value={search} onChange={evt => setSearch(evt.target.value)} placeholder='Search'/>
                            </div>
                        <button className='arrow-btn' onClick={() => searchMovie()}>➔</button>
                        <button onClick={() => clearSearch()}>Clear</button>
                        </div>
                    </div>
                    <div className='add-btn'>
                        <button onClick={() => history.push('/form')}>+</button>
                    </div>
                </div>
            </header>
            <div className='fake-main'>
            <section className="movies">
                <div>
                <div className='movie-container'>
                    {searchedMovie.length !== 0 ? 
                    <div className='movie-card'>
                        {/* <h3>{searchedMovie[0].title}</h3> */}
                        <img onClick={() => history.push(`/details/${searchedMovie[0].id}`)} src={searchedMovie[0].poster} alt={searchedMovie[0].title}/>
                    </div> : 
                    <>
                        {movies.map(movie => {
                            return (
                                <div className='movie-card' key={movie.id} >
                                    {/* <h3>{movie.title}</h3> */}
                                    {/* When image is clicked, push to the details page. */}
                                    <img onClick={() => history.push(`/details/${movie.id}`)} src={movie.poster} alt={movie.title}/>
                                </div>
                            );
                        })}
                    </>}
                </div>
                </div>
            </section>
            </div>
        </main>
    );
}

export default MovieList;