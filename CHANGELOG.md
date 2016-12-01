# Change Log
## [3.2.0](https://github.com/ndlib/beehive/releases/tag/v3.2.0) (2016-11-30)
[Full Changelog](https://github.com/ndlib/beehive/compare/v3.1.1...v3.2.0)

###New features/enhancements:###
- Add Printable Metadata. ([DEC-1280](https://jira.library.nd.edu/browse/DEC-1280), [#262](https://github.com/ndlib/beehive/pull/262))
- As an editor I need to be able to embed media in a page. ([DEC-1109](https://jira.library.nd.edu/browse/DEC-1109), [#257](https://github.com/ndlib/beehive/pull/257))
- Update the api to render the media in the api. ([DEC-1158](https://jira.library.nd.edu/browse/DEC-1158), [#256](https://github.com/ndlib/beehive/pull/256))
- As a Beehive user I want to see media in the search results. ([DEC-1106](https://jira.library.nd.edu/browse/DEC-1106), [#255](https://github.com/ndlib/beehive/pull/255))
- As a Beehive user i want to see media in the showcase line up. ([DEC-1105](https://jira.library.nd.edu/browse/DEC-1105), [#254](https://github.com/ndlib/beehive/pull/254))

###Bug fixes:###
- Video thumbnail not showing up on beehive pprd ([DEC-1309](https://jira.library.nd.edu/browse/DEC-1309), [#265](https://github.com/ndlib/beehive/pull/265))
- Image reset button does not reset rotation ([DEC-365](https://jira.library.nd.edu/browse/DEC-365), [#263](https://github.com/ndlib/beehive/pull/263))
- Add ordering to metadata print view ([DEC-1289](https://jira.library.nd.edu/browse/DEC-1289), [#264](https://github.com/ndlib/beehive/pull/264))
- Close button on page title misaligned ([DEC-1281](https://jira.library.nd.edu/browse/DEC-1281), [#261](https://github.com/ndlib/beehive/pull/261))
- Showcases/pages not showing in the navigation menu (hamburger icon) on beehive ([DEC-1209](https://jira.library.nd.edu/browse/DEC-1209), [#260](https://github.com/ndlib/beehive/pull/260))
- Continue box on page looks bad when the next thing does not have an image. ([DEC-1194](https://jira.library.nd.edu/browse/DEC-1194), [#258](https://github.com/ndlib/beehive/pull/258))
- Search Bug ([DEC-1193](https://jira.library.nd.edu/browse/DEC-1193), [#259](https://github.com/ndlib/beehive/pull/259))
  
## [3.1.1](https://github.com/ndlib/beehive/releases/tag/v3.1.1) (2016-07-15)
[Full Changelog](https://github.com/ndlib/beehive/compare/v3.1.0...v3.1.1)

###Bug fixes:###
  - Fixed an alignment issue on facets and item names that wrapped to two lines ([DEC-1073](https://jira.library.nd.edu/browse/DEC-1073), [#243](https://github.com/ndlib/beehive/pull/243))
  - Fixed an issue where the search box will still show if the collection has browsing enabled, but not searching ([DEC-836](https://jira.library.nd.edu/browse/DEC-836), [#244](https://github.com/ndlib/beehive/pull/244), [#246](https://github.com/ndlib/beehive/pull/246))
  - Facet checkboxes will now reflect the facet selections when returning to a search state, such as when refreshing the page or returning via a bookmark or shared url ([DEC-1056](https://jira.library.nd.edu/browse/DEC-1056), [#245](https://github.com/ndlib/beehive/pull/245))
  - Items with long names will no longer squish the metadata to the right side when zooming in on the item ([DEC-1095](https://jira.library.nd.edu/browse/DEC-1095), [#247](https://github.com/ndlib/beehive/pull/247))
  - Added missing Apple touch icons ([DEC-865](https://jira.library.nd.edu/browse/DEC-865), [#249](https://github.com/ndlib/beehive/pull/249))
  - "Next Showcase" cards are now centered vertically ([DEC-1129](https://jira.library.nd.edu/browse/DEC-1129), [#248](https://github.com/ndlib/beehive/pull/248))
  - Fixed an issue with rendering of images and captions in pages ([DEC-795](https://jira.library.nd.edu/browse/DEC-795), [#252](https://github.com/ndlib/beehive/pull/252))
  
## [3.1.0](https://github.com/ndlib/beehive/releases/tag/v3.1.0) (2016-06-16)
[Full Changelog](https://github.com/ndlib/beehive/compare/v3.0.2...v3.1.0)

###New features/enhancements:###
  - Now renders a default thumbnail for items that only have metadata and no associated image to better support different types of collections ([DEC-1038](https://jira.library.nd.edu/browse/DEC-1038), [#235](https://github.com/ndlib/beehive/pull/235))
  - Improvements were made to item viewing to give a more consistent experience between items that have an image and those that do not  ([DEC-1047](https://jira.library.nd.edu/browse/DEC-1047), [#234](https://github.com/ndlib/beehive/pull/234))
  - Added support for collections with custom/simple urls ([DEC-1046](https://jira.library.nd.edu/browse/DEC-1046), [#238](https://github.com/ndlib/beehive/pull/238))
  - An "X" button will now appear in the search box so that users can more easily clear a search term ([DEC-1062](https://jira.library.nd.edu/browse/DEC-1062), [#240](https://github.com/ndlib/beehive/pull/240))
  - Now supports a "compact" parameter to allow embedding items and searches into iframes ([DEC-1061](https://jira.library.nd.edu/browse/DEC-1061), [#239](https://github.com/ndlib/beehive/pull/239))

###Bug fixes:###
  - Fixed a bug that caused no search results to show when the user changes the query while on a page ([DEC-1035](https://jira.library.nd.edu/browse/DEC-1035), [#236](https://github.com/ndlib/beehive/pull/236))
  - Fixed a bug that caused the metadata fields to render in the incorrect order ([DEC-1009](https://jira.library.nd.edu/browse/DEC-1009), [#237](https://github.com/ndlib/beehive/pull/237))


## [3.0.2](https://github.com/ndlib/beehive/releases/tag/v3.0.2) (2016-05-24)
[Full Changelog](https://github.com/ndlib/beehive/compare/v3.0.1...v3.0.2)

###Bug fixes:###
  - Fixed a bug that prevented searching with diacritics ([DEC-1011](https://jira.library.nd.edu/browse/DEC-1011), [#230](https://github.com/ndlib/beehive/pull/230))
  - Fixed the metadata from overflowing on the item viewer ([DEC-1012](https://jira.library.nd.edu/browse/DEC-1012), [#231](https://github.com/ndlib/beehive/pull/231))
  - Default zoom on the item viewer will no longer scale an image past its native size ([DEC-1014](https://jira.library.nd.edu/browse/DEC-1014), [#232](https://github.com/ndlib/beehive/pull/232))
  - Fixed a bug that prevented Internet Explorer users from searching/browsing a collection ([DEC-1015](https://jira.library.nd.edu/browse/DEC-1015), [#233](https://github.com/ndlib/beehive/pull/233))

## [3.0.1](https://github.com/ndlib/beehive/releases/tag/v3.0.1) (2016-05-04)
[Full Changelog](https://github.com/ndlib/beehive/compare/v3.0.0...v3.0.1)

###New features/enhancements:###
  - Added Google analytics ([#228](https://github.com/ndlib/beehive/pull/228))

###Bug fixes:###
  - Fixed a bug that caused duplication of titles on showcase cards ([DEC-888](https://jira.library.nd.edu/browse/DEC-888), [#229](https://github.com/ndlib/beehive/pull/229))
  - IE users were unable to view intro and about pages ([DEC-860](https://jira.library.nd.edu/browse/DEC-860), [#227](https://github.com/ndlib/beehive/pull/227))
