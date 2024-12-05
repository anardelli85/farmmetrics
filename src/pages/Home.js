// src/pages/Home.js
import React, { useState } from 'react';
import '../styles/Home.css';
import Filtri from '../components/Filtri';
import Produzione from '../components/Produzione';
import Risorse from '../components/Risorse';
import Performance from '../components/Performance';

function Home() {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [selectedAppezzamento, setSelectedAppezzamento] = useState(null);
  const [selectedTipoDiColtura, setSelectedTipoDiColtura] = useState(null);

  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-title">Dashboard</h2>
        <div className="sticky-filters">
        <Filtri
          onDateChange={setDateRange}
          onAppezzamentoChange={setSelectedAppezzamento}
          onTipoDiColturaChange={setSelectedTipoDiColtura}
        />
        </div>
        <Produzione
          dateRange={dateRange}
          appezzamento={selectedAppezzamento}
          tipoDiColtura={selectedTipoDiColtura}
        /> 
        <Risorse
        dateRange={dateRange}
        appezzamento={selectedAppezzamento}
        tipoDiColtura={selectedTipoDiColtura}
      />
      <Performance dateRange={dateRange}
        appezzamento={selectedAppezzamento}
        tipoDiColtura={selectedTipoDiColtura}/>
      </div>
      <footer className="home-footer">
        FarmMetrics sviluppato da Nardelli Antonio matr. 0312301110 © 2024
      </footer>
    </div>
  );
}

export default Home;
