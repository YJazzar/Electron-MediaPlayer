import React from 'react';
import ReactDOM from 'react-dom';

console.log("in react class");

class App extends React.Component {
    render() {
        return <div><h2>Hello Electrate</h2></div>;
    }
}


window.onload = () => {
    console.log("adding react");
    ReactDOM.render(<App />, document.getElementById('app'));
};