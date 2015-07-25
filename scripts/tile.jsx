
var React = require('react')

var TileView = React.createClass({

  render: function () {
    var player
    if (this.props.playerImg) {
      player = (<img className="player" src={ this.props.playerImg }/>)
    }
    return (<div className="tile">
      <img src={ this.props.data.img }/>
      {player}
    </div>)
  }
})

module.exports = TileView
