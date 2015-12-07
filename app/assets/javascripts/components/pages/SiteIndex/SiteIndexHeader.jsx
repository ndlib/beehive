'use strict'
var React = require('react');
var mui = require('material-ui');
var MediaQuery = require("react-responsive");

var SiteIndexHeader = React.createClass({

  render: function() {
    return(
      <div>
        <MediaQuery minWidth={650}>
          <mui.Card  style={{height:'40vh', position:'relative', marginTop:'50px', left:'0', right:'0'}} className="heightFix"  >
            <mui.CardMedia className="collectionscover"
              style={{height:'100%'}}
              overlayContentStyle={{background:'transparent', position:'static'}}
              overlay={<mui.CardTitle
                //Some of the styles for the banner display are in the .css file due to nesting complications
                title="Digital Collections"
                titleStyle={{height:'0', backgroundImage: 'url(' + '/images/dec.logo.svg' + ')', backgroundSize:'cover', overflow:'hidden', position:'absolute', paddingTop:'132px', width:'400px', left:'60px;', top:'60px;'}}
                subtitle="Powered by HoneyComb"
                subtitleStyle={{height:'0', backgroundImage: 'url(' + '/images/powered.png' + ')', backgroundSize:'cover', overflow:'hidden', position:'absolute', paddingTop:'57px', width:'200px', right:'60px', bottom:'60px'}}
              />}
              >
              <div className='coverImage'><img src="/images/home.jpg"/></div>
            </mui.CardMedia>
          </mui.Card>
        </MediaQuery>
        <MediaQuery maxWidth={650}>
          <mui.Card style={{height:'300px', position:'relative', left:'0', right:'0'}} className="heightFix">
            <mui.CardMedia className="collectionscover"
              style={{height:'100%'}}
              overlayContentStyle={{background:'transparent', position:'static'}}
              overlay={<mui.CardTitle
                //Some of the styles for the banner display are in the .css file due to nesting complications
                title="Digital Exhibits and Collections"
                titleStyle={{height:'0', backgroundImage: 'url(' + '/images/dec.logo.svg' + ')', backgroundSize:'cover', overflow:'hidden', position:'absolute', paddingTop:'132px', top: "100px", left:'60px;', paddingRight: '60px'}}
              />}
              >
              <div className='coverImage'><img src="/images/home.jpg"/></div>
            </mui.CardMedia>
          </mui.Card>
        </MediaQuery>
      </div>
    )
  }
});

// each file will export exactly one component
module.exports = SiteIndexHeader;
