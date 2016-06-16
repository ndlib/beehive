# Change Log
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
