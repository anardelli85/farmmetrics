// src/dao/risorse/processDataRis1a.js
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataRis2a(dateRange, appezzamento, tipoDiColtura) {
  const monthlyData = {};

  data.forEach(entry => {
    const date = new Date(entry.data);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());
      if (date < startDate || date > endDate) return;
    }

    if (appezzamento && entry.appezzamento?.nome !== appezzamento) return;
    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) return;

    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {
        month: yearMonth,
        uso_fitosanitari_kg: 0,
        quantita_netta: 0
      };
    }

    monthlyData[yearMonth].uso_fitosanitari_kg += entry.uso_fitosanitari_kg || 0;
    monthlyData[yearMonth].quantita_netta += entry.quantita_netta || 0;
  });

  return Object.values(monthlyData).map(item => ({
    month: item.month,
    uso_fitosanitari_kg: Math.floor(item.uso_fitosanitari_kg),
    quantita_netta: Math.floor(item.quantita_netta),
  }));
}
