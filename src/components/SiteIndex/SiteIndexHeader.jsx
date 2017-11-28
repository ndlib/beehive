
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardTitle, CardMedia } from 'material-ui'
var MediaQuery = require('react-responsive')

var SiteIndexHeader = createReactClass({

  render: function () {
    return (
      <div>
        <MediaQuery minWidth={650}>
          <Card style={{ height:'40vh', position:'relative', marginTop:'50px', left:'0', right:'0' }} className='heightFix' >
            <CardMedia className='collectionscover'
              style={{ height:'100%' }}
              overlayContentStyle={{ background:'transparent', position:'static' }}
              overlay={<CardTitle
                // Some of the styles for the banner display are in the .css file due to nesting complications
                title='Digital Collections'
                titleStyle={{
                  height:'0',
                  backgroundImage: 'url(' + '/images/dec.logo.svg' + ')',
                  backgroundSize:'cover',
                  backgroundRepeat:'none',
                  overflow:'hidden',
                  position:'absolute',
                  paddingTop:'132px',
                  width:'400px',
                  left:'60px',
                  top:'60px',
                }}
                subtitle='Powered by HoneyComb'
                subtitleStyle={{
                  height:'0',
                  backgroundImage: 'url(' + '/images/powered.png' + ')',
                  backgroundSize:'cover',
                  overflow:'hidden',
                  position:'absolute',
                  paddingTop:'57px',
                  width:'200px',
                  right:'60px',
                  bottom:'40px',
                }}
              />}
            >
              <div className='coverImage'><img src='/images/home.jpg' /></div>
            </CardMedia>
          </Card>
        </MediaQuery>
        <MediaQuery maxWidth={650}>
          <Card style={{ height:'40vw', position:'relative', left:'0', right:'0' }} className='heightFix'>
            <CardMedia className='collectionscover'
              style={{ height:'100%' }}
              overlayContentStyle={{ background:'transparent', position:'static' }}
              overlay={<CardTitle
                // Some of the styles for the banner display are in the .css file due to nesting complications
                title='Digital Exhibits and Collections'
                titleStyle={{
                  height:'0',
                  backgroundImage: 'url(' + '/images/dec.logo.svg' + ')',
                  backgroundSize:'cover',
                  backgroundRepeat:'none',
                  overflow:'hidden',
                  position:'absolute',
                  paddingTop:'31vw',
                  width:'94vw',
                  top: '3vw',
                  left:'3vw',
                  paddingRight: '60px',
                }}
              />}
            >
              <div className='coverImage'><img src='/images/home.jpg' /></div>
            </CardMedia>
          </Card>
        </MediaQuery>
      </div>
    )
  },
})

module.exports = SiteIndexHeader
