import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // takeEvery for getting movie details.
    yield takeEvery('GET_MOVIE_DEETS', getMovieDetails);
    yield takeEvery('GET_GENRES', fetchAllGenres);
    yield takeEvery('GET_MOVIE_GENRES', getMovieGenres);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
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
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`);
        yield put({type: 'SET_MOVIE_GENRES', payload: response.data});
    } catch (err) {
        console.log('Error in getting genres for this movie', err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie object to be desplayed on the details page.
const movieDetails = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVIE_DEETS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the genres of a specific movie.
const movieGenres = (state = [], action) => {
    switch(action.type) {
        case 'SET_MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        movieGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
