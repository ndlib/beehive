var React = require('react');

var ErrorPage = React.createClass({
  displayName: 'Error Page',

  render: function() {
    return (
    <div>
      <Layout>
        <PageHeader branding={true} />
        <PageContent>
          <div className="row row-fluid">
              <div className="col-lg-12 bee-page-content">
                <div className="row">
                  <div className="col-sm-12">
                    <h1>Oops!</h1>
                    <p>There doesn't appear to be anything here at the moment.</p>
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
