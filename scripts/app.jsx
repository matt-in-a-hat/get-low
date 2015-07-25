'use strict';

var React = require('react/addons'),
  Game = require('./game.jsx'),
  gameContainer = document.getElementById('container');

/* render the virtual room app */
window.Room = React.render(
  <Game />,
  gameContainer);

document.getElementsByTagName("body")[0]
  .addEventListener("keypress", window.Room.OnKeyDown)
