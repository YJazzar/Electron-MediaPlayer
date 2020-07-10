
import * as React from 'react';
import * as ReactDOM from 'react-dom';

console.log("This works?");

const Index = () => {
    return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('app'));