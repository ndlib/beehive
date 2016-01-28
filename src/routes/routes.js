'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import SiteIndexPage from './SiteIndexPage.jsx';
import CollectionPage from './CollectionPage.jsx';
import CollectionIntroductionPage from './CollectionIntroductionPage.jsx';
import ShowcasePage from './ShowcasePage.jsx';
import SearchPage from './SearchPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import AboutPage from './AboutPage.jsx';
// import PagesPage from './PagesPage.jsx';

export default function() {
  const history = createHistory();
  return (
    <Router history={ history }>
      <Route path="/" component="div">
        <IndexRoute component={ SiteIndexPage } />
        <Route path=":collectionID/*/intro" component={CollectionIntroductionPage} />
        <Route path=":collectionID/*/about" component={AboutPage} />
        <Route path=":collectionID/*/search" component={SearchPage} />
        <Route path=":collectionID/*/showcases/:showcaseID/*" component={ShowcasePage} />
        <Route path=":collectionID/*" component={CollectionPage} />
        <Route path="404" component={ErrorPage}/>
      </Route>
    </Router>
  );
}
