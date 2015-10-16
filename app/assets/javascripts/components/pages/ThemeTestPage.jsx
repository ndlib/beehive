'use strict'
var React = require('react');
var mui = require('material-ui');

// There are apparently two version of Menu floating around in
// material-ui, so we need to specify this is the version we want.
var Menu = require('material-ui/lib/menus/menu');
var MenuDivider = require('material-ui/lib/menus/menu-divider');
var MenuItem = require('material-ui/lib/menus/menu-item');

var ThemeTestPage = React.createClass({
  mixins: [MuiThemeMixin],

  d: function() {
    return {
      margin: '1em',
    };
  },

  appbar: function() {
    return (
      <mui.AppBar
        title="Title"
        iconClassNameRight="expand_more" />
    );
  },

  avatars: function() {
    return (
      <div style={this.d()}>
        <h4>Avatars</h4>
        <div style={this.d()}>
          <mui.Avatar src="/assets/home.jpg" />
        </div>
        <div style={this.d()}>
          <mui.Avatar
          icon={
            <mui.FontIcon className="material-icons" >voicemail</mui.FontIcon>
          } />
        </div>
        <div style={this.d()}>
          <mui.Avatar>A</mui.Avatar>
        </div>
      </div>
    );
  },

  buttons: function() {
    return (
      <div style={this.d()}>
        <h4>Buttons</h4>
        <div className="col-sm-4">
          <h5>Flat Buttons</h5>
          <div style={this.d()}>
            <mui.FlatButton label="Default" />
          </div>
          <div style={this.d()}>
            <mui.FlatButton label="Primary" primary={true} />
          </div>
          <div style={this.d()}>
            <mui.FlatButton label="Secondary" secondary={true} />
          </div>
          <div style={this.d()}>
            <mui.FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">
              <mui.FontIcon className="material-icons" style={this.darkIconStyle()} >favorite</mui.FontIcon>
            </mui.FlatButton>
          </div>
          <div style={this.d()}>
            <mui.FlatButton label="Disabled" disabled={true} />
          </div>
        </div>
        <div className="col-sm-4">
          <h5>Raised Buttons</h5>
          <div style={this.d()}>
            <mui.RaisedButton label="Default" />
          </div>
          <div style={this.d()}>
            <mui.RaisedButton label="Primary" primary={true} />
          </div>
          <div style={this.d()}>
            <mui.RaisedButton label="Secondary" secondary={true} />
          </div>
          <div style={this.d()}>
            <mui.RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">
              <mui.FontIcon className="material-icons" style={this.lightIconStyle()} >favorite</mui.FontIcon>
            </mui.RaisedButton>
          </div>
          <div style={this.d()}>
            <mui.RaisedButton label="Disabled" disabled={true} />
          </div>
        </div>
        <div className="col-sm-4">
          <h5>Floating Action Buttons</h5>
          <div style={this.d()}>
            <mui.FloatingActionButton>
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
          <div style={this.d()}>
            <mui.FloatingActionButton mini={true} >
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
          <div style={this.d()}>
            <mui.FloatingActionButton secondary={true} >
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
          <div style={this.d()}>
            <mui.FloatingActionButton secondary={true} mini={true} >
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
          <div style={this.d()}>
            <mui.FloatingActionButton disabled={true} >
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
          <div style={this.d()}>
            <mui.FloatingActionButton disabled={true} mini={true} >
              <mui.FontIcon className="material-icons">grade</mui.FontIcon>
            </mui.FloatingActionButton>
          </div>
        </div>
      </div>
    );
  },

  cards: function() {
    var card = ( <mui.Card>
            <mui.CardHeader
              title="Title"
              subtitle="Subtitle"
              avatar={<mui.Avatar>A</mui.Avatar>}/>
            <mui.CardMedia overlay={<mui.CardTitle title="Title" subtitle="Subtitle"/>}>
              <img src="/assets/home.jpg"/>
            </mui.CardMedia>
            <mui.CardTitle title="Title" subtitle="Subtitle"/>
            <mui.CardActions>
              <mui.FlatButton primary={true} label="Action1"/>
              <mui.FlatButton label="Action2"/>
            </mui.CardActions>
            <mui.CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </mui.CardText>
          </mui.Card>);
    return (
      <div style={{clear: 'both',}}>
        <div style={this.d()}>
          <h4>Cards</h4>
          <div style={this.d()}>
            {card}
          </div>
          <div className="row row-fluid " style={this.d()}>
            <div className="col-sm-4">
              {card}
            </div>
            <div className="col-sm-4">
              {card}
            </div>
            <div className="col-sm-4">
              {card}
            </div>
          </div>
        </div>
      </div>
    );
  },

  dialog: function() {
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', ref: 'submit' }
    ];
    return (
      <div style={this.d()}>
        <h4>Dialog</h4>
        <mui.FlatButton
          label="Show Dialog"
          onClick={this.showDialog}
        />
        <div style={this.d()}>
          <mui.Dialog
            ref='dialog'
            title="Dialog With Standard Actions"
            actions={standardActions}
            actionFocus="submit"
            modal={false}>
            The actions in this window are created from the json that's passed in.
          </mui.Dialog>
        </div>
      </div>
    );
  },

  showDialog: function() {
    this.refs.dialog.show();
  },

  dropdownMenu: function() {
    var menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    return (
      <div style={this.d()}>
        <h4>DropDown Menu</h4>
        <div style={this.d()}>
          <mui.DropDownMenu menuItems={menuItems} />
        </div>
      </div>
    );
  },

  icons: function() {
    return (
      <div style={this.d()}>
        <h4>Icons</h4>
        <div style={this.d()}>
          <mui.FontIcon className="material-icons">home</mui.FontIcon>
        </div>
      </div>
    );
  },

  iconButtons: function() {
    return (
      <div style={this.d()}>
        <h4>Icon Buttons</h4>
        <div style={this.d()}>
          <mui.IconButton tooltip="grade">
            <mui.FontIcon className="material-icons">grade</mui.FontIcon>
          </mui.IconButton>
        </div>
        <div style={this.d()}>
          <mui.IconButton tooltip="grade" disabled={true}>
            <mui.FontIcon className="material-icons">grade</mui.FontIcon>
          </mui.IconButton>
        </div>
      </div>
    );
  },

  leftNav: function() {
    var menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: mui.MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         type: mui.MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];


    return (
      <div style={this.d()}>
        <h4>Left Nav</h4>
        <mui.FlatButton label="Toggle" primary={true} onClick={this.leftNavOnClick}/>
        <mui.LeftNav ref="leftNav" menuItems={menuItems} openRight={true}/>
      </div>
    );
  },

  leftNavOnClick: function() {
    this.refs.leftNav.toggle();
  },

  lists: function() {
    return (
    <div style={this.d()}>
        <h4>Lists</h4>
        <div style={this.d()}>
          <mui.List>
            <mui.ListItem primaryText="Inbox" />
            <mui.ListItem primaryText="Starred"/>
            <mui.ListItem primaryText="Sent mail" />
            <mui.ListItem primaryText="Drafts" />
            <mui.ListDivider />
            <mui.ListItem primaryText="Inbox" secondaryText="Secondary Text" />
          </mui.List>
        </div>
      </div>
    );
  },

  menus: function() {
    return (
      <div style={this.d()}>
        <h4>Menus</h4>
        <div style={{minHeight: '270px', position: 'relative'}}>
          <div style={{left: '190px', position: 'absolute',}}>
            <Menu desktop={true} width={320}>
              <MenuItem primaryText="Bold" secondaryText="&#8984;B" />
              <MenuItem primaryText="Italic" secondaryText="&#8984;I" />
              <MenuItem primaryText="Underline" secondaryText="&#8984;U" />
              <MenuItem primaryText="Strikethrough" secondaryText="Alt+Shift+5" />
              <MenuItem primaryText="Superscript" secondaryText="&#8984;." />
              <MenuItem primaryText="Subscript" secondaryText="&#8984;," />
              <MenuDivider />
              <MenuItem primaryText="Clear formatting" secondaryText="&#8984;/" />
            </Menu>
          </div>
        </div>
      </div>
    );
  },

  progress: function() {
    return (
      <div style={this.d()}>
        <h4>Progress</h4>
        <div style={this.d()}>
          <mui.LinearProgress mode="determinate" value={60} />
        </div>
        <div style={this.d()}>
          <mui.LinearProgress mode="indeterminate"  />
        </div>
        <div style={this.d()}>
          <mui.CircularProgress mode="determinate" value={60} />
          <mui.CircularProgress mode="determinate" value={60} size={1.5} />
          <mui.CircularProgress mode="determinate" value={60} size={2} />
          <mui.CircularProgress mode="indeterminate" />
          <mui.CircularProgress mode="indeterminate" size={1.5} />
          <mui.CircularProgress mode="indeterminate" size={2} />
        </div>
      </div>
    );
  },

  refreshIndicator: function() {
    return (
      <div style={this.d()}>
        <h4>Refresh Indicator</h4>
        <div style={{minHeight: '60px', marginTop: '20px', position:'relative'}}>
          <mui.RefreshIndicator percentage={30} size={40} left={10} top={5} status="ready" />
          <mui.RefreshIndicator percentage={60} size={40} left={80} top={5} status="ready" />
          <mui.RefreshIndicator percentage={80} size={40} left={150} top={5} status="ready" />
          <mui.RefreshIndicator percentage={100} size={40} left={220} top={5} status="ready" />
          <mui.RefreshIndicator size={40} left={300} top={5} status="loading" />
        </div>
      </div>
    );
  },


  table: function() {
    return (
      <mui.Table
        height='300px'
        fixedHeader={true}
        fixedFooter={true}
        selectable={true}
        multiSelectable={true}
      >
        <mui.TableHeader enableSelectAll={true}>
          <mui.TableRow>
            <mui.TableHeaderColumn colSpan="3" tooltip='Super Header' style={{textAlign: 'center'}}>
              Super Header
            </mui.TableHeaderColumn>
          </mui.TableRow>
          <mui.TableRow>
            <mui.TableHeaderColumn tooltip='The ID'>ID</mui.TableHeaderColumn>
            <mui.TableHeaderColumn tooltip='The Name'>Name</mui.TableHeaderColumn>
            <mui.TableHeaderColumn tooltip='The Status'>Status</mui.TableHeaderColumn>
          </mui.TableRow>
        </mui.TableHeader>
      <mui.TableBody
        deselectOnClickaway={true}
        showRowHover={true}
        stripedRows={true}
      >
        <mui.TableRow selected={true}>
          <mui.TableRowColumn>1</mui.TableRowColumn>
          <mui.TableRowColumn>John Smith</mui.TableRowColumn>
          <mui.TableRowColumn>Employed</mui.TableRowColumn>
        </mui.TableRow>
        <mui.TableRow>
          <mui.TableRowColumn>2</mui.TableRowColumn>
          <mui.TableRowColumn>Randal White</mui.TableRowColumn>
          <mui.TableRowColumn>Unemployed</mui.TableRowColumn>
        </mui.TableRow>
        <mui.TableRow selected={true}>
          <mui.TableRowColumn>3</mui.TableRowColumn>
          <mui.TableRowColumn>Stephanie Sanders</mui.TableRowColumn>
          <mui.TableRowColumn>Employed</mui.TableRowColumn>
        </mui.TableRow>
        <mui.TableRow>
            <mui.TableRowColumn>4</mui.TableRowColumn>
            <mui.TableRowColumn>Steve Brown</mui.TableRowColumn>
            <mui.TableRowColumn>Employed</mui.TableRowColumn>
          </mui.TableRow>
          <mui.TableRow>
            <mui.TableRowColumn>5</mui.TableRowColumn>
            <mui.TableRowColumn>Joyce Whitten</mui.TableRowColumn>
            <mui.TableRowColumn>Employed</mui.TableRowColumn>
          </mui.TableRow>
          <mui.TableRow>
            <mui.TableRowColumn>6</mui.TableRowColumn>
            <mui.TableRowColumn>Samuel Roberts</mui.TableRowColumn>
            <mui.TableRowColumn>Unemployed</mui.TableRowColumn>
          </mui.TableRow>
          <mui.TableRow>
            <mui.TableRowColumn>7</mui.TableRowColumn>
            <mui.TableRowColumn>Adam Moore</mui.TableRowColumn>
            <mui.TableRowColumn>Employed</mui.TableRowColumn>
          </mui.TableRow>
        </mui.TableBody>
        <mui.TableFooter>
          <mui.TableRow>
            <mui.TableRowColumn>ID</mui.TableRowColumn>
            <mui.TableRowColumn>Name</mui.TableRowColumn>
            <mui.TableRowColumn>Status</mui.TableRowColumn>
          </mui.TableRow>
          <mui.TableRow>
            <mui.TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
              Super Footer
            </mui.TableRowColumn>
          </mui.TableRow>
        </mui.TableFooter>
      </mui.Table>
    );
  },

  textFields: function() {

    var arbitraryArrayMenuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    return (
      <div style={this.d()}>
        <h4>Text Fields</h4>
        <div className="col-sm-4">
          <mui.TextField
            hintText="Hint Text" />
          <mui.TextField
            hintText="Hint Text"
            defaultValue="Default Value" />
          <mui.TextField
            hintText="Hint Text (MultiLine)"
            multiLine={true} />
          <mui.TextField
            hintText="The hint text can be as long as you want, it will wrap."
            multiLine={true} />
          <mui.TextField
            hintText="Hint Text"
            errorText="The error text can be as long as you want, it will wrap." />
          <mui.TextField
            hintText="Disabled Hint Text"
            disabled={true} />
          <mui.TextField
            hintText="Disabled Hint Text"
            disabled={true}
            defaultValue="Disabled With Value" />
        </div>
        <div className="col-sm-4">
          <mui.SelectField
            value={1}
            hintText="Hint Text"
            menuItems={arbitraryArrayMenuItems} />
          <mui.SelectField
            floatingLabelText="Float Label Text"
            valueMember="payload"
            displayMember="text"
            menuItems={arbitraryArrayMenuItems} />
        </div>
          <div className="col-sm-4">
          <mui.TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text" />
          <mui.TextField
            hintText="Hint Text"
            defaultValue="Default Value"
            floatingLabelText="Floating Label Text" />
          <mui.TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"/>
          <mui.TextField
            hintText="Hint Text (MultiLine)"
            floatingLabelText="Floating Label Text"
            multiLine={true} />
          <mui.TextField
            hintText="Hint Text"
            errorText="I am error"
            defaultValue="abc"
            floatingLabelText="Floating Label Text" />
          <mui.TextField
            hintText="Disabled Hint Text"
            disabled={true}
            floatingLabelText="Floating Label Text" />
          <mui.TextField
            hintText="Disabled Hint Text"
            disabled={true}
            defaultValue="Disabled With Value"
            floatingLabelText="Floating Label Text" />
          <mui.TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password" />
        </div>
      </div>

    );
  },

  render: function() {
    return (
      <mui.AppCanvas>
        <div className="row row-fluid ">
          <div className="col-sm-12" style={{
            backgroundColor:"#f5f5f5",
            color: "rgba(0, 0, 0, 0.870588)",
            minHeight: "100%",
            width: "100%",
          }}>
            {this.appbar()}
            {this.avatars()}
            {this.buttons()}
            {this.cards()}
            {this.dialog()}
            {this.dropdownMenu()}
            {this.icons()}
            {this.iconButtons()}
            {this.leftNav()}
            {this.lists()}
            {this.menus()}
            {this.progress()}
            {this.refreshIndicator()}
            {this.table()}
            {this.textFields()}
          </div>
        </div>
      </mui.AppCanvas>
    );
  }
});

module.exports = ThemeTestPage;
