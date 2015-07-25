'use strict';

var React = require('react/addons'),
  Game = require('./game.jsx'),
  gameContainer = document.getElementById('container');


/* render the virtual room app */
window.Room = React.render(
  <Game />,
  gameContainer);
