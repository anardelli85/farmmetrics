
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataPerformance3b from '../../dao/performance/processDataPerformance3b';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d084af', '#8b0000']; // Colori per ogni fetta di coltura

// Funzione per formattare i numeri con separatore di migliaia
const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function ChartDataPerformance3b({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataPerformance3b(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">3b - Analisi del Profitto per Tipo di Coltura</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="ricavi_eur"
            nameKey="tipo_di_coltura"
            outerRadius={150}
            label={({ name, value }) => `${name}: € ${formatNumber(value)}`}
            labelLine={false}
          >
            {filteredData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `€ ${formatNumber(value)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataPerformance3b;
