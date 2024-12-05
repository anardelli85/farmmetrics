
import React from 'react';
import '../styles/Performance.css'; 
import TotalePerformance from './TotalePerformance';
import ChartDataPerformance3a from './performanceChart/ChartDataPerformance3a';
import ChartDataPerformance3b from './performanceChart/ChartDataPerformance3b';

function Performance({ dateRange, appezzamento, tipoDiColtura }) {
  return (
    <div className="performance-section">
      <h3 className="performance-title">3 - PERFORMANCE: Monitoraggio delle Performance Finanziarie</h3>
      <TotalePerformance />
      <div className="performance-graphs">
        
      <ChartDataPerformance3a
        dateRange={dateRange}
        appezzamento={appezzamento}
        tipoDiColtura={tipoDiColtura}
      />

<ChartDataPerformance3b
        dateRange={dateRange}
        appezzamento={appezzamento}
        tipoDiColtura={tipoDiColtura}
      />
      </div>
    </div>
  );
}

export default Performance;
