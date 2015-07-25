
var React = require('react')
var Tile = require('./tile.jsx')
var ExpectedControls = require('./expected-controls.jsx')

var GameView = React.createClass({
  getDefaultProps: function () {

    var players = {
      jump: '/images/player_jump.png',
      running: '/images/player_running.png',
      slide: '/images/player_slide.png',
      jumpSlide: '/images/player_diagonal_slide.png',
      slideLose: '/images/player_slide_lose.png',
      wallLose: '/images/player_wall_lose.png'
    }
    var tiles = [
      {
        img: '/images/tile_ground.png',
        win: players.running,
        lose: players.slideLose,
        keycode: 115
      },
      {
        img: '/images/tile_jumpblock.png',
        win: players.jump,
        lose: players.wallLose,
        keycode: 97
      },
      {
        img: '/images/tile_duck_under.png',
        win: players.slide,
        lose: players.wallLose,
        keycode: 100
      },
      {
        img: '/images/tile_diagonal_slide.png',
        win: players.jumpSlide,
        lose: players.slideLose,
        keycode: 102
      }
    ]
    var MOVE_COUNT = 4

    var keyToAction = {
      97: players.jump,
      115: players.running,
      100: players.slide,
      102: players.jumpSlide
    }

    return {
      tiles: tiles,
      MOVE_COUNT: MOVE_COUNT,
      keyToAction: keyToAction,
      players: players
    }
  },

  getInitialState: function () {

    var levels = []
    var tiles = this.props.tiles

    levels.push(tiles[0])

    for (var i = 0; i < this.props.MOVE_COUNT; i++) {
      var tile = tiles[Math.floor(Math.random() * tiles.length) % tiles.length]
      levels.push(tile)
    }

    levels.push(tiles[0])

    return {
      playerImg: this.props.players.running,
      levels: levels,
      playerPosition: 1
    }
  },

  resetLevel: function () {
      this.setState({
        playerImg: this.props.players.running,
        playerPosition: 1
      })
  },

  OnKeyDown: function (e) {
    var level
    var playerPosition = this.state.playerPosition
    if (this.state.reset) {
      level = this.state.levels[0]
      playerPosition = 0
    } else {
      var levels = this.state.levels
      level = levels[playerPosition]
    }
    var playerAction = this.props.keyToAction[e.keyCode]
    var win = level.win === playerAction

    var playerImg = win ? level.win : level.lose

    if (win) {
      if (playerPosition > this.props.MOVE_COUNT) {
        this.resetLevel()
      } else {
        this.setState({
          playerImg: playerImg,
          playerPosition: playerPosition + 1,
          reset: false
        })
      }
    } else {
      this.setState({
        playerImg: playerImg,
        playerPosition: playerPosition + 1,
        reset: true
      })

      console.debug("restart game!")
    }
  },

  render: function () {
    var nextKeyCode = this.state.levels[this.state.playerPosition].keycode


    var tiles = this.state.levels.map(function (item, i) {
        var playerImg
        if (i === this.state.playerPosition - 1 && this.state.playerImg) {
          playerImg = this.state.playerImg
        }
        return (<Tile data={ item } playerImg={ playerImg }></Tile>)
      }.bind(this))

    return (<div className="tile-wrapper">

      <div className="tiles">
      {{ tiles }}
      </div>

      <ExpectedControls keycode={ nextKeyCode } ></ExpectedControls>

    </div>)
  }
})

module.exports = GameView
