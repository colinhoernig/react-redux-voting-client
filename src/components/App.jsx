import React from 'react';
import { List, Map } from 'immutable';

const pair = List.of('Jeremy Jones', 'Alex Andrews');
const tally = Map({ 'Jeremy Jones': 5, 'Alex Andrews': 3 });

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, { pair: pair, tally: tally });
  }
});
