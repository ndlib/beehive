'use strict'
var React = require('react');
var mui = require('material-ui');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object.isRequired,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.section) {
      if(this.props.previousUrl) {
        prev = (<PreviousModal url={this.props.previousUrl} />);
      }
      if(this.props.nextUrl) {
        next = (<NextModal url={this.props.nextUrl} />);
      }
      if (this.props.section.item) {
        // layout for section with item
        return (
          <div>
            <mui.AppBar
              title={this.props.section.item.name}
              iconElementRight={<div>X</div>}
              iconElementLeft={<div/>}
            />
            {prev}
            {next}
            <ItemShow height={this.props.height} item={this.props.section.item} additionalDetails={this.props.section.description}/>
          </div>
        );
      } else {
        // layout for section without item
        return (
          <div>
            <mui.AppBar
              title={this.props.section.title}
              iconElementRight={<div>X</div>}
              iconElementLeft={<div/>}
            />
            {prev}
            {next}
            <SectionShowDescription height={this.props.height} section={this.props.section} />
          </div>
        );
      }
    } else {
      return null;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
