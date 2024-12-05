
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataPerformance3a(dateRange, appezzamento, tipoDiColtura) {
  const monthlyData = {};

  data.forEach(entry => {
    const date = new Date(entry.data);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    // Filtro per intervallo di date
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = parse(dateRange.startDate, 'dd-MM-yyyy', new Date());
      const endDate = parse(dateRange.endDate, 'dd-MM-yyyy', new Date());
      if (date < startDate || date > endDate) return;
    }

    // Filtro per appezzamento
    if (appezzamento && entry.appezzamento?.nome !== appezzamento) return;

    // Filtro per tipo di coltura
    if (tipoDiColtura && entry.tipo_di_coltura !== tipoDiColtura) return;

    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {
        month: yearMonth,
        costo_energia_eur: 0,
        costo_fitosanitari_eur: 0,
        costo_sementi_eur: 0,
        costo_trasporto_eur: 0,
        costo_irrigazione_eur: 0
      };
    }

    const dettagliCosti = entry.dettaglio_costi_produzione_eur || {};

    // Somma i costi mensili per ogni tipo di costo
    monthlyData[yearMonth].costo_energia_eur += dettagliCosti.costo_energia_eur || 0;
    monthlyData[yearMonth].costo_fitosanitari_eur += dettagliCosti.costo_fitosanitari_eur || 0;
    monthlyData[yearMonth].costo_sementi_eur += dettagliCosti.costo_sementi_eur || 0;
    monthlyData[yearMonth].costo_trasporto_eur += dettagliCosti.costo_trasporto_eur || 0;
    monthlyData[yearMonth].costo_irrigazione_eur += dettagliCosti.costo_irrigazione_eur || 0;
  });

  // Converte i dati aggregati in un array di oggetti per l'uso nel grafico
  return Object.values(monthlyData).sort((a, b) => new Date(a.month) - new Date(b.month)).map(item => ({
    month: item.month,
    costo_energia_eur: Math.floor(item.costo_energia_eur),
    costo_fitosanitari_eur: Math.floor(item.costo_fitosanitari_eur),
    costo_sementi_eur: Math.floor(item.costo_sementi_eur),
    costo_trasporto_eur: Math.floor(item.costo_trasporto_eur),
    costo_irrigazione_eur: Math.floor(item.costo_irrigazione_eur),
  }));
}
