import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './connection.css';

function Connection() {
    const navigate = useNavigate();
    const HostRef = useRef();
    const PortRef = useRef();
    const DatabaseRef = useRef();
    const UsernameRef = useRef();
    const PasswordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const connectionDetails = {
            host: HostRef.current.value,
            port: parseInt(PortRef.current.value),
            user: UsernameRef.current.value,
            password: PasswordRef.current.value,
            database: DatabaseRef.current.value,
        };

        try {
            const res = await fetch('http://localhost:5000/test-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connectionDetails),
            });

            const data = await res.json();

            if (res.ok) {
                // Save connection info in local storage (optional)
                alert('Database connection successful');
                localStorage.setItem('db_config', JSON.stringify(connectionDetails));
                navigate('/main');
            } else {
                alert('Database connection failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to backend');
        }
    };

    return (
        <div className="connection">
            <form onSubmit={handleSubmit}>
                <h1>DATABASE CONNECTION DETAILS</h1>

                <div className="form-group-connection">
                    <label htmlFor="host">HOST NAME</label>
                    <input type="text" id="host" ref={HostRef} required />
                </div>

                <div className="form-group-connection">
                    <label htmlFor="port">PORT</label>
                    <input type="number" id="port" ref={PortRef} required />
                </div>

                <div className="form-group-connection">
                    <label htmlFor="username">USERNAME</label>
                    <input type="text" id="username" ref={UsernameRef} required />
                </div>

                <div className="form-group-connection">
                    <label htmlFor="database">DATABASE NAME</label>
                    <input type="text" id="database" ref={DatabaseRef} required />
                </div>

                <div className="form-group-connection">
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" id="password" ref={PasswordRef} required />
                </div>

                <button type="submit" className="primary-button">Connect</button>
            </form>
        </div>
    );
}

export default Connection;
