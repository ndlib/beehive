//app/assets/javascripts/components/layout/PageContent.jsx
var React = require('react');
var mui = require('material-ui');

var PageContent = React.createClass({
  render: function() {
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = PageContent;
