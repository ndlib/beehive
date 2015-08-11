var mui = require("material-ui");
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var FontIcon = mui.FontIcon;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var DialogMixin = {
  okDismiss: function() {
    var fontIcon = (
      <FontIcon
        className={'mdi-content-clear'}
        iconStyle={{
          color: 'white',
        }}
        style={{
          color: 'white',
          padding: '0',
          fontSize: '20px',
        }}
      />
    );
    return [
      <FlatButton
        label={fontIcon}
        primary={true}
        onTouchTap={this.hideWindow}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid white',
          borderRadius: '3px',
          height: '34px',
          padding: '0',
          minHeight: '34px',
          minWidth: '32px',
          opacity: '0.7',
          width: '32px',
        }}
        labelStyle={{
          color: 'white',
          height: '20px',
          padding: '0',
          width: '20px',
        }}
      />
    ];
  },

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.showWindow);
  },

  getInitialState: function () {
    return {
      displayWindowActive: false,
      currentItem: null,
    };
  },

  showWindow: function(item) {
    this.setState({
      displayWindowActive: true,
      currentItem: item
    });
    this.refs.itemDialogWindow.show();
  },

  hideWindow: function() {
    this.setState({
      displayWindowActive: false,
    });
    this.refs.itemDialogWindow.dismiss();
  },

  dialogWindowStyle: function() {
    return {
      backgroundColor: 'black',
      top: '51px',
      zIndex: '1000'
    };
  },

  displayItemWindow: function() {
    return (
      <Dialog
        ref='itemDialogWindow'
        modal={false}
        openImmediately={false}
        style={this.dialogWindowStyle()}
        actions={this.okDismiss()}
        contentClassName='dialog-window'
        contentStyle={{
          width: '100%',
          maxWidth: '100%',
        }}
        bodyStyle={{
          color: 'white',
          backgroundColor: '#333',
          backgroundImage: 'url(/images/black-linen.png)',
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <ItemShow item={this.state.currentItem} height={this.state.height} />
      </Dialog>
    );
  },

}
module.exports = DialogMixin;
