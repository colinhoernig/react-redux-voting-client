import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Jeremy Jones', 'Alex Andrews'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="Jeremy Jones" />,
  document.getElementById('app')
);
