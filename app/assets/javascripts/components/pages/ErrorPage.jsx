var React = require('react');

var ErrorPage = React.createClass({
  displayName: 'Error Page',

  render: function() {
    var url = window.location.href;
    return (
    <div>
      <Layout>
        <PageHeader branding={true} />
        <PageContent>
          <div className="row row-fluid">
              <div className="col-lg-12 bee-page-content">
                <div className="row">
                  <div className="col-sm-12">
                    <p>There is nothing to see here at {url}.</p>
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
