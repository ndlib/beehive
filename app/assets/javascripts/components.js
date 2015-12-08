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
CurrentThemeMixin = require("./mixins/CurrentThemeMixin");
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
CollectionIntroCard = require("./components/pages/Collection/CollectionIntroCard");

//// Collection Introduction
CollectionIntroduction = require("./components/pages/CollectionIntroduction/CollectionIntroduction");
CollectionDescription = require("./components/pages/CollectionIntroduction/CollectionDescription");

//// Showcase
Showcase = require("./components/pages/Showcase/Showcase");

//// Pages
AboutPage = require("./components/pages/Pages/AboutPage");
Page = require("./components/pages/Pages/Page");
PagesShow = require("./components/pages/Pages/PagesShow");

//// Search
Search = require("./components/pages/Search/Search");
SearchSort = require("./components/pages/Search/SearchSort");
SearchFacets = require("./components/pages/Search/SearchFacets");
SearchPagination = require("./components/pages/Search/SearchPagination");
SearchSidebar = require("./components/pages/Search/SearchSidebar");
SearchDisplayList = require("./components/pages/Search/SearchDisplayList");
SearchControls = require("./components/pages/Search/SearchControls");
ItemListItem = require("./components/pages/Search/ItemListItem");
ItemImage = require("./components/pages/Search/ItemImage");
GridItem = require("./components/pages/Search/GridItem");
ListItem = require("./components/pages/Search/ListItem");

//// ErrorPage
ErrorPage = require("./components/pages/Error/ErrorPage");

//// ThemeTestPage
ThemeTestPage = require("./components/pages/ThemeTestPage");

// Layout
PageHeader = require("./components/layout/PageHeader");
TitleBar = require("./components/layout/TitleBar");
PageContent = require("./components/layout/PageContent");
CollectionPageHeader = require("./components/layout/CollectionPageHeader");
CollectionPageFooter = require("./components/layout/CollectionPageFooter");
IndexPageFooter = require("./components/layout/IndexPageFooter");

BrandBar = require("./components/layout/BrandBar");
PreviewLink = require("./components/layout/PreviewLink");

SearchBox = require("./components/layout/SearchBox");

// Embed Codes
CollectionEmbed = require("./components/embeds/CollectionEmbed");
ShowcaseEmbed = require("./components/embeds/ShowcaseEmbed");
SectionEmbed = require("./components/embeds/SectionEmbed");
ItemEmbed = require("./components/embeds/ItemEmbed");

// Showcases
ShowcasesCardList = require("./components/showcase/ShowcasesCardList");
ShowcaseShow = require("./components/showcase/ShowcaseShow");
ShowcaseInnerContent = require("./components/showcase/ShowcaseInnerContent");
ShowcaseSections = require("./components/showcase/ShowcaseSections");
ShowcaseTitleBar = require("./components/showcase/ShowcaseTitleBar");
ShowcaseBackground = require("./components/showcase/ShowcaseBackground");
// cards
ShowcaseCard = require("./components/showcase/cards/ShowcaseCard");
ShowcaseEndingCard = require("./components/showcase/cards/ShowcaseEndingCard");
ShowcaseTitleCard = require("./components/showcase/cards/ShowcaseTitleCard");

// Sections
SectionShow = require("./components/section/SectionShow");
SectionShowDescription = require("./components/section/SectionShowDescription");
// cards
SectionCard = require("./components/section/cards/SectionCard");

// dislplay -- for items and sections
Details = require("./components/pages/display/Details");
MetadataList = require("./components/pages/display/MetadataList");
MetadataItem = require("./components/pages/display/MetadataItem");
MetadataString = require("./components/pages/display/MetadataString");
MetadataHTML = require("./components/pages/display/MetadataHTML");
MetadataDate = require("./components/pages/display/MetadataDate");
MetadataText = require("./components/pages/display/MetadataText");
ItemShow = require("./components/pages/display/ItemShow");
PreviousModal = require("./components/pages/display/PreviousModal");
NextModal = require("./components/pages/display/NextModal");
OpenseadragonViewer  = require("./components/pages/display/OpenseadragonViewer");

// Other
AttentionHelp = require("./components/other/AttentionHelp");
DescriptionTeaser = require("./components/other/DescriptionTeaser");
HoneycombImage = require("./components/other/HoneycombImage");
Loading = require("./components/other/Loading");
ToggleTheme = require("./components/other/ToggleTheme");
Scroller = require("./components/other/Scroller");

// Flux
AppDispatcher = require("./dispatcher/AppDispatcher");
ItemActionTypes = require("./constants/ItemActionTypes");
ItemActions = require("./actions/ItemActions");
SectionActions = require("./actions/SectionActions");
SectionActionTypes = require("./constants/SectionActionTypes");
