//app/assets/javascripts/components/Section3DScene.jsx
var React = require('react');
var m_app = b4w.require("app");
var m_data = b4w.require("data");

var Section3DScene = React.createClass({
  propTypes: {
    height: React.PropTypes.number.isRequired,
  },

  componentDidMount: function() {
  return;
    m_app.init({
      canvas_container_id: "3d_container_id",
      callback: this.load_cb
    });
  },

  load_cb: function() {
    m_data.load("/courthouse.json", this.loaded_cb);
  },

  loaded_cb: function() {
    m_app.enable_controls();
    m_app.enable_camera_controls();
  },

  style: function() {
    var aspectRatio = 16.0/9.0;
    return {
      height: this.props.height + 'px',
      width: Math.round(this.props.height * aspectRatio) + 'px',
    };
  },

  render: function () {
    return (
      <div>
        <iframe src="/blend4web/webplayer/webplayer.html?load=/courthouse.json&show_fps" style={this.style()}></iframe>
      </div>
    );
  }

});
//  <div id="3d_container_id"  style={ this.style() }></div>
// each file will export exactly one component
module.exports = Section3DScene;
