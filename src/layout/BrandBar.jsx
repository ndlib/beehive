import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var MediaQuery = require("react-responsive");

var BrandBar = createReactClass({

  render: function() {
    return (
      <MediaQuery minWidth={650}>
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
      </MediaQuery>
    );
  }

});

module.exports = BrandBar;
