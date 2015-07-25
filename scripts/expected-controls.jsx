var React = require('react')

var ExpectedControls = React.createClass({
  render: function() {
    var keyName = String.fromCharCode(this.props.keycode)
    return (<div className="expected-controls">
      <p>{{ keyName }}</p>
      </div>)
  }
})

module.exports = ExpectedControls
