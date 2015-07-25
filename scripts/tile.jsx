
var React = require('react')

var TileView = React.createClass({

  render: function () {
    return (<div className="tile">
    	<img src={ this.props.data.img }/>
    </div>)
  }
})

module.exports = TileView
