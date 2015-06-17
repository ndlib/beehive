jest.dontMock("../../collection/CollectionBackground");

var React, TestUtils, CollectionBackground, Collection, render;

describe('CollectionBackground', function(){
  React = require('react/addons');
  TestUtils = React.addons.TestUtils;
  CollectionBackground = require('../../collection/CollectionBackground');


  Collection = { "image": { "thumbnail/medium": {"contentUrl" : "http://test.local/test.png"}}};
  this.props = { collection: Collection};
  render = TestUtils.renderIntoDocument(<CollectionBackground collection={Collection} />);


  it("has className 'collection-background'", function() {
    expect(React.findDOMNode(render).className).toBe("collection-background");
  });

  it("sets a background image in the style attribute", function() {
    expect(React.findDOMNode(render).getAttribute("style")).toContain("http://test.local/test.png");
  });
});
