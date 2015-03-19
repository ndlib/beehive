//app/assets/javascripts/components/modal/Modal.jsx
var React = require('react');

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{__html: this.props.content}} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
