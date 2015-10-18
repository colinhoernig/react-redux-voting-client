import React from 'react/addons';
import ReactDOM from 'react-dom';
import { List } from 'immutable';
import Voting from '../../src/components/Voting';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Jeremy Jones', 'Alex Andrews']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Jeremy Jones');
    expect(buttons[1].textContent).to.equal('Alex Andrews');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['Jeremy Jones', 'Alex Andrews']} vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Jeremy Jones');
  });

  it('disabled buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Jeremy Jones', 'Alex Andrews']}
              hasVoted='Jeremy Jones' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['Jeremy Jones', 'Alex Andrews']}
              hasVoted='Jeremy Jones' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner='Jeremy Jones' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Jeremy Jones');
  });

  it('renders as a pure component', () => {
    const pair = ['Jeremy Jones', 'Alex Andrews'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Jeremy Jones');

    pair[0] = 'Travis Rice';
    component.setProps({ pair: pair });
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Jeremy Jones');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Jeremy Jones', 'Alex Andrews');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Jeremy Jones');

    const newPair = pair.set(0, 'Travis Rice');
    component.setProps({ pair: newPair });
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Travis Rice');
  });

});
