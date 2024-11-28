import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const useLineChartData = (serverUrl: string) => {
    const [data, setData] = useState<{ time: string; value: number }[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(serverUrl, {
            path: "/socket.io",
            transports: ["polling", "websocket"]
        });
        setSocket(socketInstance);

        socketInstance.on('connect', () => console.log('Connected to Socket.IO server'));
        socketInstance.on('connect_error', (err) => console.error('Connection error:', err));

        // Listen for line chart data
        socketInstance.on('lineChartData', (newData) => {
            setData(newData);
        });

        socketInstance.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    return data;
};

export default useLineChartData;
