//app/assets/javascripts/components/modal/SectionModal.jsx
var React = require('react');

var SectionModal = React.createClass({
  displayName: 'Section Modal',
  propTypes: {
    section: React.PropTypes.object.isRequired,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
  },

  sectionPage: function() {
    return (
       <SectionShow section={this.props.section} previousSection={this.props.previousSection} nextSection={this.props.nextSection} />
    );
  },

  modalID: function() {
    return "modal-" + this.props.section.id;
  },

  render: function () {
    var sectionPage = this.sectionPage();
    return (
      <Modal id={this.modalID()} content={sectionPage} />
    );
  }
});

module.exports = SectionModal;
