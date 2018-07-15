/* @flow */
import React, { Component } from 'react';
import { Tmdb } from '../utils/Tmdb';
import extraStyles from './MoviePage.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      movieId: this.props.match.params.id || 72723,
      posterUrl: null,
    };
  }

  render() {
    console.log('MoviePage.render()', this.props, this.state);
    return (
      <Paper className={this.classes.root} elevation={1}>
        <div className={extraStyles.container}>
          <div>
            {this.state.posterUrl ? (
              <img src={this.state.posterUrl} alt="poster" />
            ) : (
              ''
            )}
          </div>
          <div>
            <Typography variant="headline" component="h3">
              {this.state.title}
            </Typography>
            <Typography component="p">{this.state.description}</Typography>
          </div>
        </div>
      </Paper>
    );
  }

  componentDidMount() {
    Tmdb.getImageryConfig().then(console.log);
    Tmdb.getMovie(this.state.movieId)
      .then(details => {
        console.log(details);
        /*
        crew,
        score from IMDB
        reviews
        add a movie to the list of favorites

        see recommendations.
        I want to have a possibility to configure
        parameters which will be used for searching of similar movies or tv-shows -
        same genre, same actors, same director, same year, etc.

        List of recommended movies must change on-fly when I change parameters.

        see interesting facts, similar to IMDB

        In addition to information from the movie section:

        see a list of seasons.
        If I click on a season, I want to see a list of episodes.

        I want to have a possibility to see the description of the episode,
        poster, date, and other related information

        see the calendar with planned episodes.

        Also, I want to see how much days are left to release of the episode
        have a possibility to set a reminder, which should notify about the episode.

        The basic version can be done with local storage.
        For the advanced version, can be used service worker

        see status - Closed, On fly, On going, etc.
        */
        this.setState({
          title: details.title,
          description: details.overview,
          runtime: details.runtime,
          releaseDate: new Date(details.release_date),
          genres: details.genres,
          budget: details.budget,
          revenue: details.revenue,
          homepage: details.homepage,
          video: details.video,
          imdbId: details.imdb_id,
          voteAverage: details.vote_average,
          voteCount: details.vote_count,
          popularity: Math.round(5 * details.popularity),
          posterUrl: Tmdb.getImageUrl(details.poster_path, 342),
        });

        return Tmdb.getMovie(this.state.movieId, ['images']);
      })
      /* .then(images => {
        console.log(images);
        const poster = images.posters.find(p => p.iso_639_1 === 'en');
        this.setState({
          posterUrl: Tmdb.getImageUrl(poster.file_path, 342),
        });
      }) */
      .catch(console.error);
  }
}

export default withStyles(styles)(MoviePage);
