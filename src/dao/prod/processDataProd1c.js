import data from '../../assets/data/simulation_data.json';
import { parse } from 'date-fns';

export default function processDataProd1c(dateRange, appezzamento, tipoDiColtura) {
  const dataByCropType = {};

  data.forEach(entry => {
    const date = new Date(entry.data);

    // Filtra per intervallo di date solo se `startDate` ed `endDate` sono definite e non vuote
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

    const cropType = entry.tipo_di_coltura;

    // Aggrega i dati per tipo di coltura
    if (!dataByCropType[cropType]) {
      dataByCropType[cropType] = {
        tipo_di_coltura: cropType,
        quantita_raccolta_kg: 0,
        quantita_netta: 0,
        consumo_acqua_litri: 0,
      };
    }

    dataByCropType[cropType].quantita_raccolta_kg += entry.quantita_raccolta_kg || 0;
    dataByCropType[cropType].quantita_netta += entry.quantita_netta || 0;
    dataByCropType[cropType].consumo_acqua_litri += entry.consumo_acqua_litri || 0;
  });

  // Restituisce i valori formattati
  return Object.values(dataByCropType).map(item => ({
    tipo_di_coltura: item.tipo_di_coltura,
    quantita_raccolta_kg: Math.floor(item.quantita_raccolta_kg),
    quantita_netta: Math.floor(item.quantita_netta),
    consumo_acqua_litri: Math.floor(item.consumo_acqua_litri),
  }));
}
