//app/assets/javascripts/components/ShowcaseTitle.jsx
var React = require('react');

var converter = new Showdown.converter()

var ShowcaseTitle = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
    widthPercent: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      widthPercent: 0.75,
    }
  },

  outerStyle: function() {
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      padding: '5px',
      height: this.props.height + 'px',
      marginRight: '10px',
      width: Math.floor(this.props.widthPercent * 100) + 'vw',
    };
  },

  innerStyle: function() {
    return {
      width: '100%',
      display: 'inline-block',
    };
  },

  alignStyle: function() {
    return {
      height: this.props.height + 'px',
      display: 'inline-block',
    };
  },

  headerStyle: function() {
    var marginTop = Math.round(this.props.height * 0.15);
    console.log(marginTop);
    return {
      marginTop: marginTop + 'px',
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
          <h2 style={this.headerStyle()}>{this.props.showcase.title}</h2>
          <div className="showcase-title-description" dangerouslySetInnerHTML={{__html: description}}  />
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitle;
