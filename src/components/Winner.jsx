import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="winner">
      {this.props.winner} wins!
    </div>;
  }
});
