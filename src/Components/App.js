import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const AsyncHomePage = lazy(
  () =>
    import('../Components/Pages/HomePage') /*webpackChunkName: "home-page" */,
);
const AsyncMoviesPage = lazy(
  () => import('../Components/Pages/Movies') /*webpackChunkName: "movies-page" */,
);
const AsyncMovieDetailsPage = lazy(
  () =>
    import(
      '../Components/Pages/MovieDetailsPage'
    ) /*webpackChunkName: "moviedetails-page" */,
);
const AsyncNotFoundPage = lazy(
  () =>
    import('../Components/Pages/NotFound') /*webpackChunkName: "notfound-page" */,
);

const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<h2>Loading...</h2>}>
      <Switch>
        <Route path="/" exact component={AsyncHomePage} />

        <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
        <Route path="/movies" component={AsyncMoviesPage} />
        <Route component={AsyncNotFoundPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
