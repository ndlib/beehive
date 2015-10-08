//app/assets/javascripts/components/layout/CollectionPageFooter.jsx
var React = require('react');
var mui = require('material-ui');

var CollectionPageFooter = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  closeOther: function(target) {
    $(target).modal("hide");
  },

  render: function () {
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} >
        <footer id="footer" className="container">
          <div className="row">
            <div className="col-lg-12 pull-right">
              <a href="http://library.nd.edu">
                <img src="/images/ndmark300.png" className="hesburgh-logo" alt="University of Notre Dame Hesburgh Libraries" />
              </a>
              <a href="/">
                <img src="/images/dec.logo-brokentoseeit.svg" className="dec-logo" alt="Digital Exhibits and Collections" />
              </a>
            </div>
          </div>
        </footer>
      </mui.Paper>
    );
  }
});

module.exports = CollectionPageFooter;
