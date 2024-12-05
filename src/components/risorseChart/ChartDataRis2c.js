
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataRis2c from '../../dao/risorse/processDataRis2c';

const COLORS = ['#4CAF50', '#FF5722']; // Colori per le fette (rinnovabile, combustibili)

const formatPercentage = (value) => {
  const number = parseFloat(value);
  if (isNaN(number)) return '0,00%';
  return `${number.toFixed(2).replace('.', ',')}%`;
};

function ChartDataRis2c({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataRis2c(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
    console.log('Filtered Data:', filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  const pieData = [
    { name: 'Energia Rinnovabile', value: filteredData.reduce((acc, item) => acc + parseFloat(item.percentuale_energia_rinnovabile), 0) / (filteredData.length || 1) },
    { name: 'Energia da Combustibili', value: filteredData.reduce((acc, item) => acc + parseFloat(item.percentuale_energia_combustibili), 0) / (filteredData.length || 1) },
  ];

  console.log('Dati per il grafico a torta:', pieData);

  return (
    <div className="chart-container">
      <p className="chart-description">2c - Visualizzazione del consumo dell’energia rinnovabile e di quella derivante dai combustibili</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label={({ name, value }) => `${name}: ${formatPercentage(value)}`}
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatPercentage(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataRis2c;
