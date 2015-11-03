var mui = require("material-ui");
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var DialogWindow = React.createClass({
  mixins: [ LoadRemoteMixin ],

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.showWindow);
    EventEmitter.on("SectionDialogWindow", this.showWindow);
  },

  getInitialState: function () {
    return {
      displayWindowActive: false,
    };
  },

  showWindow: function(item) {
    this.setState({
      displayWindowActive: true,
    });
    this.refs.itemDialogWindow.show();
  },

  hideWindow: function() {
    this.setState({
      displayWindowActive: false,
    });
    this.refs.itemDialogWindow.dismiss();
    window.location.hash = "";
  },

  okDismiss: function() {
    var fontIcon = (
      <mui.FontIcon
        className='material-icons'
        iconStyle={{
          color: 'white',
        }}
        style={{
          color: 'white',
          padding: '0',
          fontSize: '20px',
        }}
      >content_clear</mui.FontIcon>
    );
    return [
      <mui.FlatButton
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
          height: '20px',
          padding: '0',
          width: '20px',
        }}
      />
    ];
  },

  render: function() {
    return (
      <mui.Dialog
        ref='itemDialogWindow'
        modal={false}
        openImmediately={false}
        actions={this.okDismiss()}
        contentClassName='dialog-window'
        contentStyle={{
          width: '100%',
          maxWidth: '100%',
        }}
        bodyStyle={{
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <div>
          {this.props.children}
        </div>
      </mui.Dialog>
    );
  },

})
module.exports = DialogWindow;
