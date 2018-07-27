/* @flow */
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
import MainPage from './MainPage';

const styles = {
  root: {
    flexGrow: 1,
  },
};

type Props = {
  classes: Object,
};

type State = {};

const routes = [
  {
    path: { navigation: '/' },
    isExact: true,
    title: 'Main page',
    component: MainPage,
  },
  {
    path: { navigation: '/actor', routing: '/actor/:id?' },
    title: 'Actor page',
    component: ActorPage,
  },
  {
    path: { navigation: '/movie', routing: '/movie/:id?' },
    title: 'Movie page',
    component: MoviePage,
  },
  {
    path: { navigation: '/list' },
    title: 'List of movies',
    component: MoviesList,
  },
];

const NavLink = props => <Link {...props} />;

class Navigation extends Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Fragment>
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
                    {routes.map((route, idx) =>
                      this.renderRouteLinkListItem(idx, route)
                    )}
                  </ul>
                </nav>
              </Toolbar>
            </AppBar>
          </div>
          {this.renderRoutes(routes)}
        </Fragment>
      </Router>
    );
  }

  renderRoutes(routes) {
    return (
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            exact={route.isExact}
            path={route.path.routing || route.path.navigation}
            component={route.component}
          />
        ))}
      </Switch>
    );
  }

  renderRouteLinkListItem(idx, route) {
    return (
      <li key={idx}>
        <Button color="inherit" component={NavLink} to={route.path.navigation}>
          {route.title}
        </Button>
      </li>
    );
  }
}

export default withStyles(styles)(Navigation);
