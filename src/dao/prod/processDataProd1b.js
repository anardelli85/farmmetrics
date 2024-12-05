
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataProd1b(dateRange, appezzamento, tipoDiColtura) {
  const monthlyData = {};

  data.forEach(entry => {
    const date = new Date(entry.data);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());

      if (date < startDate || date > endDate) {
        return;
      }
    }

    if (appezzamento && entry.appezzamento?.nome !== appezzamento) {
      return;
    }

    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) {
      return;
    }

    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {
        quantita_raccolta_kg: 0,
        quantita_scartata_kg: 0,
        temperatura_sum: 0,
        temperatura_count: 0,
      };
    }

    monthlyData[yearMonth].quantita_raccolta_kg += entry.quantita_raccolta_kg || 0;
    monthlyData[yearMonth].quantita_scartata_kg += entry.quantita_scartata_kg || 0;

    if (entry.meteo && entry.meteo.temperatura_avg_celsius) {
      monthlyData[yearMonth].temperatura_sum += entry.meteo.temperatura_avg_celsius;
      monthlyData[yearMonth].temperatura_count += 1;
    }
  });

  return Object.entries(monthlyData).map(([yearMonth, values]) => {
    const temperatura_avg_celsius = values.temperatura_count
      ? Math.floor(values.temperatura_sum / values.temperatura_count)
      : 0;

    return {
      month: yearMonth,
      quantita_raccolta_kg: Math.floor(values.quantita_raccolta_kg),
      quantita_scartata_kg: Math.floor(values.quantita_scartata_kg),
      temperatura_avg_celsius,
    };
  });
}
