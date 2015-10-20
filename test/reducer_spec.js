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

});
