import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataProd1d(dateRange, appezzamento, tipoDiColtura) {
  const dataByAppezzamento = {};

  data.forEach(entry => {
    const date = new Date(entry.data);

    // Filtra per intervallo di date
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());
      if (date < startDate || date > endDate) return;
    }

    // Filtra per appezzamento
    if (appezzamento && entry.appezzamento?.nome !== appezzamento) return;

    // Filtra per tipo di coltura
    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) return;

    const appezzamentoName = entry.appezzamento?.nome || 'Sconosciuto';
    if (!dataByAppezzamento[appezzamentoName]) {
      dataByAppezzamento[appezzamentoName] = {
        appezzamento: appezzamentoName,
        superficie_ha: entry.appezzamento?.superficie_ha || 1, 
        quantita_raccolta_kg: 0,
      };
    }

    dataByAppezzamento[appezzamentoName].quantita_raccolta_kg += entry.quantita_raccolta_kg || 0;
  });

  // Calcola la produzione media per ettaro
  return Object.values(dataByAppezzamento).map(item => ({
    appezzamento: item.appezzamento,
    produzione_media_kg_ha: Math.floor(item.quantita_raccolta_kg / item.superficie_ha),
  }));
}
