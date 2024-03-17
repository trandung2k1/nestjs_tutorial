import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000', {
    extraHeaders: {
        Authorization: 'Bearer authorization_token_here',
    },
});
const App = () => {
    const [order, setOrder] = useState();
    const eventSource = new EventSource(`http://localhost:3000/sse`);
    const fetchData = async () => {
        const res = await axios.get('http://localhost:3000');
        if (res.data) {
            setOrder(res.data);
            eventSource.onmessage = ({ data }) => {
                console.log(data);
                eventSource.close();
            };
        }
    };

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    console.log('Order: ' + order);
    console.log('Isconnected: ' + isConnected);
    return (
        <div>
            <button onClick={() => fetchData()}>Create Order</button>
        </div>
    );
};

export default App;
