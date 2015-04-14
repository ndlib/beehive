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
    var modal = $('#modal-' + this.props.section.id);
    modal.on('show.bs.modal', this.modalShow);
    modal.on('shown.bs.modal', this.modalShown);
    modal.on('hide.bs.modal', this.modalHide);
  },

  componentDidUpdate: function() {
    this.setDescriptionHeight();
  },

  modalShow: function(event) {
    $(document).bind('keyup', this.modalKeyup);
  },

  modalShown: function(event) {
    this.modalVisible = true;
    this.setDescriptionHeight();
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

  setDescriptionHeight: function() {
    if (this.modalVisible) {
      var description = $('#modal-' + this.props.section.id).find('.section-description');
      if (description.length > 0) {
        description.height($(window).height() - description.offset().top - $('#banner').height());
      }
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
        return (
          <div>
            <h2>{this.props.section.title}</h2>
            {prev}
            {next}
            <div className="row">
              <div className="col-md-12">
                <div className="section-description" ref="sectionDescription" style={{overflow: 'scroll'}}>
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
