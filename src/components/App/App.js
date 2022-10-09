import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import MovieForm from '../MovieForm/MovieForm';
import EditMovie from '../EditMovie/EditMovie';

function App() {
  return (
    <div className="App">
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* <Route path='/details'>
          <Details />
        </Route> */}
        <Route path='/details/:movieId'>
          {/* Details page */}
          <Details />
        </Route>
        <Route path='/edit/:movieId'>
          <EditMovie />
        </Route>
        <Route path='/form'>
        {/* Add Movie page */}
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
