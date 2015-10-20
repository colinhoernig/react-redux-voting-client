import React from 'react/addons';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { Results } from '../../src/components/Results';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Jeremy Jones', 'Alex Andrews');
    const tally = Map({ 'Jeremy Jones': 5 });
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [jeremy, alex] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(jeremy).to.contain('Jeremy Jones');
    expect(jeremy).to.contain('5');
    expect(alex).to.contain('Alex Andrews');
    expect(alex).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Jeremy Jones', 'Alex Andrews');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Jeremy Jones'
               pair={['Jeremy Jones', 'Alex Andrews']}
               tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Jeremy Jones');
  });

});
