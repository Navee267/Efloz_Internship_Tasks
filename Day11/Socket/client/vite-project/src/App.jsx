import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    socket.on('updateCounter', (value) => {
      setCounter(value);
    });

    return () => {
      socket.off('updateCounter');
    };
  }, []);

  const increment = () => {
    socket.emit('increment');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>🔁 Real-time Counter</h1>
      <h2>{counter}</h2>
      <button
        onClick={increment}
        style={{ fontSize: 20, padding: '10px 20px' }}
      >
        Increment
      </button>
    </div>
  );
}

export default App;