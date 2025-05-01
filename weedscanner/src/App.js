import React from 'react';
import WeedScanner from './WeedScanner';
import './App.css'; // You might have a separate CSS file for App.js

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src="logo.jpg" alt="Logo" className="app-logo" />
      </header>
      <main className="app-main">
        <WeedScanner /> {/* Render the PlantScanner component here */}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Plant Identification App</p>
      </footer>
    </div>
  );
}

export default App;