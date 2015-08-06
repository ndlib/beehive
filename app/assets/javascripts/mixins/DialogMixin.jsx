var mui = require("material-ui");
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var DialogMixin = {
  okDismiss: function() {
    return [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.dismissMessage}
      />
    ];
  },

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.showDisplayItemWindow);
  },

  getInitialState: function () {
    return {
      displayWindowActive: false,
      currentItem: null,
    };
  },

  showDisplayItemWindow: function(item) {
    console.log("DISPLAY WINDOW");
    this.setState({
      displayWindowActive: true,
      currentItem: item
    });
    this.refs.itemDialogWindow.show();
  },

  dismissMessage: function() {
    this.hideDisplayItemWindow();
  },

  hideDisplayItemWindow: function() {
    this.setState({
      displayWindowActive: false,
    });
    this.refs.itemDialogWindow.dismiss();
  },

  dialogWindowStyle: function() {
    return {
      backgroundColor: 'black',
      top: '86px',
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
        contentStyle={{
          width: '100%',
          maxWidth: '100%'
        }}
        bodyStyle={{
          color: 'white',
          backgroundColor: 'black',
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
