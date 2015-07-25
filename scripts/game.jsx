
var React = require('react'),
  Tile = require("./tile.jsx")

var GameView = React.createClass({
  getInitialState: function () {
    var players = {
      jump: '/images/jump.png',
      run: '/images/run.png',
      runIntoWall: '/images/runIntoWall.png'
    }
    var tiles = [
      {
        img: '/images/tile1.png',
        win: players.jump,
        lose: players.runIntoWall
      }
    ]

    var level = []
    var MOVE_COUNT = 4

    for (var i = 0; i < MOVE_COUNT; i++) {
      level.push(tiles[Math.floor(Math.random() * tiles.length) % tiles.length])
    }

    return {
      tiles: tiles,
      level: level,
      playerPosition: 0,
      MOVE_COUNT: MOVE_COUNT
    }
  },

  render: function () {

    var tiles = this.state.level.map(function (item) {
        return (<Tile data={ item }></Tile>)
      })

    return (<div>
      {{ tiles }}

    </div>)
  }
})

module.exports = GameView
