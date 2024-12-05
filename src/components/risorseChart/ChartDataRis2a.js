
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataRis1a from '../../dao/risorse/processDataRis2a.js';

const COLORS = {
  fitosanitari: '#ff7300', // Colore per l'uso fitosanitari
  qtaraccoltanetta: '#28a745' // Colore per la quantità raccolta netta
};

const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function ChartDataRis2a({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataRis1a(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">2a - Confronto tra uso fitosanitari e quantità netta raccolta</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" name="Anno-Mese" scale="band" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value) => `${formatNumber(value)}`} />
          <Legend />

          {/* Linea per l'uso fitosanitari */}
          <Line type="monotone" dataKey="uso_fitosanitari_kg" name="Uso Fitosanitari (kg)" stroke={COLORS.fitosanitari} strokeWidth={2} dot={false} />

          {/* Linea per il rendimento del raccolto */}
          <Line type="monotone" dataKey="quantita_netta" name="Quantità Raccolta Netta (kg)" stroke={COLORS.qtaraccoltanetta} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataRis2a;
