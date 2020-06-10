import React from 'react';
import ReactDOM from 'react-dom';

console.log("Creating website with react!!");

class App extends React.Component {
    render() {
        return <div><h2>Hello Electrate</h2></div>;
    }
}

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app-load-point'));
};