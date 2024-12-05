
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import processDataProd1d from '../../dao/prod/processDataProd1d';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

// Funzione per formattare i numeri con il punto come separatore delle migliaia
const formatNumber = (number) => {
  return number.toLocaleString('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Funzione per rendere l'etichetta al centro della fetta
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, produzione_media_kg_ha }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${formatNumber(produzione_media_kg_ha)} kg/ha`}
    </text>
  );
};

function ChartDataProd1d({ dateRange, appezzamento, tipoDiColtura }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = processDataProd1d(dateRange, appezzamento, tipoDiColtura);
    setFilteredData(filtered);
  }, [dateRange, appezzamento, tipoDiColtura]);

  return (
    <div className="chart-container">
      <p className="chart-description">1d - Produzione media per ettaro (kg/ha) per appezzamento.</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="produzione_media_kg_ha"
            nameKey="appezzamento"
            outerRadius={150}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${formatNumber(value)} kg/ha`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDataProd1d;
