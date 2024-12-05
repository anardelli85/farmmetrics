
import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataProd1c from '../../dao/prod/processDataProd1c';

const COLORS = {
  totale: '#005BB5', // Colore per la quantità totale raccolta
  netta: '#00a55b'   // Colore per la quantità netta
};

// Funzione per formattare i numeri con il punto come separatore delle migliaia
const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function ChartDataProd1c({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataProd1c(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">1c - Quantità raccolta totale e quantità netta per tipo di coltura.</p>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={filteredData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" tickFormatter={formatNumber} />
          <YAxis dataKey="tipo_di_coltura" type="category" />
          <Tooltip formatter={(value) => `${formatNumber(value)} kg`} />
          <Legend />

          {/* Barra per la quantità netta, sopra la quantità raccolta totale */}
          <Bar dataKey="quantita_netta" name="Quantità Netta" fill={COLORS.netta} />

          {/* Barra per la quantità raccolta totale */}
          <Bar dataKey="quantita_raccolta_kg" name="Quantità Totale Raccolta" fill={COLORS.totale} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataProd1c;
