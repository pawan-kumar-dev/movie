import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import Switch from "react-switch";

function App() {
  const [searchText, setSearchText] = useState("");
  const [resultCount, setResultCount] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode")
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false
  );
  const fetchMovies = useCallback(() => {
    let searchApi = "https://www.omdbapi.com/?apikey=45f0782a&s=war";
    if (searchText) {
      searchApi = `https://www.omdbapi.com/?apikey=45f0782a&s=${searchText}`;
    }
    fetch(searchApi).then((response) => {
      response.json().then((result) => {
        if (result.Error) {
          setError(result.Error);
          setResultCount("0");
          setResult([]);
        } else {
          setError("");
          setResultCount(result.totalResults);
          setResult(result.Search);
        }
      });
    });
  }, [searchText]);
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <div className={`App ${isDarkMode && "dark-app"}`}>
      <form onSubmit={(e) => e.preventDefault()} className="filter">
        <h1 className="title">React Movie Search</h1>
        <input
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
          className="input"
          placeholder="Search Title. i.e. Fight Club"
          type="text"
          title="Find your title"
        />
      </form>
      <div className="details">
        <h3>Total Search Result : {resultCount}</h3>
        {error ? <h3>{error}</h3> : <div />}
        <Switch
          onChange={(checked) => {
            setIsDarkMode(checked);
            localStorage.setItem("isDarkMode", JSON.stringify(checked));
          }}
          checked={isDarkMode}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      <div className="movie-list">
        {result.map((movie) => (
          <Card key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
