// app/assets/javascripts/components/__tests__/other/Thumbnail-test.jsx
jest.dontMock('../../other/Thumbnail');


describe('Thumbnail', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Thumbnail = require('../../other/Thumbnail');

  var image = {
    contentUrl: "http://test.local/image.png",
    'thumbnail/medium' : {
      contentUrl: "http://test.local/medium/image.png",
    },
  };

  it('renders /images/blank.png when no image is passed', function(){
    var thumbnail = TestUtils.renderIntoDocument(<Thumbnail/>);
      expect(React.findDOMNode(thumbnail).nodeName).toBe('IMG');
      expect(React.findDOMNode(thumbnail).src).toContain('/images/blank.png');
  });

  it('renders the passed image in original format', function(){
    var thumbnail = TestUtils.renderIntoDocument(<Thumbnail image={image}/>);
      expect(React.findDOMNode(thumbnail).nodeName).toBe('IMG');
      expect(React.findDOMNode(thumbnail).src).toBe(image.contentUrl);
  });

  it('renders the passed image in the medium format', function(){
    var thumbnail = TestUtils.renderIntoDocument(<Thumbnail image={image} thumbnailType="medium" />);
      expect(React.findDOMNode(thumbnail).nodeName).toBe('IMG');
        expect(React.findDOMNode(thumbnail).src).toBe(image['thumbnail/medium'].contentUrl);
  });

  it('renders the the passed title', function(){
    var thumbnail = TestUtils.renderIntoDocument(<Thumbnail image={image} title="The title" />);
      expect(React.findDOMNode(thumbnail).title).toBe("The title");
  });

  it('renders the the passed alt text', function(){
  var thumbnail = TestUtils.renderIntoDocument(<Thumbnail image={image} alt="<p>The <span>alt</span> text</p>" />);
      expect(React.findDOMNode(thumbnail).alt).toBe("The alt text");
  });



});
