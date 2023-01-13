import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Articles from './components/Articles';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { useState } from 'react';


function App() {
  const [showLogIn,setShowLogIn] = useState(false);
  const [showSignUp,setShowSignUp] = useState(false);
  const [userId,setUserId] = useState("");

  return (
    <div>
      <Router>
        <Navbar setShowLogIn={setShowLogIn} userId={userId} setUserId={setUserId}/>
        <Routes>
          <Route path="/articles" element={<Articles userId={userId}/>} />
          <Route path="/recipes" element={<Recipes userId={userId}/>} />
          {/* <Route path="/signin" element={<LogIn />} /> */}
        </Routes>
      </Router>
      {showLogIn && (
        <LogIn
          setShowLogIn={setShowLogIn}
          setShowSignUp={setShowSignUp}
          setUserId={setUserId}
        ></LogIn>
      )}
      {showSignUp && (
        <SignUp
          setShowSignUp={setShowSignUp}
          setShowLogIn={setShowLogIn}
          setUserId={setUserId}
        ></SignUp>
      )}
    </div>
  );
}

export default App;
