// src/dao/risorse/processDataRis2c.js
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataRis2c(dateRange, appezzamento, tipoDiColtura) {
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
        percentuale_energia_rinnovabile: 0,
        percentuale_energia_combustibili: 0,
        count: 0,
      };
    }

    monthlyData[yearMonth].percentuale_energia_rinnovabile += entry.dettaglio_costi_produzione_eur?.percentuale_energia_rinnovabile || 0;
    monthlyData[yearMonth].percentuale_energia_combustibili += entry.dettaglio_costi_produzione_eur?.percentuale_energia_combustibili || 0;
    monthlyData[yearMonth].count += 1;
  });

  return Object.values(monthlyData).map(item => ({
    month: item.month,
    percentuale_energia_rinnovabile: item.count ? (item.percentuale_energia_rinnovabile / item.count).toFixed(2) : '0.00',
    percentuale_energia_combustibili: item.count ? (item.percentuale_energia_combustibili / item.count).toFixed(2) : '0.00',
  }));
}
