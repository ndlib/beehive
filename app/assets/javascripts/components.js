//app/assets/javascripts/components.js
//= require_self
//= require react_ujs

React = require('react');

// Mixins
CollectionUrlMixin = require('./mixins/CollectionUrlMixin');
HorizontalScrollMixin = require('./mixins/HorizontalScrollMixin');
PrevNextMixin = require('./mixins/PrevNextMixin');

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

// Embed Codes
CollectionEmbed = require('./components/embeds/CollectionEmbed');
ShowcaseEmbed = require('./components/embeds/ShowcaseEmbed');
SectionEmbed = require('./components/embeds/SectionEmbed');
ItemEmbed = require('./components/embeds/ItemEmbed');

// Collections
CollectionsList = require('./components/collection/CollectionsList');
CollectionsListItem = require('./components/collection/CollectionsListItem');
CollectionLink = require('./components/collection/CollectionLink');
CollectionShow = require('./components/collection/CollectionShow');

// Showcases
ShowcasesList = require('./components/showcase/ShowcasesList');
ShowcasesListItem = require('./components/showcase/ShowcasesListItem');
ShowcaseLink = require('./components/showcase/ShowcaseLink');
ShowcaseTitleSection = require('./components/showcase/ShowcaseTitleSection');
ShowcaseShow = require('./components/showcase/ShowcaseShow');
ShowcaseEditorTitle = require('./components/showcase/ShowcaseEditorTitle');
ShowcaseTitleBar = require('./components/showcase/ShowcaseTitleBar');


// Sections
SectionsList = require('./components/section/SectionsList');
SectionsListItem = require('./components/section/SectionsListItem');
SectionLink = require('./components/section/SectionLink');
SectionShow = require('./components/section/SectionShow');
PreviousSection = require('./components/section/PreviousSection');
NextSection = require('./components/section/NextSection');
Section = require('./components/section/Section');
SectionCaption = require('./components/section/SectionCaption');
SectionDescription = require('./components/section/SectionDescription');
SectionImage = require('./components/section/SectionImage');
SectionsModalList = require('./components/section/SectionsModalList');

// Items
ItemsList = require('./components/item/ItemsList');
ItemsListItem = require('./components/item/ItemsListItem');
ItemShow = require('./components/item/ItemShow');
ItemLink = require('./components/item/ItemLink');
AdditionalResources = require('./components/item/AdditionalResources');
AdditionalResourcesItem = require('./components/item/AdditionalResourcesItem');

// Modal
Modal = require('./components/modal/Modal');
Copyright = require('./components/modal/Copyright');
Info = require('./components/modal/Info');
SectionModal = require('./components/modal/SectionModal');

// Other
MetadataList = require('./components/other/MetadataList');
MetadataItem = require('./components/other/MetadataItem');
Details = require('./components/other/Details');
DescriptionTeaser = require('./components/other/DescriptionTeaser');
Thumbnail = require('./components/other/Thumbnail');
OpenseadragonViewer  = require('./components/other/OpenseadragonViewer');
Loading= require('./components/other/Loading');
