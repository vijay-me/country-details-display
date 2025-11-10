import React from 'react';
import CountryTable from './components/CountryTable';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Country Details Display</h1>
        <p>Explore country information from around the world</p>
      </header>
      <main className="app-main">
        <CountryTable />
      </main>
      <footer className="app-footer">
        <p>Data provided by <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">REST Countries API</a></p>
      </footer>
    </div>
  );
}

export default App;
