//app/assets/javascripts/components/modal/Modal.jsx
var React = require('react');

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    content: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
    hasHash: React.PropTypes.bool,
    title: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      rendered: false,
      element: null,
    }
  },

  componentDidMount: function() {
    var element = $(React.findDOMNode(this));
    this.setState({
      element: element,
    });
    element.on('show.bs.modal', this.setRendered);
  },

  setRendered: function() {
    this.setState({
      rendered: true,
    });
  },

  styles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        marginTop: "0",
      };
    } else {
      return {};
    }
  },
  outerStyle: function() {
    if (this.props.height) {
      return {
        top: $('#banner-wrapper').outerHeight(),
      };
    } else {
      return {};
    }
  },

  className: function() {
    var className = "modal";
    if (this.props.className) {
      className += " " + this.props.className;
    }
    return className;
  },

  removeHash: function() {
    if(this.props.hasHash) {
      window.location.hash = '';
    }
  },

  onKeyDown: function(event) {
    // if key is escape
    if(event.keyCode == 27) {
      this.removeHash();
    }
  },

  content: function() {
    if (this.state.rendered) {
      return this.props.content;
    }
  },

  render: function () {
    return (
      <div className={this.className()} id={this.props.id} tabIndex="-1" data-backdrop="static"  onKeyDown={this.onKeyDown} style={this.outerStyle()}>
        <div className="modal-dialog modal-lg" style={this.styles()}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeHash}><i className="mdi-content-clear"></i></button>
                <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">{this.content()}</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
