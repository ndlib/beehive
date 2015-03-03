//app/assets/javascripts/components.js
//= require_self
//= require react_ujs

React = require('react');

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
SectionDescription = require('./components/SectionDescription');


// Items
ItemsList = require('./components/ItemsList');
ItemsListItem = require('./components/ItemsListItem');
ItemShow = require('./components/ItemShow');
ItemLink = require('./components/ItemLink');

// Other
MetadataList = require('./components/MetadataList');
MetadataItem = require('./components/MetadataItem');
Thumbnail = require('./components/Thumbnail');
OpenseadragonViewer  = require('./components/OpenseadragonViewer');
Loading= require('./components/Loading');
