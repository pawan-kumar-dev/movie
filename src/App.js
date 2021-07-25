import React from "react";
import "./App.css";
import Card from "./Components/Card";
import Switch from "react-switch";

class App extends React.Component {
  state = {
    searchText: "",
    resultCount: "",
    error: "",
    result: [],
    isDarkMode: false,
  };
  componentDidMount = () => {
    this.setState({
      isDarkMode: localStorage.getItem("isDarkMode")
        ? JSON.parse(localStorage.getItem("isDarkMode"))
        : false,
    });
    this.fetchMovies();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchText } = this.state;
    if (prevState.searchText !== searchText) this.fetchMovies();
  };
  fetchMovies = () => {
    const { searchText } = this.state;
    let searchApi = "https://www.omdbapi.com/?apikey=45f0782a&s=war";
    if (searchText) {
      searchApi = `https://www.omdbapi.com/?apikey=45f0782a&s=${searchText}`;
    }
    fetch(searchApi).then((response) => {
      response.json().then((result) => {
        if (result.Error) {
          this.setState({
            error: result.Error,
            resultCount: "0",
            result: [],
          });
        } else {
          this.setState({
            error: "",
            resultCount: result.totalResults,
            result: result.Search,
          });
        }
      });
    });
  };
  onDarkModeChange = (checked) => {
    this.setState(
      {
        isDarkMode: checked,
      },
      () => localStorage.setItem("isDarkMode", JSON.stringify(checked))
    );
  };
  render() {
    const { isDarkMode, searchText, result, resultCount, error } = this.state;
    return (
      <div className={`App ${isDarkMode && "dark-app"}`}>
        <form onSubmit={(e) => e.preventDefault()} className="filter">
          <h1 className="title">React Movie Search</h1>
          <input
            value={searchText}
            onChange={({ target: { value } }) =>
              this.setState({ searchText: value })
            }
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
            onChange={this.onDarkModeChange}
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
}

export default App;
