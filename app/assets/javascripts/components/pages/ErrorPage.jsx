var React = require('react');

var ErrorPage = React.createClass({
  displayName: 'Error Page',

  render: function() {
    var url = window.location.origin;
    return (
    <div>
      <Layout>
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
      </Layout>
    </div>
    );
  }

});
module.exports = ErrorPage;
