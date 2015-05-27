//app/assets/javascripts/components/SectionDescription.jsx
var React = require('react');

var converter = new Showdown.converter()

var SectionDescription = React.createClass({
  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  style: function() {
    return {
      display: 'inline-block',
      maxWidth: '31em',
      overflow: 'hidden',
      height: this.props.height + 'px',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
    };
  },

  overflowStyle: function() {
    return {
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '2',
      height: '60px',
      lineHeight: '60px',
      width: '100%',
      textAlign: 'center',
      background: 'black',
      background: "-moz-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)",
      background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.4)), color-stop(55%,rgba(0,0,0,1)), color-stop(100%,rgba(0,0,0,1)))",
      background: "-webkit-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "-o-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "-ms-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",

    };
  },

  componentDidMount: function() {
    // we need to re-call the render function because the heights were not available
    // the first time we rendered.
    this.forceUpdate();
  },

  render: function () {
    var rawMarkup;
    if (this.props.section.description) {
      rawMarkup = this.props.section.description.toString();
    }

    var sectionHeight = $('#section-' + this.props.section.id).height();
    var contentHeight = $('#section-' + this.props.section.id + ' .item-description').height();
    var overflow = "";
    if(contentHeight !== null) {
      if(contentHeight > sectionHeight) {
        overflow = (<div style={this.overflowStyle()}>MORE</div>);
      }
    }

    if (rawMarkup || (this.props.section.name && this.props.section.item == null)) {
      return (
        <div className="section-container section-container-text" style={this.style()}>
          <h2 className="section-container-text-title">{this.props.section.name}</h2>
          <DescriptionTeaser description={rawMarkup} />
          {overflow}
        </div>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = SectionDescription;
