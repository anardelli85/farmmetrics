// src/components/TotalePerformance.js
import React, { useEffect, useState } from 'react';
import data from '../assets/data/simulation_data.json';
import '../styles/TotalePerformance.css';

function TotalePerformance() {
  const [totaleFatturatoAnnoPrecedente, setTotaleFatturatoAnnoPrecedente] = useState(0);
  const [totaleRicaviAnnoPrecedente, setTotaleRicaviAnnoPrecedente] = useState(0);
  const [totaleFatturatoAnnoCorrente, setTotaleFatturatoAnnoCorrente] = useState(0);
  const [totaleRicaviAnnoCorrente, setTotaleRicaviAnnoCorrente] = useState(0);
  const [totaleCostiAnnoPrecedente, setTotaleCostiAnnoPrecedente] = useState(0);
  const [totaleCostiAnnoCorrente, setTotaleCostiAnnoCorrente] = useState(0);

  useEffect(() => {
    const currentYear = 2024;
    let totalFatturatoCurrentYear = 0;
    let totalRicaviCurrentYear = 0;
    let totalCostiCurrentYear = 0;
    let totalFatturatoPreviousYear = 0;
    let totalRicaviPreviousYear = 0;
    let totalCostiPreviousYear = 0;

    data.forEach(entry => {
      const entryDate = new Date(entry.data);
      const entryYear = entryDate.getFullYear();
      const fatturato = entry.fatturato_totale_eur || 0;
      const ricavi = entry.ricavi_eur || 0;
      const costi = entry.costo_produzione_totale_eur || 0;

      if (entryYear === currentYear) {
        totalFatturatoCurrentYear += fatturato;
        totalRicaviCurrentYear += ricavi;
        totalCostiCurrentYear += costi;
      } else if (entryYear === currentYear - 1) {
        totalFatturatoPreviousYear += fatturato;
        totalRicaviPreviousYear += ricavi;
        totalCostiPreviousYear += costi;
      }
    });

    setTotaleFatturatoAnnoPrecedente(totalFatturatoPreviousYear);
    setTotaleRicaviAnnoPrecedente(totalRicaviPreviousYear);
    setTotaleFatturatoAnnoCorrente(totalFatturatoCurrentYear);
    setTotaleRicaviAnnoCorrente(totalRicaviCurrentYear);
    setTotaleCostiAnnoPrecedente(totalCostiPreviousYear);
    setTotaleCostiAnnoCorrente(totalCostiCurrentYear);
  }, []);

  const formatNumber = (number) => {
    return Math.floor(number).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="totale-performance-section">
      <div className="totale-performance-box">
        <h4>Totale Fatturato (PY)</h4>
        <p>€ {formatNumber(totaleFatturatoAnnoPrecedente)}</p>
      </div>
      <div className="totale-performance-box red-background">
        <h4>Totale Costi (PY)</h4>
        <p>€ {formatNumber(totaleCostiAnnoPrecedente)}</p>
      </div>
      <div className="totale-performance-box">
        <h4>Totale Ricavi (PY)</h4>
        <p>€ {formatNumber(totaleRicaviAnnoPrecedente)}</p>
      </div>
      <div className="totale-performance-box green-background">
        <h4>Totale Fatturato (YTD)</h4>
        <p>€ {formatNumber(totaleFatturatoAnnoCorrente)}</p>
      </div>
      <div className="totale-performance-box red-background">
        <h4>Totale Costi (YTD)</h4>
        <p>€ {formatNumber(totaleCostiAnnoCorrente)}</p>
      </div>
      <div className="totale-performance-box green-background">
        <h4>Totale Ricavi (YTD)</h4>
        <p>€ {formatNumber(totaleRicaviAnnoCorrente)}</p>
      </div>
    </div>
  );
}

export default TotalePerformance;
