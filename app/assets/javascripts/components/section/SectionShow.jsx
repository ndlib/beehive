//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
  },

  render: function() {
  console.log(this);
    var item = "";
    var prev = "";
    var next = "";
    console.log(this.props.section);
    if (this.props.section) {
      if (this.props.section.item) {
        item = (<ItemShow item={this.props.section.item} />);
      }
      if (this.props.previousSection) {
        prev = (<PreviousSection section={this.props.previousSection} />);
      }
      if (this.props.nextSection) {
        next = (<NextSection section={this.props.nextSection} />);
      }
      return (
        <div>
          <h2>{this.props.section.title}</h2>
          {prev}
          {next}
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
