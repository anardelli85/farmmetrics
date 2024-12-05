
//src/components/prodChart/ChartDataProd1a.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processQuantitaPrecipitazioniData from '../../dao/prod/processDataProd1a';

function ChartDataProd1a({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processQuantitaPrecipitazioniData(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  // Funzione per formattare i numeri con i punti come separatore delle migliaia
  const formatNumber = (number) => {
    return number.toLocaleString('it-IT');
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <p className="chart-description">
        1a - Andamento mensile di quantità raccolta, scartata e precipitazioni.
      </p>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" name="Anno-Mese" />
        <YAxis yAxisId="left" label={{ value: 'Quantità Raccolta e Scartata (kg)', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Precipitazioni (mm)', angle: -90, position: 'insideRight' }} />
        <Tooltip
          formatter={(value, name) => [formatNumber(value), name]}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="quantita_raccolta_kg" stroke="#00a55b" name="Quantità Raccolta (kg)" />
        <Line yAxisId="right" type="monotone" dataKey="precipitazioni_mm" stroke="#0c3258" name="Precipitazioni (mm)" />
        <Line yAxisId="left" type="monotone" dataKey="quantita_scartata_kg" stroke="#ff7f0e" name="Quantità Scartata (kg)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartDataProd1a;
