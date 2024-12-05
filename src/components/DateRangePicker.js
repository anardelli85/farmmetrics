// src/components/DateRangePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DateRangePicker.css'; 
import { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
import { format } from 'date-fns';

registerLocale('it', it);

function DateRangePicker({ onDateChange }) {
  const minDate = new Date('2023-01-01'); 
  const maxDate = new Date('2024-11-22'); 

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Verifica che entrambe le date siano selezionate prima di chiamare onDateChange
    if (start && end) {
      onDateChange({
        startDate: format(start, 'dd-MM-yyyy'),
        endDate: format(end, 'dd-MM-yyyy'),
      });
    } else {
      // Se una delle due date non è selezionata, passa valori vuoti
      onDateChange({
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange({
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="date-range-picker">
       { (startDate || endDate) && (
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        locale="it"
        dateFormat="dd-MM-yyyy"
        placeholderText="Seleziona un intervallo di date"
        minDate={minDate} // Imposta la data minima selezionabile
        maxDate={maxDate} // Imposta la data massima selezionabile
      />
     
    </div>
  );
}

export default DateRangePicker;
