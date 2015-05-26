//app/assets/javascripts/components/layout/CollectionOverlayFooter.jsx
var React = require('react');

var CollectionOverlayFooter = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  closeOther: function(target) {
    $(target).modal("hide");
  },

  render: function () {
    return (
      <div>
        <Info collection={this.props.collection} />
        <Copyright />
        <footer id="footer" className="container-fluid">
          <div className="row">
            <div className="col-sm-8 pull-left">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#info" onClick={this.closeOther.bind(this, "#copy")}><i className="mdi-action-info-outline"></i></button>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#copy" onClick={this.closeOther.bind(this, "#info")}><i className="glyphicon glyphicon-copyright-mark"></i></button>
            </div>
            <div className="col-sm-4 pull-right">
              <a href="http://library.nd.edu">
                <img src="/images/ndmark300.w.png" className="hesburgh-logo" alt="University of Notre Dame Hesburgh Libraries" />
              </a>
              <a href="/">
                <img src="/images/dec.logo.svg" className="dec-logo" alt="Digital Exhibits and Collections" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = CollectionOverlayFooter;

