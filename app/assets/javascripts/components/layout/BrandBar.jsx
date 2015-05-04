var React = require('react');

var BrandBar = React.createClass({

  render: function() {
    return (
      <div className="brand-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <a href="http://www.nd.edu">University <i>of</i> Notre Dame</a>
            </div>
            <div className="col-sm-6">
              <a className="pull-right" href="http://library.nd.edu">Hesburgh Libraries</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BrandBar;
