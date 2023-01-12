import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Articles from './components/Articles';
import LogIn from './components/LogIn';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
      <Routes>
      <Route path='/'/>
      <Route path='/articles' element={<Articles/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/signin' element={<LogIn/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
