
var React = require('react'),
  Tile = require("./tile.jsx")

var GameView = React.createClass({
  getInitialState: function () {
    var players = {
      jump: '/images/player_jump.png',
      running: '/images/player_running.png',
      slide: '/images/player_slide.png'
    }
    var tiles = [
      {
        img: '/images/tile_ground.png',
        win: players.running,
        lose: players.slide // FIX IMG
      },
      {
        img: '/images/tile_jumpblock.png',
        win: players.jump,
        lose: players.slide // FIX IMG
      },
      {
        img: '/images/tile_duck_under.png',
        win: players.slide,
        lose: players.running // FIX IMG
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
