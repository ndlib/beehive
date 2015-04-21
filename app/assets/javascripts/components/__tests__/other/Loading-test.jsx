// app/assets/javascripts/components/__tests__/otherLoading-test.jsx
jest.dontMock('../../other/Loading');


describe('Loading', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Loading = require('../../other/Loading');

  var loading = TestUtils.renderIntoDocument(<Loading/>);

  it('returns a div with the className loading', function() {
    expect(loading.getDOMNode().nodeName).toBe('DIV');
    expect(loading.getDOMNode().className).toBe('loading');
  });

  it('has an img tag with src=images/ajax-loader.gif', function() {
    expect(loading.getDOMNode().firstChild.nodeName).toBe('IMG');
    expect(loading.getDOMNode().innerHTML).toContain('src="/images/ajax-loader.gif"');
  });
});
