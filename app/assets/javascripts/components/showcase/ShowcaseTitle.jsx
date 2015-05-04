//app/assets/javascripts/components/ShowcaseTitle.jsx
var React = require('react');

var converter = new Showdown.converter()

var ShowcaseTitle = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      width: '75vw',
    }
  },

  outerStyle: function() {
    var height;
    if (this.props.height) {
      height = this.props.height + 'px';
    }
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      padding: '5px',
      height: height,
      marginRight: '10px',
      width: this.props.width,
    };
  },

  innerStyle: function() {
    return {
      width: '100%',
      display: 'inline-block',
    };
  },

  headerStyle: function() {
    var marginTop;
    if (this.props.height) {
      var marginTop = Math.round(this.props.height * 0.15) + 'px';
    }
    return {
      marginTop: marginTop,
    }
  },

  editTitle: function() {
    window.location = this.props.showcase.editUrl;
  },

  render: function() {
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <div className="showcase-title-page" style={this.outerStyle()}>
        <div className="showcase-title-page-inner" style={this.innerStyle()}>
          <h2 className="showcase-title-primary" style={this.headerStyle()}>
            <span className="title">{this.props.showcase.title_line_1}</span>&nbsp;
            <span className="subtitle">{this.props.showcase.title_line_2}</span>
          </h2>
          <div className="showcase-title-description" dangerouslySetInnerHTML={{__html: description}}  />
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitle;
