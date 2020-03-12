import React from 'react'
import { browserHistory, Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import SiteIndexPage from './SiteIndexPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import CustomCollectionPage from './CustomCollectionPage.jsx'
import CollectionIntroductionPage from './CollectionIntroductionPage.jsx'
import ShowcasePage from './ShowcasePage.jsx'
import SectionPage from './SectionPage.jsx'
import ItemPage from './ItemPage.jsx'
import SearchPage from './SearchPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import AboutPage from './AboutPage.jsx'
import PagesPage from './PagesPage.jsx'
import PrintableMetadata from './PrintableMetadata.jsx'

export default function () {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route
          exact path='/'
          component={SiteIndexPage}
        />
        <Route
          exact path='/404'
          component={ErrorPage}
        />
        <Route
          exact path='/metadata/:itemID'
          component={PrintableMetadata}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/intro'
          component={CollectionIntroductionPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/about'
          component={AboutPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/search'
          component={SearchPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/items/:itemID'
          component={ItemPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/showcases/:showcaseID/:showcaseSlug'
          component={ShowcasePage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/showcases/:showcaseID/:showcaseSlug/sections/:sectionID'
          component={SectionPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug/pages/:pageID/:pageSlug'
          component={PagesPage}
        />
        <Route
          exact path='/:collectionID/:collectionSlug'
          component={CollectionPage}
        />
        <Route
          exact path='/:customSlug'
          component={CustomCollectionPage}
        />
      </Switch>
    </BrowserRouter>
  )
}
