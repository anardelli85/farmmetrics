
import React from 'react';
import '../styles/Filtri.css'; // Crea un file CSS per eventuali stili personalizzati
import DateRangePicker from './DateRangePicker';
import AppezzamentoSelect from './AppezzamentoSelect';
import TipoDiColturaSelect from './TipoDiColturaSelect';

function Filtri({ onDateChange, onAppezzamentoChange, onTipoDiColturaChange }) {
  return (
    <div className="selectors-wrapper">
      <div className="date-range-container">
        <DateRangePicker onDateChange={onDateChange} />
      </div>
      <AppezzamentoSelect onSelectChange={onAppezzamentoChange} />
      <TipoDiColturaSelect onSelectChange={onTipoDiColturaChange} />
    </div>
  );
}

export default Filtri;
