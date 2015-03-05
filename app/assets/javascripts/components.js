//app/assets/javascripts/components.js
//= require_self
//= require react_ujs

React = require('react');

// Mixins
CollectionUrlMixin = require('./mixins/CollectionUrlMixin');

// Layout
Layout = require('./components/layout/Layout');
PageHeader = require('./components/layout/PageHeader');
TitleBar = require('./components/layout/TitleBar');
PageContent = require('./components/layout/PageContent');
CollectionPageHeader = require('./components/layout/CollectionPageHeader');

// Pages
CollectionsListPage = require('./components/pages/CollectionsListPage');
CollectionShowPage = require('./components/pages/CollectionShowPage');
ShowcaseShowPage = require('./components/pages/ShowcaseShowPage');
SectionShowPage= require('./components/pages/SectionShowPage');
ItemsListPage = require('./components/pages/ItemsListPage');
ItemShowPage = require('./components/pages/ItemShowPage');

// Collections
CollectionsList = require('./components/CollectionsList');
CollectionsListItem = require('./components/CollectionsListItem');
CollectionLink = require('./components/CollectionLink');
CollectionShow = require('./components/CollectionShow');

// Showcases
ShowcasesList = require('./components/ShowcasesList');
ShowcasesListItem = require('./components/ShowcasesListItem');
ShowcaseLink = require('./components/ShowcaseLink');
ShowcaseTitleSection = require('./components/ShowcaseTitleSection');
ShowcaseShow = require('./components/ShowcaseShow');
ShowcaseEditorTitle = require('./components/ShowcaseEditorTitle');


// Sections
SectionsList = require('./components/SectionsList');
SectionsListItem = require('./components/SectionsListItem');
SectionLink = require('./components/SectionLink');
SectionShow = require('./components/SectionShow');
PreviousSection = require('./components/PreviousSection');
NextSection = require('./components/NextSection');
Section = require('./components/Section');
SectionImage = require('./components/SectionImage');
SectionCaption = require('./components/SectionCaption');
SectionDescription = require('./components/SectionDescription');


// Items
ItemsList = require('./components/ItemsList');
ItemsListItem = require('./components/ItemsListItem');
ItemShow = require('./components/ItemShow');
ItemLink = require('./components/ItemLink');
AdditionalResources = require('./components/AdditionalResources');
AdditionalResourcesItem = require('./components/AdditionalResourcesItem');

// Other
MetadataList = require('./components/MetadataList');
MetadataItem = require('./components/MetadataItem');
Details = require('./components/Details');
Thumbnail = require('./components/Thumbnail');
OpenseadragonViewer  = require('./components/OpenseadragonViewer');
Loading= require('./components/Loading');
