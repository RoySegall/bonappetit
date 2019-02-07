import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from '../Home';
import * as TestUtils from 'react-dom/test-utils';

it('can render and update a counter', () => {
    // Render App in the document
    const appElement: any = TestUtils.renderIntoDocument(
        <Home/>
    );

    const appNode = ReactDOM.findDOMNode(appElement);

    console.log(appNode);

    // Verify text content
    expect(appNode.textContent).toContain('Find out something to cook');
});
