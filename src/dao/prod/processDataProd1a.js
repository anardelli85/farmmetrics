
// src/dao/prod/processDataProd1a.js
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function chartDataProd1a(dateRange, appezzamento, tipoDiColtura) {
  const monthlyData = {};

  data.forEach(entry => {
    const date = new Date(entry.data);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    // Filtra per intervallo di date solo se startDate ed endDate sono definite e non vuote
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());

      if (date < startDate || date > endDate) {
        return;
      }
    }

    // Filtra per appezzamento (se selezionato)
    if (appezzamento && entry.appezzamento?.nome !== appezzamento) {
      return;
    }

    // Filtra per tipo di coltura (se selezionato)
    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) {
      return;
    }

    // Inizializza il mese se non esiste ancora
    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {
        quantita_raccolta_kg: 0,
        precipitazioni_mm: 0,
        quantita_scartata_kg: 0,
      };
    }

    // Aggiungi la quantità raccolta, le precipitazioni e la quantità scartata
    monthlyData[yearMonth].quantita_raccolta_kg += entry.quantita_raccolta_kg || 0;
    monthlyData[yearMonth].precipitazioni_mm += entry.meteo.precipitazioni_mm || 0;
    monthlyData[yearMonth].quantita_scartata_kg += entry.quantita_scartata_kg || 0;
  });

  // Converte l'oggetto in un array di oggetti con "yearMonth" come chiave e tronca i valori alla parte intera
  return Object.entries(monthlyData).map(([yearMonth, values]) => ({
    month: yearMonth,
    quantita_raccolta_kg: Math.floor(values.quantita_raccolta_kg),
    precipitazioni_mm: Math.floor(values.precipitazioni_mm),
    quantita_scartata_kg: Math.floor(values.quantita_scartata_kg),
  }));
}
