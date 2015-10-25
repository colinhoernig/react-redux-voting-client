/**
 * The exported reducer function takes a state object and action,
 * and modifies the state and returns the updated state.
 */

import { Map, List } from 'immutable';

/**
 * Update state by merging another state object
 */
function setState(state, newState) {
  return state.merge(newState);
}

/**
 * Vote for a specific entry
 */
function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  }
  return state;
}

/**
 * Reset the vote
 */
function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], new List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  }
  return state;
}

/**
 * Main reducer function takes a state and action, and modifies
 * the state, returning the updated state.
 */
export default function(state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
