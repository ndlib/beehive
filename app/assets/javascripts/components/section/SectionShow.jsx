//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
  },

  render: function() {
    var item ="";
    if (this.props.section) {
      if (this.props.section.item) {
        item = (<ItemShow item={this.props.section.item} />);
      }
      return (
        <div>
          <h2>{this.props.section.title}</h2>
          <PreviousSection section={this.props.section.previousSection} />
          <NextSection section={this.props.section.nextSection} />
          <div className="row">
            <div className="col-md-12">
              <div className="section-description">
                <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
              </div>
              {item}
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
