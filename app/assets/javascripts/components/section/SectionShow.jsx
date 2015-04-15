//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
    previousSection: React.PropTypes.string,
    nextSection: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  componentDidMount: function() {
    var modal = $('#modal-' + this.props.section.id);
    modal.on('show.bs.modal', this.modalShow);
    modal.on('hide.bs.modal', this.modalHide);
  },

  modalShow: function(event) {
    $(document).bind('keyup', this.modalKeyup);
  },

  modalKeyup: function(event) {
    // bind keypress to modal when it is shown
    if(event.keyCode == 37 || event.keyCode == 38) {
      if(this.props.previousSection) {
        $('#modal-' + this.props.section.id).modal('hide');
        $('#modal-' + this.props.previousSection).modal('show');
        window.location.hash = 'modal-' +  this.props.previousSection;
      }
    }
    // if right or down arrow
    else if(event.keyCode == 39 || event.keyCode == 40) {
      if(this.props.nextSection) {
        $('#modal-' + this.props.section.id).modal('hide');
        $('#modal-' + this.props.nextSection).modal('show');
         window.location.hash = 'modal-' +  this.props.nextSection;
      }
    }
  },

  modalHide: function(event) {
    this.modalVisible = false;
    $(document).off('keyup', this.modalKeyup);
  },

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.section) {
      if (this.props.previousSection) {
        prev = (<PreviousModal offsetTop={offsetTop} id={this.props.previousSection} />);
      }
      if (this.props.nextSection) {
        next = (<NextModal offsetTop={offsetTop} id={this.props.nextSection} />);
      }
      if (this.props.section.item) {
        // layout for section with item
        return (
          <div>
            {prev}
            {next}
            <ItemShow height={this.props.height} item={this.props.section.item} additionalDetails={this.props.section.description}/>
          </div>
        );
      } else {
        // layout for section without item
        return (
          <div>
            {prev}
            {next}
            <SectionShowDescription height={this.props.height} section={this.props.section} />
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
