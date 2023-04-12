import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import Articles from "./components/Articles";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import AddRecipe from "./components/AddRecipe";
import AddArticle from "./components/AddArticle";
import { useEffect, useState } from "react";
import FullRecipe from "./components/FullRecipe";
import FullArticle from "./components/FullArticle";
import EditArticle from "./components/EditArticle";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [recipe, setRecipe] = useState({});
  const [article, setArticle] = useState({});
  const [userName,setUserName] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("userId") !== null) {
      setUserId(sessionStorage.getItem("userId"));
      setUserName(sessionStorage.getItem("username"));
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar
          setShowLogIn={setShowLogIn}
          userId={userId}
          setUserId={setUserId}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home userId={userId} recipe={recipe} setRecipe={setRecipe} />
            }
          />
          <Route
            path="/articles"
            element={<Articles userId={userId} setArticle={setArticle} />}
          />
          <Route
            path="/recipes"
            element={<Recipes userId={userId} setRecipe={setRecipe} />}
          />
          <Route path="/addrecipe" element={<AddRecipe userId={userId} />} />
          <Route
            path="/fullrecipe"
            element={<FullRecipe userId={userId} recipe={recipe} />}
          />
          <Route path="/addarticle" element={<AddArticle userId={userId} />} />
          <Route
            path="/fullarticle"
            element={<FullArticle userId={userId} article={article} />}
          />
          <Route
            path="/editarticle"
            element={
              <EditArticle
                userId={userId}
                article={article}
                setArticle={setArticle}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile setArticle={setArticle}/>}
          />
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
