'use strict'
var React = require('react');
var mui = require('material-ui');

var PageHeader = require('../../layout/PageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');

var ErrorPage = React.createClass({
  mixins: [
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  render: function() {
    var url = window.location.origin;
    return (
    <mui.AppCanvas>
      <PageHeader branding={true} />
      <PageContent>
        <div className="row row-fluid">
            <div className="col-lg-12 bee-page-content">
              <div className="row">
                <div className="col-sm-12">
                  <div className="errorframe">
                  <h1>Oops!</h1>
                  <p>There doesn't appear to be anything here at the moment.</p>
                  <p><a href={url}>Try the Digital Exhibits and Collections homepage.</a></p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </PageContent>
    </mui.AppCanvas>
    );
  }

});
module.exports = ErrorPage;
