
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import processDataRis2b from '../../dao/risorse/processDataRis2b';

const COLORS = ['#007bff', '#82ca9d', '#ffc658', '#ff8042', '#8884d8', '#a28dff'];

// Funzione per formattare i numeri con il punto come separatore delle migliaia
const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function ChartDataRis2b({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataRis2b(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">2b - Visualizzazione dell’uso delle risorse (consumo d'acqua) per diversi tipi di colture.</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="tipo_di_coltura" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value) => `${formatNumber(value)}`} />
          <Legend />
          
          {/* Barra per il consumo d'acqua con colori dinamici per ogni tipo di coltura */}
          <Bar dataKey="consumo_acqua_litri" name="Consumo d'Acqua (L)">
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataRis2b;
