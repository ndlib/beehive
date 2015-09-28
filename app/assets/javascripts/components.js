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
GridListMixin = require("./mixins/GridListMixin");
SearchMixin = require("./mixins/SearchMixin");

SearchUrlMixin = require("./mixins/SearchUrlMixin");

// Layout
Layout = require("./components/layout/Layout");
PageHeader = require("./components/layout/PageHeader");
TitleBar = require("./components/layout/TitleBar");
PageContent = require("./components/layout/PageContent");
CollectionPageHeader = require("./components/layout/CollectionPageHeader");
GridList = require("./components/layout/GridList");
GridItem = require("./components/layout/GridItem");
ListItem = require("./components/layout/ListItem");
Card = require("./components/layout/Card");
BrandBar = require("./components/layout/BrandBar");
CardBackground = require("./components/layout/CardBackground");
CardOverlay = require("./components/layout/CardOverlay");
CollectionOverlayFooter = require("./components/layout/CollectionOverlayFooter");
MoreArrow = require("./components/layout/MoreArrow");
DialogWindow = require("./components/layout/DialogWindow");

// Pages
CollectionsListPage = require("./components/pages/CollectionsListPage");
CollectionShowPage = require("./components/pages/CollectionShowPage");
CollectionIntroPage = require("./components/pages/CollectionIntroPage");
ShowcasesListPage = require("./components/pages/ShowcasesListPage");
ShowcaseShowPage = require("./components/pages/ShowcaseShowPage");
ItemsListPage = require("./components/pages/ItemsListPage");
ItemsSearchPage = require("./components/pages/ItemsSearchPage");
ErrorPage = require("./components/pages/ErrorPage");

// Embed Codes
CollectionEmbed = require("./components/embeds/CollectionEmbed");
ShowcaseEmbed = require("./components/embeds/ShowcaseEmbed");
SectionEmbed = require("./components/embeds/SectionEmbed");
ItemEmbed = require("./components/embeds/ItemEmbed");

// Collections
CollectionsList = require("./components/collection/CollectionsList");
CollectionsListItem = require("./components/collection/CollectionsListItem");
CollectionCard = require("./components/collection/CollectionCard");
CollectionLink = require("./components/collection/CollectionLink");
CollectionShow = require("./components/collection/CollectionShow");
CollectionIntroCard = require("./components/collection/CollectionIntroCard");
CollectionShowShowcases = require("./components/collection/CollectionShowShowcases");
CollectionDescription = require("./components/collection/CollectionDescription");
CollectionIntro = require("./components/collection/CollectionIntro");
CollectionIntroLink = require("./components/collection/CollectionIntroLink");
CollectionBackground = require("./components/collection/CollectionBackground");

// Showcases
ShowcasesCardList = require("./components/showcase/ShowcasesCardList");
ShowcaseShow = require("./components/showcase/ShowcaseShow");
ShowcaseInnerContent = require("./components/showcase/ShowcaseInnerContent");
ShowcaseSections = require("./components/showcase/ShowcaseSections");
ShowcaseTitle = require("./components/showcase/ShowcaseTitle");
ShowcaseTitleBar = require("./components/showcase/ShowcaseTitleBar");
ShowcaseBackground = require("./components/showcase/ShowcaseBackground");
ShowcaseCard = require("./components/showcase/ShowcaseCard");
ShowcaseDropDown = require("./components/showcase/ShowcaseDropDown");
StartShowcaseButton = require("./components/showcase/StartShowcaseButton");
ShowcaseEnding = require("./components/showcase/ShowcaseEnding");

// Sections
SectionShow = require("./components/section/SectionShow");
SectionShowDescription = require("./components/section/SectionShowDescription");
Section = require("./components/section/Section");
SectionCaption = require("./components/section/SectionCaption");
SectionDescription = require("./components/section/SectionDescription");
SectionImage = require("./components/section/SectionImage");
SectionsModalList = require("./components/section/SectionsModalList");
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
ItemsModalList = require("./components/item/ItemsModalList");

// Search
SearchDisplayList = require("./components/search/SearchDisplayList");
SearchBox = require("./components/search/SearchBox");
SearchSort = require("./components/search/SearchSort");
SearchFacets = require("./components/search/SearchFacets");
SearchPagination = require("./components/search/SearchPagination");

// Modal
Modal = require("./components/modal/Modal");
Copyright = require("./components/modal/Copyright");
Info = require("./components/modal/Info");
SectionModal = require("./components/modal/SectionModal");
ItemModal = require("./components/modal/ItemModal");

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
