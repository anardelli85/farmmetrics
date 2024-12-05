
// src/components/Produzione.js
import React from 'react';
import '../styles/Produzione.css';
import ChartDataProd1a from './prodChart/chartDataProd1a';
import ChartDataProd1b from './prodChart/chartDataProd1b';
import ChartDataProd1c from './prodChart/chartDataProd1c'; 
import ChartDataProd1d from './prodChart/chartDataProd1d'; 
import TotaleQuantita from './TotaleQuantita';

function Produzione({ dateRange, appezzamento, tipoDiColtura }) {
  return (
    <div className="production-section">
      <h3 className="production-title">1 - PRODUZIONE: Analisi delle Correlazioni con le condizioni meteo</h3>
      <TotaleQuantita />
      <div className="production-graphs">
        <ChartDataProd1a
          dateRange={dateRange}
          appezzamento={appezzamento}
          tipoDiColtura={tipoDiColtura}
        />
        <ChartDataProd1b
          dateRange={dateRange}
          appezzamento={appezzamento}
          tipoDiColtura={tipoDiColtura}
        />
        <ChartDataProd1c dateRange={dateRange} appezzamento={appezzamento} tipoDiColtura={tipoDiColtura} /> 
        <ChartDataProd1d dateRange={dateRange} appezzamento={appezzamento} tipoDiColtura={tipoDiColtura} />
      </div>
    </div>
  );
}

export default Produzione;
