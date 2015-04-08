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
    var id = '#modal-' + this.props.section.id;
    $(id + ' .col-md-12').perfectScrollbar({useBothWheelAxes: true, suppressScrollX: true });

    // bind keypress to modal when it is shown
    $(id).on('show.bs.modal', {props: this.props}, function (event) {
      $(document).bind('keyup', {props: event.data.props},
        function(event) {
          // if left or up arrow
          if(event.keyCode == 37 || event.keyCode == 38) {
            if(event.data.props.previousSection) {
              $('#modal-' + event.data.props.section.id).modal('hide');
              $('#modal-' + event.data.props.previousSection).modal('show');
              window.location.hash = 'modal-' +  event.data.props.previousSection;
            }
          }
          // if right or down arrow
          else if(event.keyCode == 39 || event.keyCode == 40) {
            if(event.data.props.nextSection) {
              $('#modal-' + event.data.props.section.id).modal('hide');
              $('#modal-' + event.data.props.nextSection).modal('show');
               window.location.hash = 'modal-' +  event.data.props.nextSection;
            }
          }
        }
      );
    });
    // remove keybindings when modal hidden
    $(id).on('hide.bs.modal', function () {
      $(document).unbind('keyup');
    });
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
