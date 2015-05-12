//app/assets/javascripts/components.js
//= require_self
//= require react_ujs

React = require('react');

// Mixins
CollectionUrlMixin = require('./mixins/CollectionUrlMixin');
HorizontalScrollMixin = require('./mixins/HorizontalScrollMixin');
PageHeightMixin = require('./mixins/PageHeightMixin');
PrevNextMixin = require('./mixins/PrevNextMixin');

// Layout
Layout = require('./components/layout/Layout');
PageHeader = require('./components/layout/PageHeader');
TitleBar = require('./components/layout/TitleBar');
PageContent = require('./components/layout/PageContent');
CollectionPageHeader = require('./components/layout/CollectionPageHeader');
GridList = require('./components/layout/GridList');
Card = require('./components/layout/Card');
BrandBar = require('./components/layout/BrandBar');
CardBackground = require('./components/layout/CardBackground');
CardOverlay = require('./components/layout/CardOverlay');
CollectionOverlayFooter = require('./components/layout/CollectionOverlayFooter');

// Pages
CollectionsListPage = require('./components/pages/CollectionsListPage');
CollectionShowPage = require('./components/pages/CollectionShowPage');
ShowcasesListPage = require('components/pages/ShowcasesListPage');
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
CollectionCard = require('./components/collection/CollectionCard');
CollectionLink = require('./components/collection/CollectionLink');
CollectionShow = require('./components/collection/CollectionShow');
CollectionDescription = require('./components/collection/CollectionDescription');
CollectionIntro = require('./components/collection/CollectionIntro');
CollectionIntroLink = require('./components/collection/CollectionIntroLink');
CollectionBackground = require('./components/collection/CollectionBackground');

// Showcases
ShowcasesList = require('./components/showcase/ShowcasesList');
ShowcasesCardList = require('./components/showcase/ShowcasesCardList');
ShowcaseShow = require('./components/showcase/ShowcaseShow');
ShowcaseTitle = require('./components/showcase/ShowcaseTitle');
ShowcaseTitleBar = require('./components/showcase/ShowcaseTitleBar');
ShowcaseBackground = require('./components/showcase/ShowcaseBackground');
ShowcaseCard = require('./components/showcase/ShowcaseCard');
ShowcaseDropDown = require('./components/showcase/ShowcaseDropDown');

// Sections
SectionsList = require('./components/section/SectionsList');
SectionsListItem = require('./components/section/SectionsListItem');
SectionLink = require('./components/section/SectionLink');
SectionShow = require('./components/section/SectionShow');
SectionShowDescription = require('./components/section/SectionShowDescription');
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
ItemsModalList = require('./components/item/ItemsModalList');

// Modal
Modal = require('./components/modal/Modal');
Copyright = require('./components/modal/Copyright');
Info = require('./components/modal/Info');
SectionModal = require('./components/modal/SectionModal');
ItemModal = require('./components/modal/ItemModal');

// Other
MetadataList = require('./components/other/MetadataList');
MetadataItem = require('./components/other/MetadataItem');
Details = require('./components/other/Details');
DescriptionTeaser = require('./components/other/DescriptionTeaser');
Thumbnail = require('./components/other/Thumbnail');
OpenseadragonViewer  = require('./components/other/OpenseadragonViewer');
Loading= require('./components/other/Loading');
PreviousModal = require('./components/other/PreviousModal');
NextModal = require('./components/other/NextModal');
