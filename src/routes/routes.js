import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import SiteIndexPage from './SiteIndexPage'
import CollectionPage from './CollectionPage'
import CustomCollectionPage from './CustomCollectionPage'
import CollectionIntroductionPage from './CollectionIntroductionPage'
import ShowcasePage from './ShowcasePage'
import SectionPage from './SectionPage'
import ItemPage from './ItemPage'
import SearchPage from './SearchPage'
import ErrorPage from './ErrorPage'
import AboutPage from './AboutPage'
import PagesPage from './PagesPage'
import PrintableMetadata from './PrintableMetadata'

export default function () {
  return (
    <BrowserRouter>
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
