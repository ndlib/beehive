//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
  },

  componentDidMount: function() {
    $('#modal-' + this.props.section.id + ' .col-md-12').perfectScrollbar({useBothWheelAxes: true, suppressScrollX: true });
  },

  textStyle: function(h) {
    return {
      overflowY: "hidden",
      height: h,
    }
  },

  render: function() {
    var item = "";
    var prev = "";
    var next = "";
    if (this.props.section) {

      if (this.props.previousSection) {
        prev = (<PreviousModal id={this.props.previousSection} />);
      }
      if (this.props.nextSection) {
        next = (<NextModal id={this.props.nextSection} />);
      }
      if (this.props.section.item) {
        item = (<ItemShow item={this.props.section.item} additionalDetails={this.props.section.description}/>);
        // layout for section with item
        return (
        <div>
          {prev}
          {next}
          <div className="row">
            <div className="col-md-12">
              {item}
            </div>
          </div>
        </div>
      );
      }
      else {
        // layout for section without item
        var textHeight = $(window).height() - $('#banner').height() - $(".modal-body h2").height() - $("footer").height() - 60;
        return (
          <div>
            <h2>{this.props.section.title}</h2>
            {prev}
            {next}
            <div className="row">
              <div className="col-md-12" style={this.textStyle(textHeight)}>
                <div className="section-description" >
                  <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <Loading />;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
