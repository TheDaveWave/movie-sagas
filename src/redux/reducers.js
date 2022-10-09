import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

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

// used to store the search movie object.
const search = (state = [], action) => {
    switch(action.type) {
        case 'SET_SEARCH':
            return action.payload;
        case 'CLEAR_SEARCH':
            return [];
        default:
            return state;
    }
}

// Used to store the movie object to be desplayed on the details page.
const movieDetails = (state = {}, action) => {
    // somehow get a reducer to store current movie id to use in requests?
    // or get setup a type clear and store data in reducer
    // console.log(state);
    switch(action.type) {
        case 'SET_MOVIE_DEETS':
            return {...state, ...action.payload};
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

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const store = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        movieGenres,
        search
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default store;