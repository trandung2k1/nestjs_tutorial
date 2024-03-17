import { useState } from 'react';
import axios from 'axios';
const App = () => {
    const [order, setOrder] = useState();
    const fetchData = async () => {
        const res = await axios.get('http://localhost:3000');
        if (res.data) {
            setOrder(res.data);
            const eventSource = new EventSource(`http://localhost:3000/sse`);
            eventSource.onmessage = ({ data }) => {
                console.log(data);
                eventSource.close();
            };
        }
    };
    console.log(order);
    return (
        <div>
            <button onClick={() => fetchData()}>Create Order</button>
        </div>
    );
};

export default App;
