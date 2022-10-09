import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // takeEvery for getting movie details.
    yield takeEvery('GET_MOVIE_DEETS', getMovieDetails);
    yield takeEvery('GET_GENRES', fetchAllGenres);
    yield takeEvery('GET_MOVIE_GENRES', getMovieGenres);
    yield takeEvery('ADD_MOVIE', postMovie);
    yield takeEvery('GIVE_MOVIE_GENRE', addGenreToMovie);
    yield takeEvery('REMOVE_MOVIE_GENRE', removeGenre);
    yield takeEvery('UPDATE_MOVIE', updateMovie);
    yield takeEvery('SEARCH_MOVIE', searchMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        // console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* fetchAllGenres() {
    // get all genres from the database.
    try {
        const response = yield axios.get('/api/genre');
        yield put({type: 'SET_GENRES', payload: response.data});
    } catch(err) {
        console.log('Error in get all genres', err);
    }
}

// Saga for getting movie details with id.
function* getMovieDetails(action) {
    try {
        // send get request to /api/movie/:movieId route.
        const response = yield axios.get(`/api/movie/${action.payload}`);
        yield put({type: 'SET_MOVIE_DEETS', payload: response.data});
    } catch(err) {
        console.log('Error getting movie deets', err);
    }
}

// Saga to get a specified movie's genres.
function* getMovieGenres(action) {
    // console.log(action);
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`);
        yield put({type: 'SET_MOVIE_GENRES', payload: response.data});
    } catch (err) {
        console.log('Error in getting genres for this movie', err);
    }
}

// Saga to POST a new movie to the database.
function* postMovie(action) {
    try {
        yield axios.post(`/api/movie`, action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch(err) {
        console.log('Error in postMovie', err);
    }
}

// Saga to add a genre to an existing movie.
function* addGenreToMovie(action) {
    try {
        yield axios.post(`/api/genre/add`, action.payload);
        // yield console.log(action.payload);
        // since the dispatch does not have the movieId??? Need a new reducer for getting genres again.
        yield put({type: 'GET_MOVIE_GENRES', payload: action.payload.movie_id}); 
        // yield put({type: 'GET_GENRES_FOR_MOVIE'});
    } catch(err) {
        console.log('Error adding new genre to movie', err);
    }
}

// Saga to delete a genre from a movie.
function* removeGenre(action) {
    try {
        // yield console.log(action.payload);
        // need to have data key in payload for delete request.
        yield axios.delete(`/api/genre/remove`, {data: action.payload});
        yield put({type: 'GET_MOVIE_GENRES', payload: action.payload.movie_id});
        // yield put({type: 'GET_GENRES_FOR_MOVIE'});
    } catch (err) {
        console.log('error in removing genre from movie', err);
    }
}

// saga to update movie details.
function* updateMovie(action) {
    try {
        yield axios.put(`/api/movie/${action.payload.movieId}`, action.payload);
        yield put({type: 'GET_MOVIE_DEETS', payload: action.payload.movieId});
    } catch (err) {
        console.log('Error in updating movie in saga', err);
        alert('Could not find movie.');
    }
}

// saga to get the movie fitting the search criteria.
function* searchMovie(action) {
    try {
        const response = yield axios.get(`/api/movie/search/${action.payload}`);
        yield put({type: 'SET_SEARCH', payload: response.data});
    } catch(err) {
        console.log('Error searching movie', err);
    }
}



export default rootSaga;