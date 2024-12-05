
import data from '../../assets/data/simulation_data.json';
//import { parse } from 'date-fns';

export default function processDataPerformance3b(dateRange, appezzamento, tipoDiColtura) {
  const dataByColtura = {};

  data.forEach(entry => {
    
     /*
    const date = new Date(entry.data);

   
    // Filtra per intervallo di date
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());
      if (date < startDate || date > endDate) return;
    }
*/
    // Filtra per appezzamento
    if (appezzamento && entry.appezzamento?.nome !== appezzamento) return;

    // Filtra per tipo di coltura
    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) return;

    const coltura = entry.tipo_di_coltura;

    if (!dataByColtura[coltura]) {
      dataByColtura[coltura] = { tipo_di_coltura: coltura, ricavi_eur: 0 };
    }

    // Somma i ricavi per tipo di coltura
    dataByColtura[coltura].ricavi_eur += entry.ricavi_eur || 0;
  });

  // Converte i dati aggregati in un array di oggetti per l'uso nel grafico
  return Object.values(dataByColtura).map(item => ({
    tipo_di_coltura: item.tipo_di_coltura,
    ricavi_eur: Math.floor(item.ricavi_eur),
  }));
}
