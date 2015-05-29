//app/assets/javascripts/components/modal/SectionModal.jsx
var React = require('react');

var SectionModal = React.createClass({
  displayName: 'Section Modal',
  propTypes: {
    section: React.PropTypes.object.isRequired,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
  },

  sectionPage: function() {
    return (
       <SectionShow height={this.props.height} section={this.props.section} previousSection={this.props.previousSection} nextSection={this.props.nextSection} />
    );
  },

  modalID: function() {
    return "modal-" + this.props.section.id;
  },

  render: function () {
    var sectionPage = this.sectionPage();
    return (
      <Modal className="section-modal" height={this.props.height} id={this.modalID()} content={sectionPage} hasHash={true} />
    );
  }
});

module.exports = SectionModal;
