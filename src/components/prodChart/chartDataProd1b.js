
import React, { useState, useEffect } from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Legend, Line, ResponsiveContainer } from 'recharts';
import processDataProd1b from '../../dao/prod/processDataProd1b';

function ChartDataProd1b({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataProd1b(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  // Funzione di formattazione
  const formatNumber = (number) => {
    return number.toLocaleString('it-IT');
  };

  return (
    <div className="chart-container">
      <p className="chart-description">
        1b - Quantità raccolta e scartata mensilmente in relazione alla temperatura.
      </p>
      <ResponsiveContainer width="100%" height={400}> 
        <ComposedChart
          data={filteredData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" name="Anno-Mese" scale="band" />
          <YAxis yAxisId="left" label={{ value: 'Quantità (kg)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Temperatura Media (°C)', angle: -90, position: 'insideRight' }} />
          <Tooltip 
            formatter={(value, name) => [formatNumber(value), name]} 
          />
          <Legend />

          <Bar
            yAxisId="left"
            dataKey="quantita_raccolta_kg"
            barSize={20}
            fill="#00a55b"
            name="Quantità Raccolta (kg)"
          />

          <Bar
            yAxisId="left"
            dataKey="quantita_scartata_kg"
            barSize={20}
            fill="#5f5f5f"
            name="Quantità Scartata (kg)"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="temperatura_avg_celsius"
            stroke="#ff7300"
            strokeWidth={2}
            dot={false}
            name="Temperatura Media (°C)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataProd1b;
