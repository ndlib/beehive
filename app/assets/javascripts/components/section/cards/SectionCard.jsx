//app/assets/javascripts/components/Section.jsx
var React = require('react');
var mui = require('material-ui');
var ThemeColors = require('material-ui/lib/styles/colors');

var SectionCard = React.createClass({
  mixins: [CollectionUrlMixin, LoadRemoteMixin, CurrentThemeMixin],
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      hover: false
    };
  },

  style: function() {
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginRight: '20px',
      height: this.props.height + 'px',
      cursor: 'pointer',
      lineHeight: '20px',
      backgroundColor: this.getCurrentPallette().showcaseTextCardColor,
    };
  },

  onMouseEnter: function() {
    return this.setState({
      hover: true
    });
  },

  onMouseLeave: function() {
    return this.setState({
      hover: false
    });
  },

  onClick: function(event) {
    this.sectionOnClick();
/*
    event.preventDefault();
    window.location.hash = this.props.section.id;
*/
  },

  sectionName: function() {
    return "section-" + this.props.section.id;
  },

  imageCard: function() {
    if (this.props.section.item) {
      return (
        <div>
          <mui.CardMedia>
            <img src={this.props.section.item.image['thumbnail/medium'].contentUrl} />
          </mui.CardMedia>
          <mui.CardText>
            <div dangerouslySetInnerHTML={{__html: this.props.section.caption}} />
          </mui.CardText>
        </div>
      );
    }
  },

  textCard: function () {
    if (this.props.section.description) {
      return (
        <div>
          <mui.CardTitle title={this.props.section.name}/>
          <mui.CardText>
            <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
          </mui.CardText>
        </div>
      );
    }
  },

  render: function() {
    return (
      <mui.Card style={this.style()} onClick={this.onClick} >
        { this.imageCard() }
        { this.textCard() }
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = SectionCard;
