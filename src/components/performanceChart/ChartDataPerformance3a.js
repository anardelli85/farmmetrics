
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataPerformance3a from '../../dao/performance/processDataPerformance3a';

const COLORS = {
  energia: '#ff7300',          // Colore per il costo dell'energia
  fitosanitari: '#00a55b',     // Colore per il costo dei fitosanitari
  sementi: '#E2B112',          // Colore per il costo delle sementi
  trasporto: '#FF5722',        // Colore per il costo del trasporto
  irrigazione: '#0000FF'       // Colore per il costo dell'irrigazione
};

const MIN_BAR_HEIGHT = 5;  // Altezza minima delle barre

const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function ChartDataPerformance3a({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataPerformance3a(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">3a - Andamento dei costi di produzione per tipologia di costo</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatNumber}  />
          <Tooltip formatter={(value) => `${formatNumber(value)} €`} />
          <Legend />

          {/* Barre per ciascun tipo di costo con altezza minima e colore distintivo */}
          <Bar dataKey="costo_energia_eur" name="Costo Energia (€)" fill={COLORS.energia} minPointSize={MIN_BAR_HEIGHT} />
          <Bar dataKey="costo_fitosanitari_eur" name="Costo Fitosanitari (€)" fill={COLORS.fitosanitari} minPointSize={MIN_BAR_HEIGHT} />
          <Bar dataKey="costo_sementi_eur" name="Costo Sementi (€)" fill={COLORS.sementi} minPointSize={MIN_BAR_HEIGHT} />
          <Bar dataKey="costo_trasporto_eur" name="Costo Trasporto (€)" fill={COLORS.trasporto} minPointSize={MIN_BAR_HEIGHT} />
          <Bar dataKey="costo_irrigazione_eur" name="Costo Irrigazione (€)" fill={COLORS.irrigazione} minPointSize={MIN_BAR_HEIGHT} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataPerformance3a;
