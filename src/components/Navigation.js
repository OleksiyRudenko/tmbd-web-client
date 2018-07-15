import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ActorPage from './ActorPage';
import MoviePage from './MoviePage';
import MoviesList from './MoviesList';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const links = [
  { path: '/', title: 'Home' },
  { path: '/list', title: 'List of movies' },
];

const routes = [
  {
    exact: true,
    path: '/list',
    title: 'List of movies',
    component: MoviesList,
  },
  {
    exact: false,
    path: '/actor/:id',
    title: 'Actor page',
    component: ActorPage,
  },
  {
    exact: false,
    path: '/movie/:id?',
    title: 'Movie page',
    component: MoviePage,
  },
];

const NavLink = props => <Link {...props} />;

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Router>
          <Fragment>
            <header>
              <div>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      variant="title"
                      color="inherit"
                      className={classes.flex}
                    >
                      TMDB
                    </Typography>
                    <nav>
                      <ul className="navigation-menu">
                        {links.map((link, idx) =>
                          this.renderRouteLinkListItem(idx, link)
                        )}
                      </ul>
                    </nav>
                  </Toolbar>
                </AppBar>
              </div>
            </header>
            <main>
              {routes.map((route, idx) => (
                <Route
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                  key={idx}
                />
              ))}
            </main>
          </Fragment>
        </Router>
      </div>
    );
  }

  renderRouteLinkListItem(idx, route) {
    return (
      <li key={idx}>
        <Button color="inherit" component={NavLink} to={route.path}>
          {route.title}
        </Button>
      </li>
    );
  }
}

export default withStyles(styles)(Navigation);
