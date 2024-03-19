import { useEffect } from 'react';
const App = () => {
    const socket = new WebSocket('ws://localhost:8080', ['Haha']);
    useEffect(() => {
        socket.onopen = function () {
            console.log('Connected');
            socket.send(
                JSON.stringify({
                    event: 'events',
                    data: 'test',
                }),
            );
            socket.onmessage = function (data) {
                console.log(data.data);
            };
        };
    }, []);

    return <div>App</div>;
};

export default App;
