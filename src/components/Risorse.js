
import React from 'react';
import '../styles/Risorse.css';
import ChartDataRis2a from './risorseChart/ChartDataRis2a';
import ChartDataRis2b from './risorseChart/ChartDataRis2b';
import ChartDataRis2c from './risorseChart/ChartDataRis2c';

function Risorse({ dateRange, appezzamento, tipoDiColtura }) {
  return (
    <div className="risorse-section">
      <h3 className="risorse-title">2 - RISORSE: Analisi di efficienza</h3>
      <div className="risorse-graphs">
      <ChartDataRis2a 
          dateRange={dateRange} 
          appezzamento={appezzamento} 
          tipoDiColtura={tipoDiColtura} 
        />
        <ChartDataRis2b
          dateRange={dateRange} 
          appezzamento={appezzamento} 
          tipoDiColtura={tipoDiColtura} 
        />
        <ChartDataRis2c
          dateRange={dateRange} 
          appezzamento={appezzamento} 
          tipoDiColtura={tipoDiColtura} 
        />
      </div>
    </div>
  );
}

export default Risorse;
