'use strict'
var React = require('react');
var mui = require('material-ui');

var GridItem = React.createClass({
  mixins: [MuiThemeMixin, LoadRemoteMixin],
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var item = this.props.item;

    return (
      <div
        className='col-lg-4 col-md-6 col-sm-12'
        style={{marginBottom: '2em',}}>
        <mui.Card
          onClick={this.itemOnClick}
        >
          <mui.CardMedia
            overlay={<mui.CardTitle title={item.name}/>}
          >
            <ItemImage image={item.image} />
          </mui.CardMedia>
        </mui.Card>
      </div>
    );
  }
});

module.exports = GridItem;
