import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// pure/dump component, fully driven by props.
// component equivalent of a pure funnction
export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>
  }
});

// map state from redux store into an object of props, which then merge into
// props of the component that is being connected
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

// connect/smart component, pure component wrapped with logic to maintian
// sync with Redux store (provided by react-redux)
export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
