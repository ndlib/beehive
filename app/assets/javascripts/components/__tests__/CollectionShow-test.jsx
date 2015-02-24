// app/assets/javascripts/components/__tests__/CollectionShow-test.jsx
jest.dontMock('../CollectionShow');


describe('CollectionShow', function() {
  it('should tell use it is a component', function() {
    global.$ = require('jquery');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var CollectionShow = require('../CollectionShow');
    var collectionShow = TestUtils.renderIntoDocument(<CollectionShow collectionsUrl="dummy" />);
    expect(collectionShow.getDOMNode()).not.toBeNull()
  });
});
