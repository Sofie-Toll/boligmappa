import React, { useEffect, useState } from 'react';
import './App.css';

type HealthResponse = {
  status: string;
  service: string;
};

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`Backend call failed with status ${response.status}`);
        }

        const data = (await response.json()) as HealthResponse;
        setHealth(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      }
    };

    loadHealth();
  }, []);

  return (
    <div className="App">
      <main className="App-main">
        <h1>Fullstack Starter</h1>
        <p>Frontend (React + TypeScript) is connected to backend (.NET 8 Web API).</p>
        <div className="status-card">
          {error ? (
            <p className="error">Connection failed: {error}</p>
          ) : health ? (
            <p className="ok">
              API status: {health.status} ({health.service})
            </p>
          ) : (
            <p>Checking backend connection...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
