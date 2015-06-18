// app/assets/javascripts/components/__tests__/otherLoading-test.jsx
jest.dontMock('../../other/Loading');

describe('Loading', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Loading = require('../../other/Loading');

  var loading = TestUtils.renderIntoDocument(<Loading/>);

  it('returns a div with the className loading', function() {
    expect(React.findDOMNode(loading).nodeName).toBe('DIV');
    expect(React.findDOMNode(loading).className).toBe('loading');
  });

  it('has an img tag with src=images/ajax-loader.gif', function() {
    expect(React.findDOMNode(loading).firstChild.nodeName).toBe('IMG');
    expect(React.findDOMNode(loading).innerHTML).toContain('src="/images/ajax-loader.gif"');
  });

});
