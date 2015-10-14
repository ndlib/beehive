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
    var name = (
      <span style={{fontFamily: 'GPCMed'}}>
        {item.name}
      </span>
    );

    return (
      <div
        className='col-lg-4 col-md-6 col-sm-12'
        style={{marginBottom: '2em',}}>
        <mui.Card
          onClick={this.itemOnClick}
          style={{cursor: 'pointer'}}
        >
          <mui.CardMedia
            overlay={<mui.CardTitle title={name}/>}
          >
            <ItemImage image={item.image} />
          </mui.CardMedia>
          <mui.CardText
            style={{
              padding: '0',
              height: '72px'}}
          >
            <mui.ListItem
              secondaryText={item.description}
              secondaryTextLines={2}
              disabled={true}
            />
          </mui.CardText>
        </mui.Card>
      </div>
    );
  }
});

module.exports = GridItem;