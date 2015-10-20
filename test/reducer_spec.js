import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Jeremy Jones', 'Alex Andrews'),
          tally: Map({ 'Jeremy Jones': 1 })
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    }));
  });

  it('handles SET_STATE with plain JS object payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jeremy Jones', 'Alex Andrews'],
          tally: { 'Jeremy Jones': 1 }
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jeremy Jones', 'Alex Andrews'],
          tally: { 'Jeremy Jones': 1 }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    });
    const action = { type: 'VOTE', entry: 'Jeremy Jones' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      },
      hasVoted: 'Jeremy Jones'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    });
    const action = { type: 'VOTE', entry: 'Travis Rice' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      }
    }));
  });

  it('removes hasVOTED on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones': 1 }
      },
      hasVoted: 'Jeremy Jones'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Travis Rice', 'Joe Sexton']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Travis Rice', 'Joe Sexton']
      }
    }));
  });

});
