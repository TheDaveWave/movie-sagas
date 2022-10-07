import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path='/details'>
          {/* Details page */}
        </Route>
        <Route path='/form'>
        {/* Add Movie page */}
        </Route>
      </Router>
    </div>
  );
}


export default App;
