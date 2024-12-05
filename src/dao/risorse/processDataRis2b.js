// src/dao/risorse/processDataRis2b.js
import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataRis2b(dateRange, appezzamento, tipoDiColtura) {
  const dataByCropType = {};

  data.forEach(entry => {
    const date = new Date(entry.data);

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

    const cropType = entry.tipo_di_coltura;

    // Aggrega il consumo d'acqua per tipo di coltura
    if (!dataByCropType[cropType]) {
      dataByCropType[cropType] = {
        tipo_di_coltura: cropType,
        consumo_acqua_litri: 0,
      };
    }

    dataByCropType[cropType].consumo_acqua_litri += entry.consumo_acqua_litri || 0;
  });

  // Converte l'oggetto in un array per l'uso nel grafico
  return Object.values(dataByCropType).map(item => ({
    tipo_di_coltura: item.tipo_di_coltura,
    consumo_acqua_litri: Math.floor(item.consumo_acqua_litri),
  }));
}
