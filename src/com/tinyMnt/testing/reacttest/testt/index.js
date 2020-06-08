
console.log("Started custom react");

const e = React.createElement;

class App extends React.Component {
    render() {
        return <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);