//app/assets/javascripts/components.js
//= require_self
//= require react_ujs

React = require("react");
EventEmitter = require("./EventEmitter");

// Mixins
CollectionUrlMixin = require("./mixins/CollectionUrlMixin");
HorizontalScrollMixin = require("./mixins/HorizontalScrollMixin");
PageHeightMixin = require("./mixins/PageHeightMixin");
PrevNextMixin = require("./mixins/PrevNextMixin");
LoadRemoteMixin = require("./mixins/LoadRemoteMixin");
TitleConcatMixin = require("./mixins/TitleConcatMixin");
MuiThemeMixin = require("./mixins/MuiThemeMixin");
IEMixin = require("./mixins/IEMixin");
SearchMixin = require("./mixins/SearchMixin");
SearchUrlMixin = require("./mixins/SearchUrlMixin");

// Pages
//// SiteIndex
SiteIndex = require("./components/pages/SiteIndex/SiteIndex");
CollectionsList = require("./components/pages/SiteIndex/CollectionsList");
CollectionCard = require("./components/pages/SiteIndex/CollectionCard");
GridList = require("./components/pages/SiteIndex/GridList");

//// Collection
Collection = require("./components/pages/Collection/Collection");
CollectionIntro = require("./components/pages/Collection/CollectionIntro");
CollectionShow = require("./components/pages/Collection/CollectionShow");
CollectionShowShowcases = require("./components/pages/Collection/CollectionShowShowcases");

//// Collection Introduction
CollectionIntroduction = require("./components/pages/CollectionIntroduction/CollectionIntroduction");
CollectionDescription = require("./components/pages/CollectionIntroduction/CollectionDescription");

//// Showcase
Showcase = require("./components/pages/Showcase/Showcase");

//// Search
Search = require("./components/pages/Search/Search");

//// ErrorPage
ErrorPage = require("./components/pages/Error/ErrorPage");

//// ThemeTestPage
ThemeTestPage = require("./components/pages/ThemeTestPage");

// Layout
Layout = require("./components/layout/Layout");
PageHeader = require("./components/layout/PageHeader");
TitleBar = require("./components/layout/TitleBar");
PageContent = require("./components/layout/PageContent");
CollectionPageHeader = require("./components/layout/CollectionPageHeader");
CollectionPageFooter = require("./components/layout/CollectionPageFooter");

GridItem = require("./components/layout/GridItem");
ListItem = require("./components/layout/ListItem");
Card = require("./components/layout/Card");
BrandBar = require("./components/layout/BrandBar");
CardBackground = require("./components/layout/CardBackground");
CardOverlay = require("./components/layout/CardOverlay");
MoreArrow = require("./components/layout/MoreArrow");
DialogWindow = require("./components/layout/DialogWindow");


// Embed Codes
CollectionEmbed = require("./components/embeds/CollectionEmbed");
ShowcaseEmbed = require("./components/embeds/ShowcaseEmbed");
SectionEmbed = require("./components/embeds/SectionEmbed");
ItemEmbed = require("./components/embeds/ItemEmbed");

// Collections
CollectionIntroCard = require("./components/collection/CollectionIntroCard");


// Showcases
ShowcasesCardList = require("./components/showcase/ShowcasesCardList");
ShowcaseShow = require("./components/showcase/ShowcaseShow");
ShowcaseInnerContent = require("./components/showcase/ShowcaseInnerContent");
ShowcaseSections = require("./components/showcase/ShowcaseSections");
ShowcaseTitle = require("./components/showcase/ShowcaseTitle");
ShowcaseTitleBar = require("./components/showcase/ShowcaseTitleBar");
ShowcaseBackground = require("./components/showcase/ShowcaseBackground");
ShowcaseCard = require("./components/showcase/ShowcaseCard");
StartShowcaseButton = require("./components/showcase/StartShowcaseButton");
ShowcaseEnding = require("./components/showcase/ShowcaseEnding");

// Sections
SectionShow = require("./components/section/SectionShow");
SectionShowDescription = require("./components/section/SectionShowDescription");
Section = require("./components/section/Section");
SectionCaption = require("./components/section/SectionCaption");
SectionDescription = require("./components/section/SectionDescription");
SectionImage = require("./components/section/SectionImage");
SectionLink = require("./components/section/SectionLink");
SectionsListItem = require("./components/section/SectionsListItem");

// Items
ItemsList = require("./components/item/ItemsList");
ItemShow = require("./components/item/ItemShow");
ItemListItem = require("./components/item/ItemListItem");
ItemImage = require("./components/item/ItemImage");
ItemText = require("./components/item/ItemText");
AdditionalResources = require("./components/item/AdditionalResources");
AdditionalResourcesItem = require("./components/item/AdditionalResourcesItem");

// Search
SearchDisplayList = require("./components/search/SearchDisplayList");
SearchBox = require("./components/search/SearchBox");
SearchSort = require("./components/search/SearchSort");
SearchFacets = require("./components/search/SearchFacets");
SearchPagination = require("./components/search/SearchPagination");
SearchSidebar = require("./components/search/SearchSidebar");
SearchControls = require("./components/search/SearchControls");

// Modal
Modal = require("./components/modal/Modal");
Copyright = require("./components/modal/Copyright");
Info = require("./components/modal/Info");

// Metadata
MetadataList = require("./components/metadata/MetadataList");
MetadataItem = require("./components/metadata/MetadataItem");
MetadataString = require("./components/metadata/MetadataString");
MetadataHTML = require("./components/metadata/MetadataHTML");
MetadataDate = require("./components/metadata/MetadataDate");
MetadataText = require("./components/metadata/MetadataText");

// Other
AttentionHelp = require("./components/other/AttentionHelp");
Details = require("./components/other/Details");
DescriptionTeaser = require("./components/other/DescriptionTeaser");
Thumbnail = require("./components/other/Thumbnail");
OpenseadragonViewer  = require("./components/other/OpenseadragonViewer");
Loading = require("./components/other/Loading");
PreviousModal = require("./components/other/PreviousModal");
NextModal = require("./components/other/NextModal");
ToggleTheme = require("./components/other/ToggleTheme");
Scroller = require("./components/other/Scroller");

AppDispatcher = require("./dispatcher/AppDispatcher");
ItemActionTypes = require("./constants/ItemActionTypes");
ItemActions = require("./actions/ItemActions");
SectionActions = require("./actions/SectionActions");
SectionActionTypes = require("./constants/SectionActionTypes");
