
var React = require('react')
var Tile = require('./tile.jsx')
var clone = require('clone')

var GameView = React.createClass({
  getDefaultProps: function () {

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
    var MOVE_COUNT = 4

    var keyToAction = {
      97: players.jump,
      115: players.running,
      100: players.slide
    }

    return {
      tiles: tiles,
      MOVE_COUNT: MOVE_COUNT,
      keyToAction: keyToAction
    }
  },

  getInitialState: function () {

    var levels = []
    var tiles = this.props.tiles

    for (var i = 0; i < this.props.MOVE_COUNT; i++) {
      var tile = tiles[Math.floor(Math.random() * tiles.length) % tiles.length]
      levels.push(clone(tile))
    }

    return {
      levels: levels,
      playerPosition: 0
    }
  },

  OnKeyDown: function (e) {
    var levels = this.state.levels
    var level = levels[this.state.playerPosition]
    var playerAction = this.props.keyToAction[e.keyCode]
    var win = level.win === playerAction

    var playerImg = win ? level.win : level.lose

    if (win) {
      this.setState({
        playerImg: playerImg,
        playerPosition: this.state.playerPosition + 1
      })
    } else {
      // this.resetLevel(levels)
      this.setState({
        playerImg: playerImg,
        playerPosition: 0
      })
    }
  },

  // resetLevel: function (levels) {
  // },

  render: function () {

    var tiles = this.state.levels.map(function (item, i) {
        var playerImg
        if (i === this.state.playerPosition - 1 && this.state.playerImg) {
          playerImg = this.state.playerImg
        }
        return (<Tile data={ item } playerImg={ playerImg }></Tile>)
      }.bind(this))

    return (<div onKeyDown={ this.OnKeyDown }>
      {{ tiles }}

    </div>)
  }
})

module.exports = GameView
