import React, { Component } from 'react';
import '../App.css';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      inputValue: '',
    };
  }

  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=5265606bb69e99437c85eb04dc6f29b5&sort_by=popularity.desc'
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
          console.log(this.state.items);
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleSearchChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/multi?language=en-US&query=${
        this.state.inputValue
      }&page=1&include_adult=false&api_key=5265606bb69e99437c85eb04dc6f29b5&sort_by=popularity.desc`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
          console.log(this.state.items);
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { error, isLoaded, items } = this.state;
    const poster = 'https://image.tmdb.org/t/p/w500';
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleSearchChange} />
              <input type="submit" />
            </form>
          </div>
          {items.map(item => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.overview}</p>
              <img src={`${poster}${item.poster_path}`} alt={item.title} />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default MainPage;
