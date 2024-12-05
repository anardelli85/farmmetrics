
//src/components/TotaleQuantita.js
import React, { useEffect, useState } from 'react';
import data from '../assets/data/simulation_data.json';
import '../styles/TotaleQuantita.css';

function TotaleQuantita() {
  const [totaleAnnoCorrente, setTotaleAnnoCorrente] = useState(0);
  const [totaleAnnoPrecedente, setTotaleAnnoPrecedente] = useState(0);
  const [totaleScartoAnnoCorrente, setTotaleScartoAnnoCorrente] = useState(0);
  const [totaleScartoAnnoPrecedente, setTotaleScartoAnnoPrecedente] = useState(0);
  const [percDifferenzaAnnoPrecYTD, setPercDifferenzaAnnoPrecYTD] = useState(0);
  const [percScartoAnnoCorrente, setPercScartoAnnoCorrente] = useState(0);

  useEffect(() => {
    //const currentYear = new Date().getFullYear();
    const currentYear = 2024;  //FISSATO al 2024 perchè non so quando sarà consultata questa DASHBORD e i dati sono fino al 22 novembre 2024
    const today = new Date();
    let totalCurrentYear = 0;
    let totalPreviousYear = 0;
    let totalCurrentYearDiscard = 0;
    let totalPreviousYearDiscard = 0;
    let totalPreviousYearYTD = 0;

    data.forEach(entry => {
      const entryDate = new Date(entry.data);
      const entryYear = entryDate.getFullYear();
      const quantita = entry.quantita_raccolta_kg || 0;
      const quantitaScartata = entry.quantita_scartata_kg || 0;

      if (entryYear === currentYear) {
        totalCurrentYear += quantita;
        totalCurrentYearDiscard += quantitaScartata;
      } else if (entryYear === currentYear - 1) {
        totalPreviousYear += quantita;
        totalPreviousYearDiscard += quantitaScartata;

        const sameDayLastYear = new Date(currentYear - 1, today.getMonth(), today.getDate());
        if (entryDate <= sameDayLastYear) {
          totalPreviousYearYTD += quantita;
        }
      }
    });

    const percDiffPreviousYearYTD = totalPreviousYearYTD
      ? ((totalCurrentYear - totalPreviousYearYTD) / totalPreviousYearYTD) * 100
      : 0;

    const percScarto = totalPreviousYearDiscard
      ? ((totalCurrentYearDiscard - totalPreviousYearDiscard) / totalPreviousYearDiscard) * 100
      : 0;

    setTotaleAnnoCorrente(totalCurrentYear);
    setTotaleAnnoPrecedente(totalPreviousYear);
    setTotaleScartoAnnoCorrente(totalCurrentYearDiscard);
    setTotaleScartoAnnoPrecedente(totalPreviousYearDiscard);
    setPercDifferenzaAnnoPrecYTD(percDiffPreviousYearYTD);
    setPercScartoAnnoCorrente(percScarto);
  }, []);

  const formatNumber = (number) => {
    return Math.floor(number).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatPercentage = (number) => {
    return number.toFixed(2).replace('.', ',');
  };

  return (
    <div className="totale-quantita-section">
      <div className="totale-quantita-box">
        <h4>Tot. Qtà Raccolta (PY)</h4>
        <p>{formatNumber(totaleAnnoPrecedente)} kg</p>
      </div>
      
     
      <div className="totale-quantita-box">
        <h4>Tot. Qtà Scartata (PY)</h4>
        <p>{formatNumber(totaleScartoAnnoPrecedente)} kg</p>
      </div>
      <div className="totale-quantita-box green-background">
        <h4>Tot. Qtà Raccolta (CY)</h4>
        <p>{formatNumber(totaleAnnoCorrente)} kg</p>
      </div>
      <div className="totale-quantita-box  green-background">
        <h4>Percentuale Qtà raccolta YTD</h4>
        <p>{formatPercentage(percDifferenzaAnnoPrecYTD)} %</p>
      </div>
      <div className="totale-quantita-box green-background">
        <h4>Tot. Qtà Scartata (CY)</h4>
        <p>{formatNumber(totaleScartoAnnoCorrente)} kg</p>
      </div>
      <div className="totale-quantita-box green-background">
        <h4>Percentuale Scarto (CY vs PY)</h4>
        <p>{formatPercentage(percScartoAnnoCorrente)} %</p>
      </div>
    </div>
  );
}

export default TotaleQuantita;
